import {useEffect, useState} from "react";
import {DOLAR_DEFAULT, TIPO_DOLARES, getDolar} from "../api/dolar.js";
import {GASOIL_DEFAULT, TIPO_GASOIL , getGasoil} from "../api/gasoil.js";
import {calcularValoresPlanMaquinaria} from "../services/calculos.js";
import * as LocalDb from "../data/local.js";

export const useMaquinaria = () => {
  const [dolar, setDolar] = useState(DOLAR_DEFAULT);
  const [dolares, setDolares] = useState([DOLAR_DEFAULT]);

  const [gasoil, setGasoil] = useState(GASOIL_DEFAULT);
  const [listaGasoil, setListaGasoil] = useState([GASOIL_DEFAULT]);

  const [planes, setPlanes] = useState([]);

  const [tractores, setTractores] = useState(LocalDb.getTractores());
  const [implementos, setImplementos] = useState(LocalDb.getImplementos());

  useEffect(() => {
    const fetchDolar = async () => {

      const dolarManual = dolares[0];
      const nuevosDolares = await getDolar();
      setDolares([
        dolarManual,
        { tipo: TIPO_DOLARES.OFICIAL, valor: nuevosDolares.oficial },
        { tipo: TIPO_DOLARES.TARJETA, valor: nuevosDolares.tarjeta },
      ]);

      const gasoilManual = listaGasoil[0];
      const gasoilValorApi = await getGasoil();
      setListaGasoil([
        gasoilManual,
        { tipo: TIPO_GASOIL.GRADO2, valor: gasoilValorApi.grado2 },
        { tipo: TIPO_GASOIL.GRADO3, valor: gasoilValorApi.grado3 },
      ]);
    }
    fetchDolar().then();
  }, []);

  const saveTractores = (t) => {
    setTractores(t);
    LocalDb.saveTractores(t)
  }

  const saveImplementos = (i) => {
    setImplementos(i);
    LocalDb.saveImplementos(i);
  }

  const getPlane = (id) => {
    return planes.find((plan) => plan.id === id);
  }

  const addPlan = () => {
    const tractor = tractores[0];
    const implemento = implementos[0];

    const valoresCalculados = calcularValoresPlanMaquinaria(tractor, implemento, dolar.valor, gasoil);

    const plan = {
      id: planes.at(-1)?.id + 1 || 1,
      tractor: tractor,
      implemento: implemento,
      ...valoresCalculados,
    };
 
    const newId = planes.length === 0 ? 1 : planes[planes.length - 1].id + 1;
    const newPlan = {...plan, id: newId};
    setPlanes([...planes, newPlan]);
  }

  const updatePlan = (id, tractor, implemento) => {
    const valoresCalculados = calcularValoresPlanMaquinaria(tractor, implemento, dolar.valor, gasoil);

    const updatedPlan = {
      tractor: tractor,
      implemento: implemento,
      ...valoresCalculados,
    };

    setPlanes(planes.map(plan => plan.id === id ? {...plan, ...updatedPlan} : plan));
  }

  const deletePlan = (id) => {
    setPlanes(planes.filter(plan => plan.id !== id));
  }

  const updateDolar = async (newDolar) => {
    setDolar(newDolar);
    
    setDolares(prevDolares => {
      const existingDolar = prevDolares.find(d => d.tipo === newDolar.tipo);
      if (existingDolar) {
        return prevDolares.map(d => d.tipo === newDolar.tipo ? newDolar : d);
      }
      return [...prevDolares, newDolar];
    });    

    const updatedPlanes = planes.map(plan => {
      const valoresCalculados = calcularValoresPlanMaquinaria(plan.tractor, plan.implemento, newDolar.valor, gasoil.valor);
      return {...plan, ...valoresCalculados};
    });
    setPlanes(updatedPlanes);
  }

  

  const updateGasolina = async (newGasolina) => {
    setGasoil(newGasolina);

    setListaGasoil(prevListaGasoil => {
      const existingGasoil = prevListaGasoil.find(d => d.tipo === newGasolina.tipo);
      if (existingGasoil) {
        return prevListaGasoil.map(d => d.tipo === newGasolina.tipo ? newGasolina : d);
      }
      return [...prevListaGasoil, newGasolina];
    });   
    
    const updatedPlanes = planes.map(plan => {
      const valoresCalculados = calcularValoresPlanMaquinaria(plan.tractor, plan.implemento, newGasolina.valor, gasoil.valor);
      return {...plan, ...valoresCalculados};
    });
    setPlanes(updatedPlanes);
  }


  return {
    dolar,
    dolares,
    updateDolar,
    gasoil,
    listaGasoil,
    updateGasolina,
    planes,
    tractores,
    implementos,
    getPlane,
    addPlan,
    updatePlan,
    deletePlan,
    saveTractores,
    saveImplementos,
  };
}