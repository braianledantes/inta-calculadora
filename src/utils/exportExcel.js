import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Exporta un array de objetos (o un único objeto) a Excel.
 * @param {Object|Object[]} planesMaquinaria - Datos del formulario de maquinaria.
 * @param {Object|Object[]} planesFertilizantes - Datos del formulario de fertilizantes.
 * @param {Object|Object[]} planesSanitizantes - Datos del formulario de sanitizantes.
 * @param {string} [fileName='datos'] - Nombre del archivo (sin extensión).
 */
export function exportFormToExcel(
  planesMaquinaria,
  planesFertilizantes,
  planesSanitizantes,
  planesEstadosFenologicos,
  valorDolar,
  valorGasoilina,
  fileName = 'datos'
) {
  // Normaliza cada parámetro a array
  const dataMaquinaria = Array.isArray(planesMaquinaria) ? planesMaquinaria : [planesMaquinaria];
  const dataFertilizantes = Array.isArray(planesFertilizantes) ? planesFertilizantes : [planesFertilizantes];
  const dataSanitizantes = Array.isArray(planesSanitizantes) ? planesSanitizantes : [planesSanitizantes];

  // Crea un nuevo libro
  const workbook = XLSX.utils.book_new();

  // Hoja 1: Maquinaria
  const maquinariaRows = [];

  dataMaquinaria.forEach((plan, index) => {
    // Fila tractor con plan
    maquinariaRows.push({
      'Plan': `Plan ${index + 1}`,
      'Implemento': 'Tractor',
      'Potencia': plan.tractor?.potencia || '',
      'Precio dólar': plan.tractor?.precioDolar || '',
      'Gasto conservación Coeficiente': plan.tractor?.gastoMantenimiento || '',
      'horas utiles': plan.tractor?.horasVidaUtil || '',
      'Valor residual %precio': plan.tractor?.porcentajeValorResidual
        ? `${plan.tractor.porcentajeValorResidual}%`
        : '',
      'Consumo combustible lt/hora CV': '',
      'Amortización $/hora': plan.amortizacionTractor || '',
      'Costo Combustible $/hora': '',
      'Gasto conservación $/hora': plan.gastoConservacionTractor || '',
      'Costo Económico $/hora': ''
    });

    // Fila implemento sin plan (vacío)
    maquinariaRows.push({
      'Plan': '',
      'Implemento': plan.implemento?.nombre || '',
      'Potencia': '',
      'Precio dólar': plan.implemento?.precioDolar || '',
      'Gasto conservación Coeficiente': plan.implemento?.gastoMantenimiento || '',
      'horas utiles': plan.implemento?.horasVidaUtil || '',
      'Valor residual %precio': plan.implemento?.porcentajeValorResidual
        ? `${plan.implemento.porcentajeValorResidual}%`
        : '',
      'Consumo combustible lt/hora CV': plan.implemento?.consumoCombustible || '',
      'Amortización $/hora': plan.amortizacionImplemento || '',
      'Costo Combustible $/hora': plan.costoCombustibleImplemento || '0',
      'Gasto conservación $/hora': plan.gastoConservacionImplemento || '0',
      'Costo Económico $/hora': ''
    });
  });

  const wsMaquinaria = XLSX.utils.json_to_sheet(maquinariaRows, { origin: 1 });

  wsMaquinaria[`A1`] = { v: 'Gasoil $/litro' };
  wsMaquinaria[`B1`] = { v: valorGasoilina };
  wsMaquinaria[`C1`] = { v: 'cotización dólar' };
  wsMaquinaria[`D1`] = { v: valorDolar };

  const range = XLSX.utils.decode_range(wsMaquinaria['!ref']);
  range.s.r = 0; // fila 1 (inicio del rango)
  wsMaquinaria['!ref'] = XLSX.utils.encode_range(range);

  XLSX.utils.book_append_sheet(workbook, wsMaquinaria, 'Maquinaria');

  // Hoja 2: Fertilizantes
  if (dataFertilizantes && Array.isArray(dataFertilizantes) && dataFertilizantes.length > 0) {
    const wsFertilizantes = XLSX.utils.json_to_sheet(dataFertilizantes);
    XLSX.utils.book_append_sheet(workbook, wsFertilizantes, 'Fertilizantes');
  }

  // Hoja 3: Sanitizantes
  if (dataSanitizantes && Array.isArray(dataSanitizantes) && dataSanitizantes.length > 0) {
    const wsSanitizantes = XLSX.utils.json_to_sheet(dataSanitizantes);
    XLSX.utils.book_append_sheet(workbook, wsSanitizantes, 'Sanitizantes');
  }

  // Genera el binario y descarga
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${fileName}.xlsx`);
}

// dataMaquinaria ejemplo:
// {
//   "id": 1,
//   "tractor": {
//       "id": 1,
//       "nombre": "Tractor 1",
//       "precioDolar": 60775,
//       "gastoMantenimiento": 0.00007,
//       "horasVidaUtil": 12000,
//       "porcentajeValorResidual": 20,
//       "potencia": 60
//   },
//   "implemento": {
//       "id": 1,
//       "nombre": "Acoplado Metálico",
//       "precioDolar": 8287.5,
//       "gastoMantenimiento": 0.0004,
//       "horasVidaUtil": 10000,
//       "porcentajeValorResidual": 10,
//       "consumoCombustible": 0.1
//   },
//   "amortizacionTractor": 4862,
//   "gastoConservacionTractor": 5105,
//   "amortizacionImplemento": 895,
//   "costoCombustibleImplemento": 0,
//   "gastoConservacionImplemento": 3978,
//   "costoEconomico": 14840
// }
