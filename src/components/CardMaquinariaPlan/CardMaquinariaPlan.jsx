import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import NumberValue from "../NumberValue/NumberValue.jsx";
import PlanTitle from "../PlanTitle/PlanTitle.jsx";

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
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <PlanTitle title={`Plan ${plan.id}`}/>
        <DeleteButton onDelete={handleDelete}/>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">🚜 Datos del Tractor</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InputOptions label="Tractor" value={plan.tractor.nombre} options={tractores.map(t => t.nombre)}
                        onChange={handleUpdateTractor}/>
          <NumberValue name="Potencia" value={plan.tractor.potencia} unit="HP"/>
          <NumberValue name="Precio" value={plan.tractor.precioDolar} unit="US$"/>
          <NumberValue name="Coeficiente conservación" value={plan.tractor.gastoMantenimiento}/>
          <NumberValue name="Horas útiles" value={plan.tractor.horasVidaUtil} unit="h"/>
          <NumberValue name="Valor residual" value={plan.tractor.porcentajeValorResidual} unit="%"/>
        </div>
        <div className="mt-3 bg-green-100 text-green-700 font-semibold p-3 rounded-md">
          💰 Amortización: {plan.amortizacionTractor} ARS/h | Conservación: {plan.gastoConservacionTractor} ARS/h
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">🧩 Implemento</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InputOptions label="Implemento" value={plan.implemento.nombre} options={implementos.map(i => i.nombre)}
                        onChange={handleUpdateImplemento}/>
          <NumberValue name="Consumo" value={plan.implemento.consumoCombustible} unit="lt/h"/>
          <NumberValue name="Precio" value={plan.implemento.precioDolar} unit="US$"/>
          <NumberValue name="Coeficiente conservación" value={plan.implemento.gastoMantenimiento}/>
          <NumberValue name="Horas útiles" value={plan.implemento.horasVidaUtil} unit="h"/>
          <NumberValue name="Valor residual" value={plan.implemento.porcentajeValorResidual} unit="%"/>
        </div>
        <div className="mt-3 bg-green-100 text-green-700 font-semibold p-3 rounded-md">
          🛢️ Combustible: {plan.costoCombustibleImplemento} ARS/h | Amortización: {plan.amortizacionImplemento} ARS/h |
          Conservación: {plan.gastoConservacionImplemento} ARS/h
        </div>
      </div>

      <div className="text-right text-xl font-bold text-green-600">
        Costo Total: {plan.costoEconomico.toLocaleString()} ARS/h
      </div>
    </div>
  )
}