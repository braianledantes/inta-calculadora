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

  // Maquinaria
  if (dataMaquinaria.length > 0) {
    const maquinariaRows = [];
    dataMaquinaria.forEach((plan, index) => {
      maquinariaRows.push({
        'Plan': `${index + 1}`,
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

    const wsMaquinaria = XLSX.utils.json_to_sheet(maquinariaRows, { origin: 1 });

    wsMaquinaria[`B1`] = { v: 'Gasoil $/litro' };
    wsMaquinaria[`C1`] = { v: valorGasoilina };
    wsMaquinaria[`D1`] = { v: 'cotización dólar' };
    wsMaquinaria[`E1`] = { v: valorDolar };

    const range = XLSX.utils.decode_range(wsMaquinaria['!ref']);
    range.s.r = 0;
    wsMaquinaria['!ref'] = XLSX.utils.encode_range(range);

    dataMaquinaria.forEach((plan, index) => {
      const excelRowIndex = index * 2 + 3;
      const rowIndex = excelRowIndex - 1;

      const cellPotencia = `C${excelRowIndex}`;
      const cellPrecioDolar = `D${excelRowIndex}`;
      const cellCoeficiente = `E${excelRowIndex}`;
      const cellHorasUtiles = `F${excelRowIndex}`;
      const cellValorResidual = `G${excelRowIndex}`;
      const cellAmortizacion = XLSX.utils.encode_cell({ c: 8, r: rowIndex });
      const cellGastoConservacion = XLSX.utils.encode_cell({ c: 10, r: rowIndex });

      wsMaquinaria[cellAmortizacion] = { f: `+((${cellPrecioDolar} - (${cellPrecioDolar} * (${cellValorResidual}/100))) / ${cellHorasUtiles}) * E1`};
      wsMaquinaria[cellGastoConservacion] = { f: `+${cellPrecioDolar} * E1 * ${cellCoeficiente} `};

      const cellPrecioDolarImpl = `D${excelRowIndex + 1}`;
      const cellCoeficienteImpl = `E${excelRowIndex + 1}`;
      const cellHorasUtilesImpl = `F${excelRowIndex + 1}`;
      const cellValorResidualImpl = `G${excelRowIndex + 1}`;
      const cellConsumoCombustibleImpl = `H${excelRowIndex + 1}`;
      const cellAmortizacionImplemento = XLSX.utils.encode_cell({ c: 8, r: rowIndex + 1 });
      const cellCostoCombustibleImplemento = XLSX.utils.encode_cell({ c: 9, r: rowIndex + 1 });
      const cellGastoConservacionImplemento = XLSX.utils.encode_cell({ c: 10, r: rowIndex + 1 });
      const cellCostoEconomico = XLSX.utils.encode_cell({ c: 11, r: rowIndex + 1 });

      wsMaquinaria[cellAmortizacionImplemento] = { f: `+((${cellPrecioDolarImpl} - (${cellPrecioDolarImpl} * (${cellValorResidualImpl}/100))) / ${cellHorasUtilesImpl}) * E1` };
      wsMaquinaria[cellCostoCombustibleImplemento] = { f: `+C1 * ${cellConsumoCombustibleImpl} * ${cellPotencia}`};
      wsMaquinaria[cellGastoConservacionImplemento] = { f: `+${cellPrecioDolarImpl} * E1 * ${cellCoeficienteImpl} `};
      wsMaquinaria[cellCostoEconomico] = { f: `+${cellAmortizacion} + ${cellAmortizacionImplemento} + ${cellCostoCombustibleImplemento} + ${cellGastoConservacion} + ${cellGastoConservacionImplemento}` };
    });

    XLSX.utils.book_append_sheet(workbook, wsMaquinaria, 'Maquinaria');
  }

  // Fertilizantes
  if (dataFertilizantes.length > 0) {
    const fertilizanteRows = [];
    dataFertilizantes.forEach((plan, index) => {
      fertilizanteRows.push({
        'Plan': `${index + 1}`,
        'Principio Activo': plan.fertilizante?.nombre || '',
        'Precio envase ($ USD)': plan.fertilizante?.precioEnvaseDolar || '',
        'Dosis aplicación': plan.fertilizante?.dosisAplicacion || '',
        'Unidad dosis': plan.fertilizante?.unidadDosisAplicacion || '',
        'Volumen envase': plan.fertilizante?.volumenEnvase || '',
        'Unidad volumen': plan.fertilizante?.unidadVolumenEnvase || '',
        'Cantidad de tratamientos': plan.cantTratamientos || '',
        'Costo total por tratamiento ($)': '',
        'Costo total por hectárea ($)': '',
      });
    });

    const wsFertilizantes = XLSX.utils.json_to_sheet(fertilizanteRows, { origin: 1 });

    wsFertilizantes[`B1`] = { v: 'Cotización dólar' };
    wsFertilizantes[`C1`] = { v: valorDolar };

    const rangeFert = XLSX.utils.decode_range(wsFertilizantes['!ref']);
    rangeFert.s.r = 0;
    wsFertilizantes['!ref'] = XLSX.utils.encode_range(rangeFert);

    dataFertilizantes.forEach((plan, index) => {
      const excelRowIndex = index + 3;
      const rowIndex = excelRowIndex - 1;

      const cellPrecioDolarFertilizante = `C${excelRowIndex}`;
      const cellDosisHa = `D${excelRowIndex}`;
      const cellTratamientos = `H${excelRowIndex}`;
      const cellCostoTotalTratamiento  = XLSX.utils.encode_cell({ c: 8, r: rowIndex });
      const cellCostoTotalHa = XLSX.utils.encode_cell({ c: 9, r: rowIndex });

      wsFertilizantes[cellCostoTotalTratamiento] = { f: `+${cellPrecioDolarFertilizante} * C1 * ${cellDosisHa} `};
      wsFertilizantes[cellCostoTotalHa] = { f: `+${cellTratamientos} * ${cellCostoTotalTratamiento} `};
    });

    XLSX.utils.book_append_sheet(workbook, wsFertilizantes, 'Fertilizantes');
  }

  // Sanitizantes
  if (dataSanitizantes.length > 0) {
    const sanitizanteRows = [];
    dataSanitizantes.forEach((plan, index) => {
      sanitizanteRows.push({
        'Insumos': `${index + 1}`,
        'Principio Activo': plan.sanitizante?.nombre || '',
        'Tipo': plan.sanitizante?.tipo || '',
        'Precio envase ($ USD)': plan.sanitizante?.precioEnvaseDolar || '',
        'Dosis aplicación': plan.sanitizante?.dosisAplicacion || '',
        'Unidad dosis': plan.sanitizante?.unidadDosisAplicacion || '',
        'Volumen envase': plan.sanitizante?.volumenEnvase || '',
        'Unidad volumen': plan.sanitizante?.unidadVolumenEnvase || '',
        'Volumen por Hectárea': plan.volumenPorHectarea || '',
        'Cantidad de tratamientos': plan.cantTratamientos || '',
        'Cantidad': '',
        'Costo total por tratamiento ($)': '',
        'Costo total por hectárea ($)': '',
      });
    });

    const wsSanitizantes = XLSX.utils.json_to_sheet(sanitizanteRows, { origin: 1 });

    wsSanitizantes[`B1`] = { v: 'Cotización dólar' };
    wsSanitizantes[`C1`] = { v: valorDolar };

    const rangeSani = XLSX.utils.decode_range(wsSanitizantes['!ref']);
    rangeSani.s.r = 0;
    wsSanitizantes['!ref'] = XLSX.utils.encode_range(rangeSani);

    dataSanitizantes.forEach((plan, index) => {
      const excelRowIndex = index + 3;
      const rowIndex = excelRowIndex - 1;

      const cellPrecioEnvase = `D${excelRowIndex}`;
      const cellDosisAplicacion = `E${excelRowIndex}`;
      const cellVolumenEnvase = `G${excelRowIndex}`;
      const cellVolumenHa = `I${excelRowIndex}`;
      const cellTratamientos = `J${excelRowIndex}`;
      const cellCantidad = XLSX.utils.encode_cell({ c: 10, r: rowIndex });
      const cellCostoTratamiento = XLSX.utils.encode_cell({ c: 11, r: rowIndex });
      const cellCostoHa = XLSX.utils.encode_cell({ c: 12, r: rowIndex });

      wsSanitizantes[cellCantidad] = { f: `+${cellDosisAplicacion} * ${cellVolumenHa}` };
      wsSanitizantes[cellCostoTratamiento] = { f: `+(${cellPrecioEnvase} * C1) * (${cellDosisAplicacion} / ${cellVolumenEnvase})` };
      wsSanitizantes[cellCostoHa] = { f: `+${cellCostoTratamiento} * ${cellVolumenHa} * ${cellTratamientos}` };
    });

    XLSX.utils.book_append_sheet(workbook, wsSanitizantes, 'Sanitizantes');
  }

  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${fileName}.xlsx`);
}