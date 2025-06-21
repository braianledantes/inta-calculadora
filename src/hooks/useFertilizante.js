import { useEffect, useState } from "react";
import { DOLAR_DEFAULT, getDolar, TIPO_DOLARES } from "../api/dolar.js";
import { calcularValoresPlanFertilizante } from "../services/calculos.js";
import * as LocalDb from "../data/local.js";

export const useFertilizante = () => {
  const [dolar, setDolar] = useState(DOLAR_DEFAULT);
  const [dolares, setDolares] = useState([DOLAR_DEFAULT]);
  const [planes, setPlanes] = useState([]);

  const [fertilizantes, setFertilizantes] = useState(LocalDb.getFertilizantes());

  useEffect(() => {
    const fetchDolar = async () => {
      const dolarManual = dolares[0];
      const nuevosDolares = await getDolar();
      setDolares([
        dolarManual,
        { tipo: TIPO_DOLARES.OFICIAL, valor: nuevosDolares.oficial },
        { tipo: TIPO_DOLARES.TARJETA, valor: nuevosDolares.tarjeta },
      ]);
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

    const valoresCalculados = calcularValoresPlanFertilizante(fertilizante, cantTratamientos, dolar.valor);

    const plan = {
      id: planes.at(-1)?.id + 1 || 1,
      fertilizante,
      cantTratamientos,
      ...valoresCalculados,
    };
    const newId = planes.length === 0 ? 1 : planes[planes.length - 1].id + 1;
    const newPlan = { ...plan, id: newId };
    setPlanes([...planes, newPlan]);
  }

  const updatePlan = (id, fertilizante, cantTratamientos) => {
    const valoresCalculados = calcularValoresPlanFertilizante(fertilizante, cantTratamientos, dolar.valor);

    const updatedPlan = {
      fertilizante,
      cantTratamientos,
      ...valoresCalculados,
    };

    setPlanes(planes.map(plan => plan.id === id ? { ...plan, ...updatedPlan } : plan));
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
      const valoresCalculados = calcularValoresPlanFertilizante(plan.fertilizante, plan.cantTratamientos, newDolar.valor);
      return { ...plan, ...valoresCalculados };
    });

    setPlanes(updatedPlanes);
  }

  return {
    dolar,
    dolares,
    updateDolar,
    planes,
    fertilizantes,
    getPlan,
    addPlan,
    updatePlan,
    deletePlan,
    saveFertilizantes,
  };
}