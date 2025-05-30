import test from 'node:test';
import { describe, it } from 'node:test';
import {
  calcularValoresPlanFertilizante,
  calcularValoresPlanMaquinaria,
  calcularValoresPlanSanitario
} from "./calculos.js";
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

  const result = calcularValoresPlanMaquinaria(tractor, implemento, valorDolar, valorGasoilina);

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

describe('calcularValoresPlanFertilizante', () => {
  it('primer fertilizante ', () => {
    const fertilizante = {
      numero: 1,
      nombre: "Sulfonitrato",
      precioEnvaseDolar: 1.2,
      volumenEnvase: 1,
      unidadVolumenEnvase: "kg",
      dosisAplicacion: 60,
      unidadDosisAplicacion: "kg"
    };
    const cantTratamientos = 1;
    const result = calcularValoresPlanFertilizante(fertilizante, cantTratamientos, valorDolar);

    // verifica los calculos del fertilizante
    assert.equal(result.costoTotalPorTratamiento, 75600, "Costo total por tratamiento incorrecto");
    assert.equal(result.costoTotalPorHectarea, 75600, "Costo total por hectárea incorrecto");
  });

  it('segundo fertilizante ', () => {
    const fertilizante = {
      numero: 1,
      nombre: "Triple 15",
      precioEnvaseDolar: 0.86,
      volumenEnvase: 1,
      unidadVolumenEnvase: "kg",
      dosisAplicacion: 150,
      unidadDosisAplicacion: "kg"
    };
    const cantTratamientos = 2;
    const result = calcularValoresPlanFertilizante(fertilizante, cantTratamientos, valorDolar);

    // verifica los calculos del fertilizante
    assert.equal(result.costoTotalPorTratamiento, 135450, "Costo total por tratamiento incorrecto");
    assert.equal(result.costoTotalPorHectarea, 270900, "Costo total por hectárea incorrecto");
  });
});

describe('calcularValoresPlanSanitario', () => {
  it('primer sanitizante', () => {
    const sanitizante = {
      numero: 1,
      nombre: "Aceite de Verano",
      precioEnvaseDolar: 2,
      volumenEnvase: 1,
      unidadVolumenEnvase: "L",
      dosisAplicacion: 0.25,
      unidadDosisAplicacion: "L"
    };
    const volumenPorHectarea = 20;
    const cantTratamientos = 1;
    const result = calcularValoresPlanSanitario(sanitizante, volumenPorHectarea, cantTratamientos, valorDolar);

    // verifica los calculos del sanitizante
    assert.equal(result.cantidadPorHectarea, 5, "Cantidad por hectárea incorrecta");
    assert.equal(result.costoTotalPorTratamiento, 10500, "Costo total por tratamiento incorrecto");
    assert.equal(result.costoTotalPorHectarea, 10500, "Costo total por hectárea incorrecto");
  });
  it('segundo sanitizante', () => {
    const sanitizante = {
      numero: 2,
      nombre: "Abamectina",
      precioEnvaseDolar: 168,
      volumenEnvase: 1,
      unidadVolumenEnvase: "L",
      dosisAplicacion: 0.05,
      unidadDosisAplicacion: "L"
    };
    const volumenPorHectarea = 20;
    const cantTratamientos = 2;
    const result = calcularValoresPlanSanitario(sanitizante, volumenPorHectarea, cantTratamientos, valorDolar);

    // verifica los calculos del sanitizante
    assert.equal(result.cantidadPorHectarea, 1, "Cantidad por hectárea incorrecta");
    assert.equal(result.costoTotalPorTratamiento, 176400, "Costo total por tratamiento incorrecto");
    assert.equal(result.costoTotalPorHectarea, 352800, "Costo total por hectárea incorrecto");
  });

});