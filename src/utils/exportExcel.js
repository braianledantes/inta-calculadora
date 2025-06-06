import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Exporta un array de objetos (o un único objeto) a Excel.
 * @param {Object|Object[]} planesMaquinaria - Datos del formulario de maquinaria.
 * @param {Object|Object[]} planesFertilizantes - Datos del formulario de fertilizantes.
 * @param {Object|Object[]} planesSanitizantes - Datos del formulario de sanitizantes.
 * @param {string} [fileName='datos'] - Nombre del archivo (sin extensión).
 */
export function exportFormToExcel(planesMaquinaria, planesFertilizantes, planesSanitizantes, planesEstadosFenologicos, valorDolar, valorGasoilina,  fileName = 'datos') {
  // Normaliza cada parámetro a array
  // console.log('Exportando a Excel:', {
  //   planesMaquinaria,
  //   planesFertilizantes,
  //   planesSanitizantes,
  //   fileName
  // });
  const dataMaquinaria   = Array.isArray(planesMaquinaria)   ? planesMaquinaria   : [planesMaquinaria];
  const dataFertilizantes= Array.isArray(planesFertilizantes)? planesFertilizantes: [planesFertilizantes];
  const dataSanitizantes  = Array.isArray(planesSanitizantes)  ? planesSanitizantes  : [planesSanitizantes];

  // Crea un nuevo libro
  const workbook = XLSX.utils.book_new();

  // Hoja 1: Maquinaria
  if (dataMaquinaria && Array.isArray(dataMaquinaria) && dataMaquinaria.length > 0) {
    // console.log('Datos de maquinaria:', dataMaquinaria);
    // Construir los datos en el formato de la imagen
    const maquinariaRows = dataMaquinaria.map(item => ({
      'Implemento': item.implemento?.nombre || '',
      'Precio dólar': item.implemento?.precioDolar || '',
      'Gasto conservación Coeficiente': item.implemento?.gastoMantenimiento || '',
      'horas utiles': item.implemento?.horasVidaUtil || '',
      'Valor residual %precio': (item.implemento?.porcentajeValorResidual ? `${item.implemento.porcentajeValorResidual}%` : ''),
      'Consumo combustible lt/hora CV': item.implemento?.consumoCombustible || '',
      'Amortización $/hora': item.amortizacionImplemento || '',
      'Costo Combustible $/hora': item.costoCombustibleImplemento || '0',
      'Gasto conservación $/hora': item.gastoConservacionImplemento || '0',
      'Costo Económico $/hora': item.costoEconomico || ''
    }));

    // Agregar el tractor como primera fila si existe
    if (dataMaquinaria[0]?.tractor) {
      maquinariaRows.unshift({
      'Implemento': `Tractor (${dataMaquinaria[0].tractor.potencia} CV)`,
      'Precio dólar': dataMaquinaria[0].tractor.precioDolar || '',
      'Gasto conservación Coeficiente': dataMaquinaria[0].tractor.gastoMantenimiento || '',
      'horas utiles': dataMaquinaria[0].tractor.horasVidaUtil || '',
      'Valor residual %precio': (dataMaquinaria[0].tractor.porcentajeValorResidual ? `${dataMaquinaria[0].tractor.porcentajeValorResidual}%` : ''),
      'Consumo combustible lt/hora CV': '', // El tractor no tiene este campo
      'Amortización $/hora': dataMaquinaria[0].amortizacionTractor || '',
      'Costo Combustible $/hora': '', // El tractor no tiene este campo
      'Gasto conservación $/hora': dataMaquinaria[0].gastoConservacionTractor || '',
      'Costo Económico $/hora': '' // El tractor no tiene este campo
      });
    }

    const wsMaquinaria = XLSX.utils.json_to_sheet(maquinariaRows);

    XLSX.utils.book_append_sheet(workbook, wsMaquinaria, 'Maquinaria');
  }

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
  const blob  = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${fileName}.xlsx`);
}

// dataMaquinaria formato:{
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