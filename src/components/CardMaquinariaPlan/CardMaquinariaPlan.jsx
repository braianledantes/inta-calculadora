import DeleteBotton from "../DeleteButton/DeleteButton.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import NumberValue from "../NumberValue/NumberValue.jsx";

export function CardMaquinariaPlan({plan, tractores, implementos, onUpdate, onDelete}) {

  const handleDelete = () => {
    onDelete(plan.id);
  }

  const handleUpdateTractor = (e) => {
    const tractorName = e.target.value;
    const tractor = tractores.find(t => t.nombre === tractorName);
    onUpdate(plan.id, tractor, plan.implemento);
  }

  const handleUpdateImplemento = (e) => {
    const implementoName = e.target.value;
    const implemento = implementos.find(i => i.nombre === implementoName);
    onUpdate(plan.id, plan.tractor, implemento);
  }

  return (
    <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg">Plan {plan.id}</h2>
        <DeleteBotton onDelete={handleDelete}/>
      </div>
      <div className="flex flex-row gap-4 flex-wrap mb-4">
        <InputOptions
          label="Tractor:"
          value={plan.tractor.nombre}
          options={tractores.map(t => t.nombre)}
          onChange={handleUpdateTractor}
        />

        <NumberValue name="Potencia" value={plan.tractor.potencia} unit="HP" />
        <NumberValue name="Precio" value={plan.tractor.precioDolar} unit="US$" />
        <NumberValue name="Gasto conservación coeficiente" value={plan.tractor.gastoMantenimiento} unit="AR$" formated={false} />
        <NumberValue name="Horas útiles" value={plan.tractor.horasVidaUtil} unit="h" />
        <NumberValue name="Valor residual" value={plan.tractor.porcentajeValorResidual} unit="%" />
        <NumberValue name="Amortización" esComputado value={plan.amortizacionTractor} unit="AR$/h" />
        <NumberValue name="Gasto conservación" esComputado value={plan.gastoConservacionTractor} unit="AR$/h" />
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <InputOptions
          label="Implemento:"
          value={plan.implemento.nombre}
          options={implementos.map(t => t.nombre)}
          onChange={handleUpdateImplemento}
        />

        <NumberValue name="Precio" value={plan.implemento.precioDolar} unit="US$" />
        <NumberValue name="Gasto conservación coeficiente" value={plan.implemento.gastoMantenimiento} unit="AR$" formated={false} />
        <NumberValue name="Horas útiles" value={plan.implemento.horasVidaUtil} unit="h" />
        <NumberValue name="Valor residual" value={plan.implemento.porcentajeValorResidual} unit="%" />
        <NumberValue name="Consumo combustible" value={plan.implemento.consumoCombustible} unit="lt/h" />
        <NumberValue name="Amortización" esComputado value={plan.amortizacionImplemento} unit="AR$" />
        <NumberValue name="Costo combustible" esComputado value={plan.costoCombustibleImplemento} unit="AR$/h" />
        <NumberValue name="Gasto conservación" esComputado value={plan.gastoConservacionImplemento} unit="AR$/h" />
      </div>
      <NumberValue name="Costo Total" esComputado value={plan.costoEconomico} unit="AR$/h" />
    </div>
  )
}