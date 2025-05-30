export function calcularValoresPlan(tractor, implemento, valorDolar, valorGasoilina) {
  const amortizacionTractor = Math.round(((tractor.precioDolar - (tractor.precioDolar * (tractor.porcentajeValorResidual / 100))) / tractor.horasVidaUtil) * valorDolar);
  const gastoConservacionTractor = Math.round(tractor.precioDolar * valorDolar * tractor.gastoMantenimiento);
  const amortizacionImplemento = Math.round(((implemento.precioDolar - (implemento.precioDolar * (implemento.porcentajeValorResidual / 100))) / implemento.horasVidaUtil) * valorDolar);
  const costoCombustibleImplemento = Math.round(tractor.potencia * implemento.consumoCombustible * valorGasoilina);
  const gastoConservacionImplemento = Math.round(implemento.precioDolar * valorDolar * implemento.gastoMantenimiento);

  return  {
    amortizacionTractor,
    gastoConservacionTractor,
    amortizacionImplemento,
    costoCombustibleImplemento,
    gastoConservacionImplemento,
    costoEconomico: amortizacionTractor + gastoConservacionTractor + amortizacionImplemento + costoCombustibleImplemento + gastoConservacionImplemento,
  };
}