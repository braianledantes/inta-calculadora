import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import NumberValue from "../NumberValue/NumberValue.jsx";
import InputNumber from "../InputNumber/InputNumber.jsx";
import PlanTitle from "../PlanTitle/PlanTitle.jsx";

export function CardFertilizacionPlan({plan, fertilizantes, onUpdate, onDelete}) {

  const handleDelete = () => {
    onDelete(plan.id);
  }

  const handleUpdateFertilizante = (e) => {
    const fertilizanteName = e.target.value;
    const fertilizante = fertilizantes.find(f => f.nombre === fertilizanteName);
    onUpdate(plan.id, fertilizante, plan.cantTratamientos);
  }

  const handleUpdateCantTratamientos = (valor) => {
    const cantTratamientos = parseFloat(valor);
    onUpdate(plan.id, plan.fertilizante, cantTratamientos);
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <PlanTitle title={`Plan ${plan.id}`}/>
        <DeleteButton onDelete={handleDelete}/>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">🌱 Datos del Fertilizante</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InputOptions
            label="Fertilizante"
            value={plan.fertilizante.nombre}
            options={fertilizantes.map(f => f.nombre)}
            onChange={handleUpdateFertilizante}
          />
          <NumberValue name="Precio" value={plan.fertilizante.precioEnvaseDolar} unit="US$"/>
          <NumberValue name="Dosis por ha" value={plan.fertilizante.dosisAplicacion}
                       unit={plan.fertilizante.unidadDosisAplicacion}/>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">🖋️ Datos del Plan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InputNumber name="Cant. tratamientos" value={plan.cantTratamientos} onChange={handleUpdateCantTratamientos}/>
        </div>
      </div>
      <div className="mt-3 bg-green-100 text-green-700 font-semibold p-3 rounded-md">
        🛢️ Costo por tratamiento: {plan.costoTotalPorTratamiento} ARS | Costo : {plan.costoTotalPorHectarea} ARS/ha
      </div>
      <div className="text-right text-xl font-bold text-green-600">
        Costo Total: {plan.costoTotalPorHectarea.toLocaleString()} ARS/ha
      </div>
    </div>
  )
}