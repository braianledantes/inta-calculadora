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

export function addSanitizanteSheet(workbook, planesSanitizantes, valorDolar) {
  if (!Array.isArray(planesSanitizantes) || planesSanitizantes.length === 0) return;

  const sheet = workbook.addWorksheet('Sanitizantes');

  // Estilo fuente por defecto
  sheet.eachRow({ includeEmpty: true }, row => {
    row.eachCell({ includeEmpty: true }, cell => {
      cell.font = { name: 'Montserrat', size: 9 };
    });
  });

  // Fila cotización
  sheet.getCell('B1').value = 'Cotización dólar';
  sheet.getCell('C1').value = valorDolar;
  ['B1', 'C1'].forEach(ref => applyStyle(sheet.getCell(ref), headerInfoStyle));
  sheet.getRow(1).height = 30;
  sheet.getColumn('B').width = 20;
  sheet.getColumn('C').width = 13;

  // Encabezado de tabla
  sheet.addRow([
    'Plan Fitosanitario', 'Tratamiento', 'Principio Activo', 'Tipo',
    'Precio envase ($ USD)', 'Dosis por ha', 'Unidad dosis',
    'Volumen por ha', 'Unidad volumen', 'Cant. por ha',
    'Costo por ha', 'Total $/hora'
  ]);

  const headerRow = sheet.getRow(2);
  headerRow.height = 30;

  const colWidths = [20, 18, 20, 15, 20, 15, 15, 15, 15, 15, 15, 20];
  colWidths.forEach((w, i) => sheet.getColumn(i + 1).width = w);

  headerRow.eachCell((cell, colNumber) => {
    cell.value = capitalize(cell.value?.toString());
    applyStyle(cell, colNumber >= 10 ? verdeSuave : amarilloSuave);
  });

  let currentRow = 3;

  planesSanitizantes.forEach((plan, indexPlan) => {
    const planStartRow = currentRow;

    plan.tratamientos.forEach((tratamiento, indexTratamiento) => {
      const tratamientoStartRow = currentRow;

      tratamiento.productos.forEach((producto, indexProducto) => {
        const row = sheet.addRow([
          `${indexPlan + 1}`,
          tratamiento.id,
          producto.sanitizante.nombre,
          producto.sanitizante.tipo,
          producto.precio,
          producto.dosisPorHectarea,
          producto.sanitizante.unidadDosisAplicacion,
          producto.volumenPorHectarea,
          producto.sanitizante.unidadVolumenEnvase,
          null, null, null
        ]);

        const r = row.number;

        // Fórmulas
        row.getCell(10).value = { formula: `F${r} * H${r}` };
        row.getCell(11).value = { formula: `J${r} * C1 * E${r}` };

        const esUltimoTratamiento = indexTratamiento === plan.tratamientos.length - 1;
        const esUltimoProducto = indexProducto === tratamiento.productos.length - 1;

        const isEven = (row.number - 3) % 2 === 0;
        const style = isEven ? tractorRowStyle : generalCellStyle;

        for (let col = 3; col <= 12; col++) {
          if (col === 12 && esUltimoTratamiento && esUltimoProducto) continue;
          const cell = row.getCell(col);
          applyStyle(cell, style);
        }

        [1, 2].forEach(col => {
          const cell = row.getCell(col);
          applyStyle(cell, {
            ...tractorRowStyle,
            alignment: { horizontal: 'center', vertical: 'middle' },
            font: { bold: true }
          });
        });

        if (esUltimoTratamiento && esUltimoProducto) {
          const totalCell = row.getCell(12);
          totalCell.value = {
            formula: `SUM(K${planStartRow}:K${r})`
          };
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
        }

        currentRow++;
      });

      if (tratamiento.productos.length > 1) {
        const start = tratamientoStartRow;
        const end = currentRow - 1;
        sheet.mergeCells(`B${start}:B${end}`);
      }
    });

    if (currentRow - planStartRow > 1) {
      sheet.mergeCells(`A${planStartRow}:A${currentRow - 1}`);
    }

    // Bordes exteriores del plan
    for (let col = 1; col <= 12; col++) {
      const cellTop = sheet.getCell(planStartRow, col);
      const cellBottom = sheet.getCell(currentRow - 1, col);

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

    // Aplicar color pastel (amarillo suave) a celdas A y B de cada plan
    for (let row = planStartRow; row < currentRow; row++) {
      const cellA = sheet.getCell(`A${row}`);
      const cellB = sheet.getCell(`B${row}`);

      // Columna A: amarillo suave
      applyStyle(cellA, {
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFCE5CD' }
        },
        font: { bold: true },
        alignment: { horizontal: 'center', vertical: 'middle' }
      });

      // Columna B: estilo tractor
      applyStyle(cellB, {
        ...tractorRowStyle,
        font: { bold: true },
        alignment: { horizontal: 'center', vertical: 'middle' }
      });
    }
  });

  // Aplicar estilo general solo a celdas sin fondo Y sin borde
  sheet.eachRow({ includeEmpty: false }, row => {
    row.eachCell(cell => {
      const hasFill = !!cell.fill;
      const hasBorder = !!cell.border;
      if (!hasFill && !hasBorder) {
        applyStyle(cell, generalCellStyle);
      }
    });
  });
}
