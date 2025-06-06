import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Exporta un array de objetos (o un único objeto) a Excel.
 * @param {Object|Object[]} planesMaquinaria - Datos del formulario de maquinaria.
 * @param {Object|Object[]} planesFertilizantes - Datos del formulario de fertilizantes.
 * @param {Object|Object[]} planesSanitizantes - Datos del formulario de sanitizantes.
 * @param {string} [fileName='datos'] - Nombre del archivo (sin extensión).
 */
export function exportFormToExcel(planesMaquinaria, planesFertilizantes, planesSanitizantes, fileName = 'datos') {
  // Normaliza cada parámetro a array
  console.log('Exportando a Excel:', {
    planesMaquinaria,
    planesFertilizantes,
    planesSanitizantes,
    fileName
  });
  const dataMaquinaria   = Array.isArray(planesMaquinaria)   ? planesMaquinaria   : [planesMaquinaria];
  const dataFertilizantes= Array.isArray(planesFertilizantes)? planesFertilizantes: [planesFertilizantes];
  const dataSanitizantes  = Array.isArray(planesSanitizantes)  ? planesSanitizantes  : [planesSanitizantes];

  // Crea un nuevo libro
  const workbook = XLSX.utils.book_new();

  // Hoja 1: Maquinaria
  const wsMaquinaria = XLSX.utils.json_to_sheet(dataMaquinaria);
  XLSX.utils.book_append_sheet(workbook, wsMaquinaria, 'Maquinaria');

  // Hoja 2: Fertilizantes
  const wsFertilizantes = XLSX.utils.json_to_sheet(dataFertilizantes);
  XLSX.utils.book_append_sheet(workbook, wsFertilizantes, 'Fertilizantes');

  // Hoja 3: Sanitizantes
  const wsSanitizantes = XLSX.utils.json_to_sheet(dataSanitizantes);
  XLSX.utils.book_append_sheet(workbook, wsSanitizantes, 'Sanitizantes');

  // Genera el binario y descarga
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob  = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${fileName}.xlsx`);
}