import {useEffect, useState} from "react";
import {DOLAR_DEFAULT, TIPO_DOLARES, getDolar} from "../api/dolar.js";
import {getGasoil} from "../api/gasoil.js";
import {calcularValoresPlanMaquinaria} from "../services/calculos.js";
import * as LocalDb from "../data/local.js";

export const useMaquinaria = () => {
  const [dolar, setDolar] = useState(DOLAR_DEFAULT);
  const [dolares, setDolares] = useState([DOLAR_DEFAULT]);
  const [valorGasoilina, setValorGasolina] = useState(0);
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

      const gasoilValorApi = await getGasoil();
      // TODO: posible mejora hacer que se pueda seleccionar el grado de gasoil y la provincia segun los resultados de la API
      setValorGasolina(gasoilValorApi.grado2);
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

    const valoresCalculados = calcularValoresPlanMaquinaria(tractor, implemento, dolar.valor, valorGasoilina);

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
    const valoresCalculados = calcularValoresPlanMaquinaria(tractor, implemento, dolar.valor, valorGasoilina);

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
      const valoresCalculados = calcularValoresPlanMaquinaria(plan.tractor, plan.implemento, newDolar.valor, valorGasoilina);
      return {...plan, ...valoresCalculados};
    });
    setPlanes(updatedPlanes);
  }

  const updateGasolina = (valor) => {
    setValorGasolina(valor);
    const updatedPlanes = planes.map(plan => {
      const valoresCalculados = calcularValoresPlanMaquinaria(plan.tractor, plan.implemento, dolar.valor, valor);
      return {...plan, ...valoresCalculados};
    });
    setPlanes(updatedPlanes);
  }

  

  return {
    dolar,
    dolares,
    updateDolar,
    valorGasoilina,
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