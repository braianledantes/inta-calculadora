import * as XLSX from 'xlsx';

let dolarCached = undefined;
let dolarFetching = false;
let dolarWaiters = [];

export const getDolar = async () => {
  
  if (dolarCached !== undefined) return dolarCached;

  if (dolarFetching) {
    // Si ya hay un fetch en curso, espera a que termine
    return new Promise((resolve) => dolarWaiters.push(resolve));
  }

  dolarFetching = true;

  try {
    const response = await fetch("https://dolarapi.com/v1/dolares/oficial");
    
    const data = await response.json();
    dolarCached = data.venta;
    dolarFetching = false;
    dolarWaiters.forEach((resolve) => resolve(dolarCached));
    dolarWaiters = [];
    return dolarCached;

  } catch (error) {

    dolarFetching = false;
    dolarWaiters.forEach((resolve) => resolve(0));
    dolarWaiters = [];
    console.error("Error fetching dollar value:", error);
    
    return 0;
  }
}

export const formatNumber = (number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}


/**
 * Procesa un archivo Excel y devuelve sus datos en formato JSON por hoja.
 * @param {File} file
 * @param {Function} callback función que recibe un array con los datos por hoja
 */
export function importExcel(file, callback) {
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    // Leer todas las hojas
    const allData = workbook.SheetNames.map((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
      return {
        name: sheetName,
        data: jsonData
      };
    });

    callback(allData); // Enviamos los datos por hoja
  };

  reader.readAsArrayBuffer(file);
}