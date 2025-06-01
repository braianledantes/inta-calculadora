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
        <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center gap-2">
          <span className="text-xl">🌱</span>
          <span>Datos del Fertilizante</span>
        </h3>
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
        <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
          <span className="text-xl">🖋️</span>
          <span>Datos del Plan</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InputNumber name="Cant. tratamientos" value={plan.cantTratamientos} onChange={handleUpdateCantTratamientos}/>
        </div>
      </div>
      <div className="mt-4 bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 shadow-inner flex flex-wrap gap-x-4 gap-y-2">
        <span>
          <span className="font-semibold">🛢️ Costo por tratamiento:</span>
          <span className="font-normal"> {plan.costoTotalPorTratamiento} ARS</span>
        </span>
        <span>
          <span className="font-semibold">Costo por ha:</span>
          <span className="font-normal"> {plan.costoTotalPorHectarea} ARS/ha</span>
        </span>
      </div>
      <div className="text-right text-2xl font-extrabold border-t pt-6 mt-6">
        Costo Total: <span className="ml-2">{plan.costoTotalPorHectarea.toLocaleString()} ARS/ha</span>
      </div>
    </div>
  )
}