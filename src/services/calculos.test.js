import test from 'node:test';
import {calcularValoresPlan} from "./calculos.js";
import * as assert from "node:assert";

const valorDolar = 1050;
const valorGasoilina = 1050;


test('calcularValoresPlan', () => {
  const tractor = {
    id: 1,
    nombre: "Tractor (60 CV)",
    precioDolar: 54286,
    gastoMantenimiento: 0.00007,
    horasVidaUtil: 12000,
    porcentajeValorResidual: 20,
    potencia: 60
  };
  const implemento = {
    id: 1,
    nombre: "Arado",
    precioDolar: 5714,
    gastoMantenimiento: 0.0004,
    horasVidaUtil: 5000,
    porcentajeValorResidual: 10,
    consumoCombustible: 0.14
  };

  const result = calcularValoresPlan(tractor, implemento, valorDolar, valorGasoilina);

  // verifica los calculos del tractor
  assert.equal(result.amortizacionTractor, 3800, "Amortización del tractor incorrecta");
  assert.equal(result.gastoConservacionTractor, 3990, "Gasto de conservación del tractor incorrecto");

  // verifica los calculos del implemento
  assert.equal(result.amortizacionImplemento, 1080, "Amortización del implemento incorrecta");
  assert.equal(result.costoCombustibleImplemento, 8820, "Costo de combustible del implemento incorrecto");
  assert.equal(result.gastoConservacionImplemento, 2400, "Gasto de conservación del implemento incorrecto");
  // verifica el costo economico total
  assert.equal(result.costoEconomico, 20090, "Costo económico total incorrecto");

});