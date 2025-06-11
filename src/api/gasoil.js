let gasoilCached = undefined;
let gasoilFetching = false;
let gasoilWaiters = [];

/**
 * Obtiene el precio del gasoil grado 2 y grado 3 de la provincia de Buenos Aires de la API de datos de energía.
 * Si ya se ha realizado una solicitud, devuelve el valor cacheado.
 * Si hay una solicitud en curso, espera a que se complete.
 * Si ocurre un error, devuelve 0 para ambos grados.
 * @async 
 * @returns {Promise<{grado2: number, grado3: number}>}
 */
export const getGasoil = async () => {
  if (gasoilCached !== undefined) return gasoilCached;

  if (gasoilFetching) {
    return new Promise((resolve) => gasoilWaiters.push(resolve));
  }

  gasoilFetching = true;

  try {
    const urls = [
      'http://datos.energia.gob.ar/api/3/action/datastore_search?resource_id=80ac25de-a44a-4445-9215-090cf55cfda5&filters={"producto":["Gas Oil Grado 2"]}',
      'http://datos.energia.gob.ar/api/3/action/datastore_search?resource_id=80ac25de-a44a-4445-9215-090cf55cfda5&filters={"producto":["Gas Oil Grado 3"]}',
    ];

    const responses = await Promise.all(urls.map(url => fetch(url)));
    const data = await Promise.all(responses.map(res => res.json()));

    // records es un atributo de el obj data
    gasoilCached = {
      grado2: getGasoilValor(data[0].result),
      grado3: getGasoilValor(data[1].result),
    }

    gasoilFetching = false;
    gasoilWaiters.forEach(resolve => resolve(gasoilCached));
    gasoilWaiters = [];

    return gasoilCached;

  } catch (error) {
    console.error("Error al obtener los precios de gasoil:", error);
    gasoilFetching = false;
    gasoilWaiters.forEach(resolve => resolve([]));
    gasoilWaiters = [];
    return [];
  }
};

/**
 * Obtiene el valor del gasoil grado 2 de la provincia de Buenos Aires.
 * Si no se encuentra el registro, devuelve 0.
 * @param {Object} result - El resultado de la API de gasoil.
 * @returns {number} - El precio del gasoil grado 2 o 0 si no se encuentra.
 */
const getGasoilValor = (result) => {
  const nombreProvincia = 'buenos aires'; // Provincia fija para la búsqueda

  if (result && result.records && result.records.length > 0) {
    const record = result.records.find(record => record.provincia.toLowerCase() === nombreProvincia);
    if (record) {
      const precio = parseFloat(record.precio);
      return isNaN(precio) ? 0 : precio;
    }

    // Si no se encuentra el registro para la provincia, devuelve la primera
    const precio = parseFloat(result.records[0].precio);
    return isNaN(precio) ? 0 : precio;
  }
  return 0;
}
