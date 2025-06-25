import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { addMaquinariaSheet } from './sheets/maquinariaSheet.js';
import { addFertilizantesSheet } from './sheets/fertilizanteSheet.js';
import { addSanitizanteSheet } from './sheets/sanitizanteSheet.js';

export async function exportFormToExcel(
  planesMaquinaria,
  planesFertilizantes,
  planesSanitizantes,
  dolarMaquinaria, dolarFertilizante, dolarSanitizante,
  valorGasoilina,
  fileName = 'datos'
) {
  const workbook = new ExcelJS.Workbook();

  addMaquinariaSheet(workbook, planesMaquinaria, dolarMaquinaria.valor, valorGasoilina);
  addFertilizantesSheet(workbook, planesFertilizantes, dolarFertilizante.valor);
  addSanitizanteSheet(workbook, planesSanitizantes, dolarSanitizante.valor);

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, `${fileName}.xlsx`);
}