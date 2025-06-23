import { useReducer } from "react";
import { DOLAR_DEFAULT } from "../api/dolar.js";
import { GASOIL_DEFAULT } from "../api/gasoil.js";
import * as LocalDb from "../data/local.js";
import { calcularValoresPlanMaquinaria } from "../services/calculos.js";

const initialState = {
  dolar: DOLAR_DEFAULT,
  dolares: [DOLAR_DEFAULT],
  gasoil: GASOIL_DEFAULT,
  listaGasoil: [GASOIL_DEFAULT],
  planes: [],
  tractores: LocalDb.getTractores(),
  implementos: LocalDb.getImplementos(),
};

const MAQUINARIA_ACTIONS = {
  SET_DOLAR: "SET_DOLAR",
  SET_DOLARES: "SET_DOLARES",
  SET_GASOIL: "SET_GASOIL",
  SET_LISTA_GASOIL: "SET_LISTA_GASOIL",
  SET_PLANES: "SET_PLANES",
  SET_TRACTORES: "SET_TRACTORES",
  SET_IMPLEMENTOS: "SET_IMPLEMENTOS",
  ADD_PLAN: "ADD_PLAN",
  UPDATE_PLAN: "UPDATE_PLAN",
  DELETE_PLAN: "DELETE_PLAN",
  UPDATE_DOLAR: "UPDATE_DOLAR",
  UPDATE_GASOLINA: "UPDATE_GASOLINA",
};

function maquinariaReducer(state, action) {
  switch (action.type) {
    case MAQUINARIA_ACTIONS.SET_DOLAR:
      return { ...state, dolar: action.payload };

    case MAQUINARIA_ACTIONS.SET_DOLARES:
      return { ...state, dolares: action.payload };

    case MAQUINARIA_ACTIONS.SET_GASOIL:
      return { ...state, gasoil: action.payload };

    case MAQUINARIA_ACTIONS.SET_LISTA_GASOIL:
      return { ...state, listaGasoil: action.payload };

    case MAQUINARIA_ACTIONS.SET_PLANES:
      return { ...state, planes: action.payload };

    case MAQUINARIA_ACTIONS.SET_TRACTORES:
      LocalDb.saveTractores(action.payload);
      return { ...state, tractores: action.payload };

    case MAQUINARIA_ACTIONS.SET_IMPLEMENTOS:
      LocalDb.saveImplementos(action.payload);
      return { ...state, implementos: action.payload };

    case MAQUINARIA_ACTIONS.ADD_PLAN: {
      const { tractores, implementos, planes, dolar, gasoil } = state;
      const tractor = tractores[0];
      const implemento = implementos[0];
      const valoresCalculados = calcularValoresPlanMaquinaria(tractor, implemento, dolar.valor, gasoil.valor);
      const newId = planes.length === 0 ? 1 : planes[planes.length - 1].id + 1;
      const newPlan = {
        id: newId,
        tractor,
        implemento,
        ...valoresCalculados,
      };
      return { ...state, planes: [...planes, newPlan] };
    }

    case MAQUINARIA_ACTIONS.UPDATE_PLAN: {
      const { id, tractor, implemento } = action.payload;
      const valoresCalculados = calcularValoresPlanMaquinaria(tractor, implemento, state.dolar.valor, state.gasoil.valor);
      const updatedPlan = { tractor, implemento, ...valoresCalculados };
      return {
        ...state,
        planes: state.planes.map(plan => plan.id === id ? { ...plan, ...updatedPlan } : plan),
      };
    }

    case MAQUINARIA_ACTIONS.DELETE_PLAN:
      return { ...state, planes: state.planes.filter(plan => plan.id !== action.payload) };

    case MAQUINARIA_ACTIONS.UPDATE_DOLAR: {
      const newDolar = action.payload;
      const updatedDolares = state.dolares.find(d => d.tipo === newDolar.tipo)
        ? state.dolares.map(d => d.tipo === newDolar.tipo ? newDolar : d)
        : [...state.dolares, newDolar];
      const updatedPlanes = state.planes.map(plan => {
        const valoresCalculados = calcularValoresPlanMaquinaria(plan.tractor, plan.implemento, newDolar.valor, state.gasoil.valor);
        return { ...plan, ...valoresCalculados };
      });
      return { ...state, dolar: newDolar, dolares: updatedDolares, planes: updatedPlanes };
    }

    case MAQUINARIA_ACTIONS.UPDATE_GASOLINA: {
      const newGasolina = action.payload;
      const updatedListaGasoil = state.listaGasoil.find(d => d.tipo === newGasolina.tipo)
        ? state.listaGasoil.map(d => d.tipo === newGasolina.tipo ? newGasolina : d)
        : [...state.listaGasoil, newGasolina];
      const updatedPlanes = state.planes.map(plan => {
        const valoresCalculados = calcularValoresPlanMaquinaria(plan.tractor, plan.implemento, newGasolina.valor, state.gasoil.valor);
        return { ...plan, ...valoresCalculados };
      });
      return { ...state, gasoil: newGasolina, listaGasoil: updatedListaGasoil, planes: updatedPlanes };
    }

    default:
      return state;
  }
}

export function useMaquinariaReducer() {
  const [state, dispatch] = useReducer(maquinariaReducer, initialState);

  const setDolar = (dolar) =>
    dispatch({ type: MAQUINARIA_ACTIONS.SET_DOLAR, payload: dolar });

  const setDolares = (dolares) =>
    dispatch({ type: MAQUINARIA_ACTIONS.SET_DOLARES, payload: dolares });

  const setGasoil = (gasoil) =>
    dispatch({ type: MAQUINARIA_ACTIONS.SET_GASOIL, payload: gasoil });

  const setListaGasoil = (listaGasoil) =>
    dispatch({ type: MAQUINARIA_ACTIONS.SET_LISTA_GASOIL, payload: listaGasoil });

  const setPlanes = (planes) =>
    dispatch({ type: MAQUINARIA_ACTIONS.SET_PLANES, payload: planes });

  const setTractores = (tractores) =>
    dispatch({ type: MAQUINARIA_ACTIONS.SET_TRACTORES, payload: tractores });

  const setImplementos = (implementos) =>
    dispatch({ type: MAQUINARIA_ACTIONS.SET_IMPLEMENTOS, payload: implementos });

  const addPlan = () =>
    dispatch({ type: MAQUINARIA_ACTIONS.ADD_PLAN });

  const updatePlan = (id, tractor, implemento) =>
    dispatch({ type: MAQUINARIA_ACTIONS.UPDATE_PLAN, payload: { id, tractor, implemento } });

  const deletePlan = (id) =>
    dispatch({ type: MAQUINARIA_ACTIONS.DELETE_PLAN, payload: id });

  const updateDolar = (dolar) =>
    dispatch({ type: MAQUINARIA_ACTIONS.UPDATE_DOLAR, payload: dolar });

  const updateGasolina = (gasoil) =>
    dispatch({ type: MAQUINARIA_ACTIONS.UPDATE_GASOLINA, payload: gasoil });

  return {
    ...state,
    setDolar,
    setDolares,
    setGasoil,
    setListaGasoil,
    setPlanes,
    setTractores,
    setImplementos,
    addPlan,
    updatePlan,
    deletePlan,
    updateDolar,
    updateGasolina,
  };
}
