import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Exporta un array de objetos (o un único objeto) a Excel.
 * @param {Object|Object[]} formData - Datos del formulario.
 * @param {string} [fileName='datos'] - Nombre del archivo (sin extensión).
 */
export function exportFormToExcel(formData, fileName = 'datos') {
  const dataArray = Array.isArray(formData) ? formData : [formData];
  // Convierte JSON a hoja de cálculo
  const worksheet = XLSX.utils.json_to_sheet(dataArray);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
  // Genera el binario
  const wbout = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });
  const blob = new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  saveAs(blob, `${fileName}.xlsx`);
}