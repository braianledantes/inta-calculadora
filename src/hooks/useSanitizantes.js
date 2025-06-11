import { useEffect, useState } from "react";
import { getDolar } from "../utils/utils.js";
import { calcularValoresPlanSanitario, calcularValoresProductoSanitario } from "../services/calculos.js";
import * as LocalDb from "../data/local.js";

/*
const planes = [
  {
    id: 1,
    name: "Plan 1",
    total: 0,
    tratamientos: [
      {
        id: 1,
        fecha: "2023-10-01",
        total: 0,
        productos: [
          {
            id: 1,
            sanitizante: {
              numero: 1,
              nombre: "ACEITE MINERAL",
              precioEnvaseDolar: 2.80,
              volumenEnvase: 1,
              unidadVolumenEnvase: "lt",
              dosisAplicacion: 1,
              unidadDosisAplicacion: "lt",
              tipo: "plaguicida",
            },
            precio: 2.80,
            dosisPorHectarea: 1,
            volumenPorHectarea: 1,
            cantidadPorHectarea: 1,
            costoTotalPorHectarea: 2.80,
          }
        ]
      }
    ]
  }
]
*/

export const useSanitizantes = () => {
  const [valorDolar, setValorDollar] = useState(0);
  const [planes, setPlanes] = useState([]);

  const [sanitizantes, setSanitizantes] = useState(LocalDb.getSanitizantes());

  useEffect(() => {
    const fetchDolar = async () => {
      const valor = await getDolar();
      setValorDollar(valor);
    }
    fetchDolar().then();
  }, []);

  const saveSanitizantes = (s) => {
    setSanitizantes(s);
    LocalDb.saveSanitizantes(s);
  }

  const getPlan = (id) => {
    return planes.find((plan) => plan.id === id);
  }

  const addPlan = () => {
    const newId = planes.at(-1)?.id + 1 || 1
    const newPlan = {
      id: newId,
      name: `Plan ${newId}`,
      total: 0,
      tratamientos: [],
    }
    setPlanes([...planes, newPlan]);
  }

  const addTratamiento = (planId) => {
    const plan = getPlan(planId);
    if (!plan) return;
    const newId = plan.tratamientos.at(-1)?.id + 1 || 1;
    const newTratamiento = {
      id: newId,
      fecha: new Date(), // Fecha actual
      total: 0,
      productos: [],
    };
    const updatedPlan = {
      ...plan,
      tratamientos: [...plan.tratamientos, newTratamiento],
    };
    setPlanes(planes.map(p => p.id === planId ? updatedPlan : p));
  }

  const updateTratamiento = (planId, tratamientoId, fecha) => {
    const plan = getPlan(planId);
    if (!plan) return;
    const updatedTratamientos = plan.tratamientos.map(t => {
      if (t.id === tratamientoId) {
        return {
          ...t,
          fecha: fecha
        };
      }
      return t;
    });
    const updatedPlan = {
      ...plan,
      tratamientos: updatedTratamientos,
    };
    setPlanes(planes.map(p => p.id === planId ? updatedPlan : p));
  }

  /**
   * Actualiza los costos de un plan sanitario recalculando los costos de cada tratamiento y sus productos.
   * @param {*} plan Plan a actualizar
   * @returns Plan actualizado con los costos recalculados
   */
  const actualizarCostosPlan = (plan) => {
    // recalcula los costos de los productos
    const updatedTratamientos = plan.tratamientos.map(tratamiento => {
      const updatedProductos = tratamiento.productos.map(producto => {
        const { cantidadPorHectarea, costoTotalPorHectarea } = calcularValoresProductoSanitario(producto.precio, producto.volumenPorHectarea, producto.dosisPorHectarea, valorDolar);
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
    // recalcula el total del plan
    const totalPlan = updatedTratamientos.reduce((acc, t) => acc + t.total, 0);
    return {
      ...plan,
      tratamientos: updatedTratamientos,
      total: totalPlan,
    };
  }

  /**
   * Elimina un tratamiento del plan especificado y actualiza los costos.
   * @param {*} planId
   * @param {*} tratamientoId
   * @returns
   */
  const deleteTratamiento = (planId, tratamientoId) => {
    const plan = getPlan(planId);
    if (!plan) return;

    const updatedTratamientos = plan.tratamientos.filter(t => t.id !== tratamientoId);
    const updatedPlan = {
      ...plan,
      tratamientos: updatedTratamientos,
    };
    // recalcula los costos del plan
    const planActualizado = actualizarCostosPlan(updatedPlan);
    setPlanes(planes.map(p => p.id === planId ? planActualizado : p));
  }

  const addProducto = (planId, tratamientoId) => {
    // obtiene un sanitizante por defecto
    const sanitizante = sanitizantes[0];
    if (!sanitizante) return;
    const plan = getPlan(planId);
    if (!plan) return;
    const tratamiento = plan.tratamientos.find(t => t.id === tratamientoId);
    if (!tratamiento) return;
    // crea un nuevo producto con el sanitizante seleccionado y lo agrega al tratamiento
    const newId = tratamiento.productos.at(-1)?.id + 1 || 1;
    const newProducto = {
      id: newId,
      sanitizante: {
        numero: sanitizante.numero,
        nombre: sanitizante.nombre,
        precioEnvaseDolar: sanitizante.precioEnvaseDolar,
        volumenEnvase: sanitizante.volumenEnvase,
        unidadVolumenEnvase: sanitizante.unidadVolumenEnvase,
        dosisAplicacion: sanitizante.dosisAplicacion,
        unidadDosisAplicacion: sanitizante.unidadDosisAplicacion,
        tipo: sanitizante.tipo,
      },
      precio: sanitizante.precioEnvaseDolar,
      dosisPorHectarea: sanitizante.dosisAplicacion,
      volumenPorHectarea: 1, // por defecto 1 litro
    };
    const newProductos = [...tratamiento.productos, newProducto];
    const updatedTratamiento = {
      ...tratamiento,
      productos: newProductos,
    };
    const newTratamientos = plan.tratamientos.map(t => t.id === tratamientoId ? updatedTratamiento : t);
    const updatedPlan = {
      ...plan,
      tratamientos: newTratamientos,
    };
    // recalcula los costos del plan
    const planActualizado = actualizarCostosPlan(updatedPlan);
    setPlanes(planes.map(p => p.id === planId ? planActualizado : p));
  }

  const updateProducto = (planId, tratamientoId, idProducto, sanitizante, precio, dosisPorHectarea = 1, volumenPorHectarea = 1) => {
    const plan = getPlan(planId);
    if (!plan) return;
    const tratamiento = plan.tratamientos.find(t => t.id === tratamientoId);
    if (!tratamiento) return;
    const updatedProductos = tratamiento.productos.map(p => {
      if (p.id === idProducto) {
        return {
          ...p,
          sanitizante: {
            numero: sanitizante.numero,
            nombre: sanitizante.nombre,
            precioEnvaseDolar: sanitizante.precioEnvaseDolar,
            volumenEnvase: sanitizante.volumenEnvase,
            unidadVolumenEnvase: sanitizante.unidadVolumenEnvase,
            dosisAplicacion: sanitizante.dosisAplicacion,
            unidadDosisAplicacion: sanitizante.unidadDosisAplicacion,
            tipo: sanitizante.tipo,
          },
          precio,
          dosisPorHectarea,
          volumenPorHectarea
        };
      }
      return p;
    });
    const updatedTratamiento = {
      ...tratamiento,
      productos: updatedProductos,
    };
    const newTratamientos = plan.tratamientos.map(t => t.id === tratamientoId ? updatedTratamiento : t);
    const updatedPlan = {
      ...plan,
      tratamientos: newTratamientos,
    };
    // recalcula los costos del plan
    const planActualizado = actualizarCostosPlan(updatedPlan);
    setPlanes(planes.map(p => p.id === planId ? planActualizado : p));
  }

  const deleteProducto = (planId, tratamientoId, idProducto) => {
    const plan = getPlan(planId);
    if (!plan) return;
    const tratamiento = plan.tratamientos.find(t => t.id === tratamientoId);
    if (!tratamiento) return;
    const updatedProductos = tratamiento.productos.filter(p => p.id !== idProducto);
    const updatedTratamiento = {
      ...tratamiento,
      productos: updatedProductos,
    };
    const newTratamientos = plan.tratamientos.map(t => t.id === tratamientoId ? updatedTratamiento : t);
    const updatedPlan = {
      ...plan,
      tratamientos: newTratamientos,
    };
    // recalcula los costos del plan
    const planActualizado = actualizarCostosPlan(updatedPlan);
    setPlanes(planes.map(p => p.id === planId ? planActualizado : p));
  }

  const deletePlan = (id) => {
    setPlanes(planes.filter(plan => plan.id !== id));
  }

  /**
   * Actualiza el valor del dólar y recalcula los costos de los planes sanitarios.
   * @param {*} newValue Nuevo valor del dólar
   */
  const updateDolar = async (newValue) => {
    setValorDollar(newValue);
    const updatedPlanes = planes.map(plan => (actualizarCostosPlan(plan)));
    setPlanes(updatedPlanes);
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
    deletePlan,
    saveSanitizantes,
    addTratamiento,
    updateTratamiento,
    deleteTratamiento,
    addProducto,
    deleteProducto,
    updateProducto,
  };
}