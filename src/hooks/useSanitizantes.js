import mookdata from '../mookdata/mookdata.json';
import {useEffect, useState} from "react";
import {getDolar} from "../utils/utils.js";
import {calcularValoresPlanSanitario} from "../services/calculos.js";

export const useSanitizantes = () => {
  const [valorDolar, setValorDollar] = useState(0);
  const [planes, setPlanes] = useState([]);
  const [estadosFenologicos, setEstadosFenologicos] = useState([]);
  const [estadoFenologico, setEstadoFenologico] = useState({
    numero: -1,
    nombre: "Sin definir",
    descripcion: "Seleccione un estado fenológico",
  });

  const [sanitizantes, setSanitizantes] = useState([]);

  useEffect(() => {
    const fetchDolar = async () => {
      const valor = await getDolar();
      setValorDollar(valor);
    }

    const fetchData = async () => {
      setEstadosFenologicos(mookdata.estadosFenologicos);
      setEstadoFenologico(mookdata.estadosFenologicos[0]);
      setSanitizantes(mookdata.sanitizantes);
    }

    fetchData().then();
    fetchDolar().then();

  }, []);

  const getPlan = (id) => {
    return planes.find((plan) => plan.id === id);
  }

  const addPlan = () => {
    const sanitizante = sanitizantes[0];
    const volumenPorHectarea = 0;
    const cantTratamientos = 0;

    const valoresCalculados = calcularValoresPlanSanitario(sanitizante, volumenPorHectarea, cantTratamientos, valorDolar);

    const plan = {
      id: planes.at(-1)?.id + 1 || 1,
      sanitizante,
      cantTratamientos,
      volumenPorHectarea,
      ...valoresCalculados,
    };
    const newId = planes.length === 0 ? 1 : planes[planes.length - 1].id + 1;
    const newPlan = {...plan, id: newId};
    setPlanes([...planes, newPlan]);
  }

  const updatePlan = (id, sanitizante, volumenPorHectarea, cantTratamientos) => {
    const valoresCalculados = calcularValoresPlanSanitario(sanitizante, volumenPorHectarea, cantTratamientos, valorDolar);

    const updatedPlan = {
      sanitizante,
      cantTratamientos,
      volumenPorHectarea,
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
      const valoresCalculados = calcularValoresPlanSanitario(plan.sanitizante, plan.volumenPorHectarea, plan.cantTratamientos, valorDolar);
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
    sanitizantes,
    getPlan,
    addPlan,
    updatePlan,
    deletePlan,
    estadoFenologico,
    setEstadoFenologico,
    estadosFenologicos,
  };
}