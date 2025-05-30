import mookdata from '../mookdata/mookdata.json';
import {useEffect, useState} from "react";
import {getDolar} from "../utils/utils.js";
import {calcularValoresPlanFertilizante} from "../services/calculos.js";

export const useFertilizante = () => {
  const [valorDolar, setValorDollar] = useState(0);
  const [planes, setPlanes] = useState([]);
  const [estadosFenologicos, setEstadosFenologicos] = useState([]);
  const [estadoFenologico, setEstadoFenologico] = useState({
    numero: -1,
    nombre: "Sin definir",
    descripcion: "Seleccione un estado fenológico",
  });

  const [fertilizantes, setFertilizantes] = useState([]);

  useEffect(() => {
    const fetchDolar = async () => {
      const valor = await getDolar();
      setValorDollar(valor);
    }

    const fetchData = async () => {
      setEstadosFenologicos(mookdata.estadosFenologicos);
      setEstadoFenologico(mookdata.estadosFenologicos[0]);
      setFertilizantes(mookdata.fertilizantes);
    }

    fetchData().then();
    fetchDolar().then();

  }, []);

  const getPlan = (id) => {
    return planes.find((plan) => plan.id === id);
  }

  const addPlan = () => {
    const fertilizante = fertilizantes[0];
    const cantTratamientos = 1;

    const valoresCalculados = calcularValoresPlanFertilizante(fertilizante, cantTratamientos, valorDolar);

    const plan = {
      id: planes.at(-1)?.id + 1 || 1,
      fertilizante,
      cantTratamientos,
      ...valoresCalculados,
    };
    const newId = planes.length === 0 ? 1 : planes[planes.length - 1].id + 1;
    const newPlan = {...plan, id: newId};
    setPlanes([...planes, newPlan]);
  }

  const updatePlan = (id, fertilizante, cantTratamientos) => {
    const valoresCalculados = calcularValoresPlanFertilizante(fertilizante, cantTratamientos, valorDolar);

    const updatedPlan = {
      fertilizante,
      cantTratamientos,
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
      const valoresCalculados = calcularValoresPlanFertilizante(plan.fertilizante, plan.cantTratamientos, valorDolar);
      setPlanes(prevPlanes => prevPlanes.map(p => p.id === plan.id ? {...p, ...valoresCalculados} : p));
    })
  }

  const refreshDolar = async () => {
    const valor = await getDolar();
    await updateDolar(valor);
  }

  return {
    valorDolar,
    updateDolar,
    refreshDolar,
    planes,
    fertilizantes,
    getPlan,
    addPlan,
    updatePlan,
    deletePlan,
    estadoFenologico,
    setEstadoFenologico,
    estadosFenologicos,
  };
}