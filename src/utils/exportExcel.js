import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function exportFormToExcel(
  planesMaquinaria,
  planesFertilizantes,
  planesSanitizantes,
  planesEstadosFenologicos,
  valorDolar,
  valorGasoilina,
  fileName = 'datos'
) {
  const dataMaquinaria = Array.isArray(planesMaquinaria) ? planesMaquinaria : [planesMaquinaria];
  const dataFertilizantes = Array.isArray(planesFertilizantes) ? planesFertilizantes : [planesFertilizantes];
  const dataSanitizantes = Array.isArray(planesSanitizantes) ? planesSanitizantes : [planesSanitizantes];

  const workbook = XLSX.utils.book_new();

  // Filas de Maquinaria > index + 1 = Tractor > index + 2 = Implemento
  const maquinariaRows = [];
  dataMaquinaria.forEach((plan, index) => {
    maquinariaRows.push({
      'Plan': `Plan ${index + 1}`,
      'Implemento': 'Tractor',
      'Potencia': plan.tractor?.potencia || '',
      'Precio dólar': plan.tractor?.precioDolar || '',
      'Gasto conservación Coeficiente': plan.tractor?.gastoMantenimiento || '',
      'horas utiles': plan.tractor?.horasVidaUtil || '',
      'Valor residual %precio': plan.tractor?.porcentajeValorResidual || '',
      'Consumo combustible lt/hora CV': '',
      'Amortización $/hora': '', 
      'Costo Combustible $/hora': '',
      'Gasto conservación $/hora': '',
      'Costo Económico $/hora': ''
    });

    maquinariaRows.push({
      'Plan': '',
      'Implemento': plan.implemento?.nombre || '',
      'Potencia': '',
      'Precio dólar': plan.implemento?.precioDolar || '',
      'Gasto conservación Coeficiente': plan.implemento?.gastoMantenimiento || '',
      'horas utiles': plan.implemento?.horasVidaUtil || '',
      'Valor residual %precio': plan.implemento?.porcentajeValorResidual || '',
      'Consumo combustible lt/hora CV': plan.implemento?.consumoCombustible || '',
      'Amortización $/hora': '', 
      'Costo Combustible $/hora': '', 
      'Gasto conservación $/hora': '',
      'Costo Económico $/hora': ''  
    });
  });

  //Hoja Maquinaria
  const wsMaquinaria = XLSX.utils.json_to_sheet(maquinariaRows, { origin: 1 });

  // Cabeceras Gasoil y Dolar
  wsMaquinaria[`A1`] = { v: 'Gasoil $/litro' };
  wsMaquinaria[`B1`] = { v: valorGasoilina };
  wsMaquinaria[`C1`] = { v: 'cotización dólar' };
  wsMaquinaria[`D1`] = { v: valorDolar };

  const range = XLSX.utils.decode_range(wsMaquinaria['!ref']);
  range.s.r = 0;
  wsMaquinaria['!ref'] = XLSX.utils.encode_range(range);

  // Formulas de Maquinaria
  dataMaquinaria.forEach((plan, index) => {
    const excelRowIndex = index * 2 + 3; // empieza en fila 2, salta de 2 en 2 por cada plan
    const rowIndex = excelRowIndex - 1;

    const cellPotencia = `C${excelRowIndex}`;
    const cellPrecioDolar = `D${excelRowIndex}`;
    const cellCoeficiente = `E${excelRowIndex}`;
    const cellHorasUtiles = `F${excelRowIndex}`;
    const cellValorResidual = `G${excelRowIndex}`;
    const cellAmortizacion = XLSX.utils.encode_cell({ c: 8, r: rowIndex }); // Fila I
    const cellGastoConservacion = XLSX.utils.encode_cell({ c: 10, r: rowIndex }); // Fila K 
    
    wsMaquinaria[cellAmortizacion] = { f: `+((${cellPrecioDolar} - (${cellPrecioDolar} * (${cellValorResidual}/100))) / ${cellHorasUtiles}) * D1`};
    wsMaquinaria[cellGastoConservacion] = { f: `+${cellPrecioDolar} * D1 * ${cellCoeficiente} `};

    const cellPrecioDolarImpl = `D${excelRowIndex + 1}`;
    const cellCoeficienteImpl = `E${excelRowIndex + 1}`;
    const cellHorasUtilesImpl = `F${excelRowIndex + 1}`;
    const cellValorResidualImpl = `G${excelRowIndex + 1}`;
    const cellConsumoCombustibleImpl = `H${excelRowIndex + 1}`;
    const cellAmortizacionImplemento = XLSX.utils.encode_cell({ c: 8, r: rowIndex + 1 }); // Fila I
    const cellCostoCombustibleImplemento = XLSX.utils.encode_cell({ c: 9, r: rowIndex + 1 }); // Fila J
    const cellGastoConservacionImplemento = XLSX.utils.encode_cell({ c: 10, r: rowIndex + 1 }); // Fila K
    const cellCostoEconomico = XLSX.utils.encode_cell({ c: 11, r: rowIndex + 1 }); // Fila L

    wsMaquinaria[cellAmortizacionImplemento] = { f: `+((${cellPrecioDolarImpl} - (${cellPrecioDolarImpl} * (${cellValorResidualImpl}/100))) / ${cellHorasUtilesImpl}) * D1` };
    wsMaquinaria[cellCostoCombustibleImplemento] = { f: `+B1 * ${cellConsumoCombustibleImpl} * ${cellPotencia}`};
    wsMaquinaria[cellGastoConservacionImplemento] = { f: `+${cellPrecioDolarImpl} * D1 * ${cellCoeficienteImpl} `};
    wsMaquinaria[cellCostoEconomico] = { f: `+${cellAmortizacion} + ${cellAmortizacionImplemento} + ${cellCostoCombustibleImplemento} + ${cellGastoConservacion} + ${cellGastoConservacionImplemento}` };

  });

  // Agrega hoja de maquinaria al libro
  XLSX.utils.book_append_sheet(workbook, wsMaquinaria, 'Maquinaria');

  // Hoja 2: Fertilizantes
  if (dataFertilizantes.length > 0) {
    const wsFertilizantes = XLSX.utils.json_to_sheet(dataFertilizantes);
    XLSX.utils.book_append_sheet(workbook, wsFertilizantes, 'Fertilizantes');
  }

  // Hoja 3: Sanitizantes
  if (dataSanitizantes.length > 0) {
    const wsSanitizantes = XLSX.utils.json_to_sheet(dataSanitizantes);
    XLSX.utils.book_append_sheet(workbook, wsSanitizantes, 'Sanitizantes');
  }

  // Exportar archivo
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${fileName}.xlsx`);
}

// dataMaquinaria ejemplo:
// {
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