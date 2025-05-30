import mookdata from '../mookdata/mookdata.json';
import {useEffect, useState} from "react";
import {getDolar} from "../utils/utils.js";
import {calcularValoresPlanMaquinaria} from "../services/calculos.js";

export const useMaquinaria = () => {
  const [valorDolar, setValorDollar] = useState(0);
  const [valorGasoilina, setValorGasolina] = useState(0);
  const [planes, setPlanes] = useState([]);

  const [tractores, setTractores] = useState([]);
  const [implementos, setImplementos] = useState([]);

  useEffect(() => {
    const fetchDolar = async () => {
      const valor = await getDolar();
      setValorDollar(valor);
    }

    const fetchData = async () => {
      setTractores(mookdata.tractores);
      setImplementos(mookdata.implementos);
    }

    fetchData().then();
    fetchDolar().then();

  }, []);

  const getPlane = (id) => {
    return planes.find((plan) => plan.id === id);
  }

  const addPlan = () => {
    const tractor = tractores[0];
    const implemento = implementos[0];

    const valoresCalculados = calcularValoresPlanMaquinaria(tractor, implemento, valorDolar, valorGasoilina);

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
    const valoresCalculados = calcularValoresPlanMaquinaria(tractor, implemento, valorDolar, valorGasoilina);

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

  const updateDolar = async (newValue) => {
    setValorDollar(newValue);
    planes.forEach(plan => {
      const valoresCalculados = calcularValoresPlanMaquinaria(plan.tractor, plan.implemento, newValue, valorGasoilina);
      setPlanes(prevPlanes => prevPlanes.map(p => p.id === plan.id ? {...p, ...valoresCalculados} : p));
    })
  }

  const refreshDolar = async () => {
    const valor = await getDolar();
    await updateDolar(valor);
  }

  const updateGasolina = (valor) => {
    setValorGasolina(valor);
    planes.forEach(plan => {
      const valoresCalculados = calcularValoresPlanMaquinaria(plan.tractor, plan.implemento, valorDolar, valor);
      setPlanes(prevPlanes => prevPlanes.map(p => p.id === plan.id ? {...p, ...valoresCalculados} : p));
    });
  }

  return {
    valorDolar,
    updateDolar,
    refreshDolar,
    valorGasoilina,
    updateGasolina,
    planes,
    tractores,
    implementos,
    getPlane,
    addPlan,
    updatePlan,
    deletePlan
  };
}