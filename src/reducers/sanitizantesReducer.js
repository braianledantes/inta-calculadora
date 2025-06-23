import { useReducer } from "react";
import { DOLAR_DEFAULT } from "../api/dolar.js";
import { calcularValoresProductoSanitario } from "../services/calculos.js";
import * as LocalDb from "../data/local.js";

const initialState = {
  dolar: DOLAR_DEFAULT,
  dolares: [DOLAR_DEFAULT],
  planes: [],
  sanitizantes: LocalDb.getSanitizantes(),
};

const ACTIONS = {
  SET_DOLAR: "SET_DOLAR",
  SET_DOLARES: "SET_DOLARES",
  SET_PLANES: "SET_PLANES",
  SET_SANITIZANTES: "SET_SANITIZANTES",
  ADD_PLAN: "ADD_PLAN",
  DELETE_PLAN: "DELETE_PLAN",
  ADD_TRATAMIENTO: "ADD_TRATAMIENTO",
  UPDATE_TRATAMIENTO: "UPDATE_TRATAMIENTO",
  DELETE_TRATAMIENTO: "DELETE_TRATAMIENTO",
  ADD_PRODUCTO: "ADD_PRODUCTO",
  UPDATE_PRODUCTO: "UPDATE_PRODUCTO",
  DELETE_PRODUCTO: "DELETE_PRODUCTO",
  UPDATE_DOLAR: "UPDATE_DOLAR",
};

function actualizarCostosPlan(plan, valorDolar = DOLAR_DEFAULT.valor) {
  const updatedTratamientos = plan.tratamientos.map(tratamiento => {
    const updatedProductos = tratamiento.productos.map(producto => {
      const { cantidadPorHectarea, costoTotalPorHectarea } = calcularValoresProductoSanitario(
        producto.precio,
        producto.volumenPorHectarea,
        producto.dosisPorHectarea,
        valorDolar
      );
      return {
        ...producto,
        cantidadPorHectarea,
        costoTotalPorHectarea,
      };
    });
    const totalTratamiento = updatedProductos.reduce((acc, p) => acc + p.costoTotalPorHectarea, 0);
    return {
      ...tratamiento,
      productos: updatedProductos,
      total: totalTratamiento,
    };
  });
  const totalPlan = updatedTratamientos.reduce((acc, t) => acc + t.total, 0);
  return {
    ...plan,
    tratamientos: updatedTratamientos,
    total: totalPlan,
  };
}

function sanitizantesReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_DOLAR:
      return { ...state, dolar: action.payload };
    case ACTIONS.SET_DOLARES:
      return { ...state, dolares: action.payload };
    case ACTIONS.SET_PLANES:
      return { ...state, planes: action.payload };
    case ACTIONS.SET_SANITIZANTES:
      LocalDb.saveSanitizantes(action.payload);
      return { ...state, sanitizantes: action.payload };
    case ACTIONS.ADD_PLAN: {
      const { planes, sanitizantes } = state;
      if (sanitizantes.length === 0) {
        console.error("No hay sanitizantes disponibles para crear un plan.");
        return state; // No se puede agregar un plan sin sanitizantes
      }

      const newId = planes.at(-1)?.id + 1 || 1;
      const newPlan = {
        id: newId,
        name: `Plan ${newId}`,
        total: 0,
        tratamientos: [],
      };
      return { ...state, planes: [...planes, newPlan] };
    }
    case ACTIONS.DELETE_PLAN:
      return { ...state, planes: state.planes.filter(plan => plan.id !== action.payload) };
    case ACTIONS.ADD_TRATAMIENTO: {
      const { planId } = action.payload;
      const plan = state.planes.find(p => p.id === planId);
      if (!plan) return state;
      const newId = plan.tratamientos.at(-1)?.id + 1 || 1;
      const newTratamiento = {
        id: newId,
        fecha: new Date(),
        total: 0,
        productos: [],
      };
      const updatedPlan = {
        ...plan,
        tratamientos: [...plan.tratamientos, newTratamiento],
      };
      return {
        ...state,
        planes: state.planes.map(p => p.id === planId ? updatedPlan : p),
      };
    }
    case ACTIONS.UPDATE_TRATAMIENTO: {
      const { planId, tratamientoId, fecha } = action.payload;
      const plan = state.planes.find(p => p.id === planId);
      if (!plan) return state;
      const updatedTratamientos = plan.tratamientos.map(t => t.id === tratamientoId ? { ...t, fecha } : t);
      const updatedPlan = { ...plan, tratamientos: updatedTratamientos };
      return {
        ...state,
        planes: state.planes.map(p => p.id === planId ? updatedPlan : p),
      };
    }
    case ACTIONS.DELETE_TRATAMIENTO: {
      const { planId, tratamientoId } = action.payload;
      const plan = state.planes.find(p => p.id === planId);
      if (!plan) return state;
      const updatedTratamientos = plan.tratamientos.filter(t => t.id !== tratamientoId);
      const updatedPlan = actualizarCostosPlan({ ...plan, tratamientos: updatedTratamientos });
      return {
        ...state,
        planes: state.planes.map(p => p.id === planId ? updatedPlan : p),
      };
    }
    case ACTIONS.ADD_PRODUCTO: {
      const { planId, tratamientoId } = action.payload;
      const plan = state.planes.find(p => p.id === planId);
      if (!plan) return state;
      const tratamiento = plan.tratamientos.find(t => t.id === tratamientoId);
      if (!tratamiento) return state;
      const sanitizante = state.sanitizantes[0];
      if (!sanitizante) return state;
      const newId = tratamiento.productos.at(-1)?.id + 1 || 1;
      const newProducto = {
        id: newId,
        sanitizante: { ...sanitizante },
        precio: sanitizante.precioEnvaseDolar,
        dosisPorHectarea: sanitizante.dosisAplicacion,
        volumenPorHectarea: 1,
      };
      const newProductos = [...tratamiento.productos, newProducto];
      const updatedTratamiento = { ...tratamiento, productos: newProductos };
      const newTratamientos = plan.tratamientos.map(t => t.id === tratamientoId ? updatedTratamiento : t);
      const updatedPlan = actualizarCostosPlan({ ...plan, tratamientos: newTratamientos });
      return {
        ...state,
        planes: state.planes.map(p => p.id === planId ? updatedPlan : p),
      };
    }
    case ACTIONS.UPDATE_PRODUCTO: {
      const { planId, tratamientoId, idProducto, sanitizante, precio, dosisPorHectarea = 1, volumenPorHectarea = 1 } = action.payload;
      const plan = state.planes.find(p => p.id === planId);
      if (!plan) return state;
      const tratamiento = plan.tratamientos.find(t => t.id === tratamientoId);
      if (!tratamiento) return state;
      const updatedProductos = tratamiento.productos.map(p => p.id === idProducto ? {
        ...p,
        sanitizante: { ...sanitizante },
        precio,
        dosisPorHectarea,
        volumenPorHectarea,
      } : p);
      const updatedTratamiento = { ...tratamiento, productos: updatedProductos };
      const newTratamientos = plan.tratamientos.map(t => t.id === tratamientoId ? updatedTratamiento : t);
      const updatedPlan = actualizarCostosPlan({ ...plan, tratamientos: newTratamientos });
      return {
        ...state,
        planes: state.planes.map(p => p.id === planId ? updatedPlan : p),
      };
    }
    case ACTIONS.DELETE_PRODUCTO: {
      const { planId, tratamientoId, idProducto } = action.payload;
      const plan = state.planes.find(p => p.id === planId);
      if (!plan) return state;
      const tratamiento = plan.tratamientos.find(t => t.id === tratamientoId);
      if (!tratamiento) return state;
      const updatedProductos = tratamiento.productos.filter(p => p.id !== idProducto);
      const updatedTratamiento = { ...tratamiento, productos: updatedProductos };
      const newTratamientos = plan.tratamientos.map(t => t.id === tratamientoId ? updatedTratamiento : t);
      const updatedPlan = actualizarCostosPlan({ ...plan, tratamientos: newTratamientos });
      return {
        ...state,
        planes: state.planes.map(p => p.id === planId ? updatedPlan : p),
      };
    }
    case ACTIONS.UPDATE_DOLAR: {
      const newDolar = action.payload;
      const updatedDolares = state.dolares.find(d => d.tipo === newDolar.tipo)
        ? state.dolares.map(d => d.tipo === newDolar.tipo ? newDolar : d)
        : [...state.dolares, newDolar];
      const updatedPlanes = state.planes.map(plan => actualizarCostosPlan(plan, newDolar.valor));
      return { ...state, dolar: newDolar, dolares: updatedDolares, planes: updatedPlanes };
    }
    default:
      return state;
  }
}

