import { headerInfoStyle, tableHeaderStyle, generalCellStyle, applyStyle, tractorRowStyle, verdeSuave, amarilloSuave, borderStyle, celdaTotalStyle} from './excelStyles';

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function addSanitizanteSheet(workbook, planesSanitizantes, valorDolar) {
  if (!Array.isArray(planesSanitizantes) || planesSanitizantes.length === 0) return;

  const sheetSani = workbook.addWorksheet('Sanitizantes');

  // Cotización dólar
  sheetSani.getCell('B1').value = 'Cotización dólar';
  sheetSani.getCell('C1').value = valorDolar;

  ['B1', 'C1'].forEach(ref => {
    const cell = sheetSani.getCell(ref);
    applyStyle(cell, headerInfoStyle);
  });
  sheetSani.getRow(1).height = 30;
  sheetSani.getColumn('B').width = 20;
  sheetSani.getColumn('C').width = 13;

  // Encabezado principal
  sheetSani.addRow([
    'Insumos', 'Principio Activo', 'Tipo', 'Precio envase ($ USD)',
    'Dosis aplicación', 'Unidad dosis', 'Volumen envase', 'Unidad volumen',
    'Volumen por Hectárea', 'Cantidad de tratamientos', 'Cantidad',
    'Costo total por tratamiento ($)', 'Costo total por hectárea ($)'
  ]);

  const headerRow = sheetSani.getRow(2);
  headerRow.height = 30;

  for (let col = 4; col <= 13; col++) {
    sheetSani.getColumn(col).width = 15;
  }

  headerRow.eachCell((cell, colNumber) => {
    cell.value = capitalize(cell.value?.toString());
    if (colNumber <= 10) {
      applyStyle(cell, amarilloSuave);
    } else {
      applyStyle(cell, verdeSuave);
    }
  });

  planesSanitizantes.forEach((plan, index) => {
    const row = sheetSani.addRow([
      `${index + 1}`,
      plan.sanitizante?.nombre || '',
      plan.sanitizante?.tipo || '',
      plan.sanitizante?.precioEnvaseDolar || '',
      plan.sanitizante?.dosisAplicacion || '',
      plan.sanitizante?.unidadDosisAplicacion || '',
      plan.sanitizante?.volumenEnvase || '',
      plan.sanitizante?.unidadVolumenEnvase || '',
      plan.volumenPorHectarea || '',
      plan.cantTratamientos || '',
      null, null, null // Fórmulas
    ]);

    const r = row.number;
    const aplicarTractorStyle = index % 2 === 0;

    // Fórmulas
    sheetSani.getCell(`K${r}`).value = { formula: `E${r} * I${r}` };
    sheetSani.getCell(`L${r}`).value = { formula: `(D${r} * C1) * (E${r} / G${r})` };
    sheetSani.getCell(`M${r}`).value = { formula: `L${r} * I${r} * J${r}` };

    row.eachCell((cell, colNumber) => {
        applyStyle(cell, generalCellStyle);

        if (colNumber === 1) {
            cell.font = { ...cell.font, bold: true };
            // Aplica bordes completos al índice
            cell.border = { ...borderStyle };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF3F3F3' } // Color #f3f3f3 en formato ARGB
            };
        } else {
            // Fondo total o alternado
            if (colNumber === 13) {
            applyStyle(cell, celdaTotalStyle);
            }else if (aplicarTractorStyle) {
            applyStyle(cell, tractorRowStyle);
            }

            // Bordes exteriores solo para primeras y últimas columnas
            cell.border = {
            top: borderStyle.top,
            bottom: borderStyle.bottom,
            left: colNumber === 1 ? borderStyle.left : undefined,
            right: colNumber === 13 ? borderStyle.right : undefined
            };
        }
    });
  });
}