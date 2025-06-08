import {
  headerInfoStyle,
  generalCellStyle,
  applyStyle,
  tractorRowStyle,
  verdeSuave,
  amarilloSuave,
  borderStyle,
  celdaTotalStyle
} from './excelStyles';

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function addMaquinariaSheet(workbook, planesMaquinaria, valorDolar, valorGasoilina) {
  if (!Array.isArray(planesMaquinaria) || planesMaquinaria.length === 0) return;
  const sheet = workbook.addWorksheet('Maquinaria');

  // Estilo por defecto
  sheet.eachRow({ includeEmpty: true }, row => {
    row.eachCell({ includeEmpty: true }, cell => {
      cell.font = { name: 'Montserrat', size: 9 };
    });
  });

  // Encabezado info
  sheet.getCell('B1').value = 'Gasoil $/Litro';
  sheet.getCell('C1').value = valorGasoilina;
  sheet.getCell('D1').value = 'Cotización Dólar';
  sheet.getCell('E1').value = valorDolar;

  ['B1', 'C1', 'D1', 'E1'].forEach(ref => {
    applyStyle(sheet.getCell(ref), headerInfoStyle);
  });

  sheet.getRow(1).height = 30;
  sheet.getColumn('B').width = 20;
  sheet.getColumn('C').width = 13;
  sheet.getColumn('D').width = 20;
  sheet.getColumn('E').width = 20;

  // Encabezado de tabla
  sheet.addRow([
    'Plan', 'Implemento', 'Potencia', 'Precio dólar',
    'Gasto conservación Coeficiente', 'horas utiles',
    'Valor residual %precio', 'Consumo combustible lt/hora CV',
    'Amortización $/hora', 'Costo Combustible $/hora',
    'Gasto conservación $/hora', 'Costo Económico $/hora'
  ]);

  const headerRow = sheet.getRow(2);
  headerRow.height = 40;

  for (let col = 6; col <= 12; col++) {
    sheet.getColumn(col).width = 15;
  }

  headerRow.eachCell((cell, colNumber) => {
    cell.value = capitalize(cell.value?.toString());
    applyStyle(cell, colNumber <= 8 ? amarilloSuave : verdeSuave);
  });

  const data = Array.isArray(planesMaquinaria) ? planesMaquinaria : [planesMaquinaria];

  data.forEach((plan, index) => {
    // Fila Tractor
    const rowTractor = sheet.addRow([
      `${index + 1}`,
      'Tractor',
      plan.tractor?.potencia || '',
      plan.tractor?.precioDolar || '',
      plan.tractor?.gastoMantenimiento || '',
      plan.tractor?.horasVidaUtil || '',
      plan.tractor?.porcentajeValorResidual || '',
      '',
      '', '', '', ''
    ]);

    rowTractor.eachCell(cell => applyStyle(cell, tractorRowStyle));
    const r = rowTractor.number;

    rowTractor.getCell(9).value = { formula: `(D${r} - (D${r} * (G${r}/100))) / F${r} * E1` };
    rowTractor.getCell(11).value = { formula: `D${r} * E1 * E${r}` };

    // Fila Implemento
    const rowImplemento = sheet.addRow([
      '',
      plan.implemento?.nombre || '',
      '',
      plan.implemento?.precioDolar || '',
      plan.implemento?.gastoMantenimiento || '',
      plan.implemento?.horasVidaUtil || '',
      plan.implemento?.porcentajeValorResidual || '',
      plan.implemento?.consumoCombustible || '',
      null, null, null, null
    ]);

    const rI = rowImplemento.number;

    rowImplemento.getCell(9).value = { formula: `(D${rI} - (D${rI} * (G${rI}/100))) / F${rI} * E1` };
    rowImplemento.getCell(10).value = { formula: `C1 * H${rI} * C${r}` };
    rowImplemento.getCell(11).value = { formula: `D${rI} * E1 * E${rI}` };
    rowImplemento.getCell(12).value = {
      formula: `I${r} + I${rI} + J${rI} + K${r} + K${rI}`
    };

    rowImplemento.eachCell(cell => applyStyle(cell, generalCellStyle));

    // Bordes para celda costo económico $/hora (columna 12)
    const totalCell = rowImplemento.getCell(12);

    applyStyle(totalCell, {
      ...celdaTotalStyle,
      border: {
        top: borderStyle.top,
        bottom: borderStyle.bottom,
        left: borderStyle.left,
        right: borderStyle.right
      },
      alignment: { horizontal: 'center', vertical: 'middle' }
    });

    // Merge celda índice Plan y aplicar bordes completos
    sheet.mergeCells(`A${r}:A${rI}`);


    // Bordes externos para cada celda en fila tractor e implemento
    for (let col = 1; col <= 12; col++) {
      const cellTop = sheet.getCell(r, col);
      const cellBottom = sheet.getCell(rI, col);

      cellTop.border = {
        ...cellTop.border,
        top: borderStyle.top,
        left: col === 1 ? borderStyle.left : undefined,
        right: col === 12 ? borderStyle.right : undefined
      };

      cellBottom.border = {
        ...cellBottom.border,
        bottom: borderStyle.bottom,
        left: col === 1 ? borderStyle.left : undefined,
        right: col === 12 ? borderStyle.right : undefined
      };
    }
  });

  // Estilo general si no tiene fill o border
  sheet.eachRow({ includeEmpty: false }, row => {
    row.eachCell(cell => {
      if (!cell.fill && !cell.border) {
        applyStyle(cell, generalCellStyle);
      }
    });
  });
}
