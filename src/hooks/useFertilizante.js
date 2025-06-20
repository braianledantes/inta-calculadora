import {useEffect, useState} from "react";
import {getDolar} from "../api/dolar.js";
import {calcularValoresPlanFertilizante} from "../services/calculos.js";
import * as LocalDb from "../data/local.js";

export const useFertilizante = () => {
  const [valorDolar, setValorDollar] = useState(0);
  const [planes, setPlanes] = useState([]);

  const [fertilizantes, setFertilizantes] = useState(LocalDb.getFertilizantes());

  useEffect(() => {
    const fetchDolar = async () => {
      const valor = await getDolar();
      setValorDollar(valor);
    }
    fetchDolar().then();
  }, []);

  const saveFertilizantes = (f) => {
    setFertilizantes(f);
    LocalDb.saveFertilizantes(f);
  }

  const getPlan = (id) => {
    return planes.find((plan) => plan.id === id);
  }

  const addPlan = () => {
    const fertilizante = fertilizantes[0];
    const cantTratamientos = 0;

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
    saveFertilizantes,
  };
}