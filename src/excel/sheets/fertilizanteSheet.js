import {
  amarilloSuave,
  applyStyle,
  borderStyle,
  celdaTotalStyle,
  generalCellStyle,
  headerInfoStyle,
  tractorRowStyle,
  verdeSuave
} from './excelStyles';

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function addFertilizantesSheet(workbook, planesFertilizantes, valorDolar) {
  if (!Array.isArray(planesFertilizantes) || planesFertilizantes.length === 0) return;

  const sheet = workbook.addWorksheet('Fertilizantes');

  sheet.eachRow({ includeEmpty: true }, row => {
    row.eachCell({ includeEmpty: true }, cell => {
      cell.font = { name: 'Montserrat', size: 9 };
    });
  });

  // Cotización dólar
  sheet.getCell('B1').value = 'Cotización dólar';
  sheet.getCell('C1').value = valorDolar;

  ['B1', 'C1'].forEach(ref => {
    const cell = sheet.getCell(ref);
    applyStyle(cell, headerInfoStyle);
  });

  sheet.getRow(1).height = 30;
  sheet.getColumn('B').width = 20;
  sheet.getColumn('C').width = 15;

  // Encabezado
  sheet.addRow([
    'Plan', 'Principio Activo', 'Precio envase ($ USD)', 'Dosis aplicación',
    'Unidad dosis', 'Volumen envase', 'Unidad volumen',
    'Cantidad de tratamientos', 'Costo total por tratamiento ($)',
    'Costo total por hectárea ($)'
  ]);

  const headerRow = sheet.getRow(2);
  headerRow.height = 40;

  for (let col = 4; col <= 10; col++) {
    sheet.getColumn(col).width = 15;
  }

  headerRow.eachCell((cell, colNumber) => {
    cell.value = capitalize(cell.value?.toString());
    if (colNumber <= 8) {
      applyStyle(cell, amarilloSuave);
    } else {
      applyStyle(cell, verdeSuave);
    }
  });

  planesFertilizantes.forEach((plan, index) => {
    const row = sheet.addRow([
      `${index + 1}`,
      plan.fertilizante?.nombre || '',
      plan.fertilizante?.precioEnvaseDolar || '',
      plan.fertilizante?.dosisAplicacion || '',
      plan.fertilizante?.unidadDosisAplicacion || '',
      plan.fertilizante?.volumenEnvase || '',
      plan.fertilizante?.unidadVolumenEnvase || '',
      plan.cantTratamientos || '',
      '', // Fórmulas
      ''
    ]);

    const r = row.number;

    sheet.getCell(`I${r}`).value = { formula: `C${r} * C1 * D${r}` };
    sheet.getCell(`J${r}`).value = { formula: `H${r} * I${r}` };

    const aplicarTractorStyle = index % 2 === 0;

    row.eachCell((cell, colNumber) => {
      applyStyle(cell, generalCellStyle);

      // Siempre negrita y borde completo en celda índice
      if (colNumber === 1) {
        cell.font = { ...cell.font, bold: true };
        cell.border = { ...borderStyle };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF3F3F3' } // Color #f3f3f3 
        };
      } else {
        cell.border = {
          top: borderStyle.top,
          bottom: borderStyle.bottom,
          left: colNumber === 1 ? borderStyle.left : undefined,
          right: colNumber === 10 ? borderStyle.right : undefined
        };

        if (colNumber === 10) {
          applyStyle(cell, celdaTotalStyle);
        } else if (aplicarTractorStyle) {
          applyStyle(cell, tractorRowStyle);
        }
      }
    });
  });
}