export function useSanitizantesReducer() {
  const [state, dispatch] = useReducer(sanitizantesReducer, initialState);

  // Acciones encapsuladas
  const setDolar = (dolar) => dispatch({ type: ACTIONS.SET_DOLAR, payload: dolar });
  const setDolares = (dolares) => dispatch({ type: ACTIONS.SET_DOLARES, payload: dolares });
  const setPlanes = (planes) => dispatch({ type: ACTIONS.SET_PLANES, payload: planes });
  const setSanitizantes = (sanitizantes) => dispatch({ type: ACTIONS.SET_SANITIZANTES, payload: sanitizantes });
  const addPlan = () => dispatch({ type: ACTIONS.ADD_PLAN });
  const deletePlan = (id) => dispatch({ type: ACTIONS.DELETE_PLAN, payload: id });
  const addTratamiento = (planId) => dispatch({ type: ACTIONS.ADD_TRATAMIENTO, payload: { planId } });
  const updateTratamiento = (planId, tratamientoId, fecha) => dispatch({ type: ACTIONS.UPDATE_TRATAMIENTO, payload: { planId, tratamientoId, fecha } });
  const deleteTratamiento = (planId, tratamientoId) => dispatch({ type: ACTIONS.DELETE_TRATAMIENTO, payload: { planId, tratamientoId } });
  const addProducto = (planId, tratamientoId) => dispatch({ type: ACTIONS.ADD_PRODUCTO, payload: { planId, tratamientoId } });
  const updateProducto = (planId, tratamientoId, idProducto, sanitizante, precio, dosisPorHectarea, volumenPorHectarea) => dispatch({ type: ACTIONS.UPDATE_PRODUCTO, payload: { planId, tratamientoId, idProducto, sanitizante, precio, dosisPorHectarea, volumenPorHectarea } });
  const deleteProducto = (planId, tratamientoId, idProducto) => dispatch({ type: ACTIONS.DELETE_PRODUCTO, payload: { planId, tratamientoId, idProducto } });
  const updateDolar = (dolar) => dispatch({ type: ACTIONS.UPDATE_DOLAR, payload: dolar });

  const getPlan = (id) => state.planes.find(plan => plan.id === id);

  return {
    ...state,
    setDolar,
    setDolares,
    setPlanes,
    setSanitizantes,
    addPlan,
    deletePlan,
    addTratamiento,
    updateTratamiento,
    deleteTratamiento,
    addProducto,
    updateProducto,
    deleteProducto,
    updateDolar,
    getPlan,
  };
}
