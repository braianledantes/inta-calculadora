import { headerInfoStyle, tableHeaderStyle, generalCellStyle, applyStyle, tractorRowStyle, verdeSuave, amarilloSuave, borderStyle, celdaTotalStyle} from './excelStyles';

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function addSanitizanteSheet(workbook, planesSanitizantes, valorDolar) {
  if (!Array.isArray(planesSanitizantes) || planesSanitizantes.length === 0) return;

  const sheetSanitizante = workbook.addWorksheet('Sanitizantes');

  // Cotización dólar
  sheetSanitizante.getCell('B1').value = 'Cotización dólar';
  sheetSanitizante.getCell('C1').value = valorDolar;

  ['B1', 'C1'].forEach(ref => {
    const cell = sheetSanitizante.getCell(ref);
    applyStyle(cell, headerInfoStyle);
  });
  sheetSanitizante.getRow(1).height = 30;
  sheetSanitizante.getColumn('B').width = 20;
  sheetSanitizante.getColumn('C').width = 13;

  // Encabezado principal
  sheetSanitizante.addRow([
    'Plan Fitosabitario', 
    'Tratamiento',
    'Principio Activo',
    'Tipo',
    'Precio envase ($ USD)',
    'Dosis por ha', 
    'Unidad dosis', 
    'Volumen por ha', 
    'Unidad volumen',
    'Cant. por ha',
    'Costo por ha',
  ]);

  const headerRow = sheetSanitizante.getRow(2);
  headerRow.height = 30;

  for (let col = 4; col <= 13; col++) {
    sheetSanitizante.getColumn(col).width = 15;
  }

  headerRow.eachCell((cell, colNumber) => {
    cell.value = capitalize(cell.value?.toString());
    if (colNumber <= 10) {
      applyStyle(cell, amarilloSuave);
    } else {
      applyStyle(cell, verdeSuave);
    }
  });

  planesSanitizantes.forEach((plan, indexPlan) => {

    plan.tratamientos.forEach((tratamiento, indexTratamiento) => {
      tratamiento.productos.forEach((producto, indexProducto)=> {

        const row = sheetSanitizante.addRow([
          indexProducto === 0 && indexTratamiento === 0 ? plan.id : "",
          indexProducto === 0 ? tratamiento.id : "",
          producto.sanitizante.nombre,
          producto.sanitizante.tipo,
          producto.precio,
          producto.dosisPorHectarea,
          producto.sanitizante.unidadDosisAplicacion,
          producto.volumenPorHectarea,
          producto.sanitizante.unidadVolumenEnvase,
          null, 
          null, 
        ]);
         
        const r = row.number;

        // Fórmulas
        sheetSanitizante.getCell(`J${r}`).value = { formula: `F${r} * H${r}` };
        sheetSanitizante.getCell(`K${r}`).value = { formula: `J${r} * C1 * E${r}`};
      })
    });
  });
}