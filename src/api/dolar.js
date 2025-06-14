let dolarCached = undefined;
let dolarFetching = false;
let dolarWaiters = [];

/**
 * Obtiene el precio del dólar oficial y dólar tarjeta desde dos APIs distintas.
 * Si ya se ha realizado una solicitud, devuelve el valor cacheado.
 * Si hay una solicitud en curso, espera a que se complete.
 * Si ocurre un error, devuelve 0 para ambos tipos.
 * @async 
 * @returns {Promise<{oficial: number, tarjeta: number}>}
 */
export const getDolar = async () => {
  if (dolarCached !== undefined) return dolarCached;

  if (dolarFetching) {
    return new Promise((resolve) => dolarWaiters.push(resolve));
  }

  dolarFetching = true;

  try {
    const urls = [
      'https://dolarapi.com/v1/dolares/oficial',   // <-- Reemplazá por tu API real
      'https://dolarapi.com/v1/dolares/tarjeta',   // <-- Reemplazá por tu API real
    ];

    const responses = await Promise.all(urls.map(url => fetch(url)));
    const data = await Promise.all(responses.map(res => res.json()));

    dolarCached = {
      oficial: getDolarValor(data[0].compra),
      tarjeta: getDolarValor(data[1].compra),
    };

    dolarFetching = false;
    dolarWaiters.forEach(resolve => resolve(dolarCached));
    dolarWaiters = [];

    return dolarCached;

  } catch (error) {
    console.error("Error al obtener los precios del dólar:", error);
    dolarFetching = false;
    dolarWaiters.forEach(resolve => resolve({ oficial: 0, tarjeta: 0 }));
    dolarWaiters = [];
    return { oficial: 0, tarjeta: 0 };
  }
};

/**
 * Obtiene el valor del dólar desde la respuesta de la API.
 * Modificá esta función según la estructura de tu API.
 * @param {Object} result - El resultado de la API de dólar.
 * @returns {number} - El precio del dólar o 0 si no se encuentra.
 */
const getDolarValor = (result) => {
  // Ejemplo: si la API devuelve { precio: 123.45 }
  if (result && typeof result === "number") {
    return result;
  }
  // Modificá según la estructura real de tu API
  return 0;
};