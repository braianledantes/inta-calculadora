import { useReducer } from "react";
import { DOLAR_DEFAULT } from "../api/dolar.js";
import * as LocalDb from "../data/local.js";
import { calcularValoresPlanFertilizante } from "../services/calculos.js";

const initialState = {
  dolar: DOLAR_DEFAULT,
  dolares: [DOLAR_DEFAULT],
  planes: [],
  fertilizantes: LocalDb.getFertilizantes(),
};

const FERTILIZANTES_ACTIONS = {
  SET_DOLAR: "SET_DOLAR",
  SET_DOLARES: "SET_DOLARES",
  SET_PLANES: "SET_PLANES",
  SET_FERTILIZANTES: "SET_FERTILIZANTES",
  ADD_PLAN: "ADD_PLAN",
  UPDATE_PLAN: "UPDATE_PLAN",
  DELETE_PLAN: "DELETE_PLAN",
  UPDATE_DOLAR: "UPDATE_DOLAR",
};

function fertilizanteReducer(state, action) {
  switch (action.type) {
    case FERTILIZANTES_ACTIONS.SET_DOLAR:
      return { ...state, dolar: action.payload };
    case FERTILIZANTES_ACTIONS.SET_DOLARES:
      return { ...state, dolares: action.payload };
    case FERTILIZANTES_ACTIONS.SET_PLANES:
      return { ...state, planes: action.payload };
    case FERTILIZANTES_ACTIONS.SET_FERTILIZANTES:
      LocalDb.saveFertilizantes(action.payload);
      return { ...state, fertilizantes: action.payload };
    case FERTILIZANTES_ACTIONS.ADD_PLAN: {
      const { fertilizantes, planes, dolar } = state;

      if (fertilizantes.length === 0) {
        console.error("No hay fertilizantes disponibles para crear un plan.");
        return state; // No se puede agregar un plan sin fertilizantes
      }

      const fertilizante = fertilizantes[0];
      const cantTratamientos = 0;
      const valoresCalculados = calcularValoresPlanFertilizante(fertilizante, cantTratamientos, dolar.valor);
      const newId = planes.length === 0 ? 1 : planes[planes.length - 1].id + 1;
      const newPlan = {
        id: newId,
        fertilizante,
        cantTratamientos,
        ...valoresCalculados,
      };
      return { ...state, planes: [...planes, newPlan] };
    }
    case FERTILIZANTES_ACTIONS.UPDATE_PLAN: {
      const { id, fertilizante, cantTratamientos } = action.payload;
      const valoresCalculados = calcularValoresPlanFertilizante(fertilizante, cantTratamientos, state.dolar.valor);
      const updatedPlan = { fertilizante, cantTratamientos, ...valoresCalculados };
      return {
        ...state,
        planes: state.planes.map(plan => plan.id === id ? { ...plan, ...updatedPlan } : plan),
      };
    }
    case FERTILIZANTES_ACTIONS.DELETE_PLAN:
      return { ...state, planes: state.planes.filter(plan => plan.id !== action.payload) };
    case FERTILIZANTES_ACTIONS.UPDATE_DOLAR: {
      const newDolar = action.payload;
      const updatedDolares = state.dolares.find(d => d.tipo === newDolar.tipo)
        ? state.dolares.map(d => d.tipo === newDolar.tipo ? newDolar : d)
        : [...state.dolares, newDolar];
      const updatedPlanes = state.planes.map(plan => {
        const valoresCalculados = calcularValoresPlanFertilizante(plan.fertilizante, plan.cantTratamientos, newDolar.valor);
        return { ...plan, ...valoresCalculados };
      });
      return { ...state, dolar: newDolar, dolares: updatedDolares, planes: updatedPlanes };
    }
    default:
      return state;
  }
}

export function useFertilizanteReducer() {
  const [state, dispatch] = useReducer(fertilizanteReducer, initialState);

  // Acciones encapsuladas
  const setDolar = (dolar) =>
    dispatch({ type: FERTILIZANTES_ACTIONS.SET_DOLAR, payload: dolar });

  const setDolares = (dolares) =>
    dispatch({ type: FERTILIZANTES_ACTIONS.SET_DOLARES, payload: dolares });

  const setPlanes = (planes) =>
    dispatch({ type: FERTILIZANTES_ACTIONS.SET_PLANES, payload: planes });

  const setFertilizantes = (fertilizantes) =>
    dispatch({ type: FERTILIZANTES_ACTIONS.SET_FERTILIZANTES, payload: fertilizantes });

  const addPlan = () =>
    dispatch({ type: FERTILIZANTES_ACTIONS.ADD_PLAN });

  const updatePlan = (id, fertilizante, cantTratamientos) =>
    dispatch({ type: FERTILIZANTES_ACTIONS.UPDATE_PLAN, payload: { id, fertilizante, cantTratamientos } });

  const deletePlan = (id) =>
    dispatch({ type: FERTILIZANTES_ACTIONS.DELETE_PLAN, payload: id });

  const updateDolar = (dolar) =>
    dispatch({ type: FERTILIZANTES_ACTIONS.UPDATE_DOLAR, payload: dolar });

  const getPlan = (id) => state.planes.find(plan => plan.id === id);

  return {
    ...state,
    setDolar,
    setDolares,
    setPlanes,
    setFertilizantes,
    addPlan,
    updatePlan,
    deletePlan,
    updateDolar,
    getPlan,
  };
}