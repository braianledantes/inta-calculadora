import ExcelJS from 'exceljs';
import {saveAs} from 'file-saver';
import {addMaquinariaSheet} from './sheets/maquinariaSheet';
import {addFertilizantesSheet} from './sheets/fertilizanteSheet';
import {addSanitizanteSheet} from './sheets/sanitizanteSheet';

export async function exportFormToExcel(
  planesMaquinaria,
  planesFertilizantes,
  planesSanitizantes,
  valorDolar,
  valorGasoilina,
  fileName = 'datos'
) {
  const workbook = new ExcelJS.Workbook();

  addMaquinariaSheet(workbook, planesMaquinaria, valorDolar, valorGasoilina);
  addFertilizantesSheet(workbook, planesFertilizantes, valorDolar);
  addSanitizanteSheet(workbook, planesSanitizantes, valorDolar);

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, `${fileName}.xlsx`);
}