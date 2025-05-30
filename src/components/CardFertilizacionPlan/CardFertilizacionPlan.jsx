import DeleteBotton from "../DeleteButton/DeleteButton.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import NumberValue from "../NumberValue/NumberValue.jsx";
import InputNumber from "../InputNumber/InputNumber.jsx";

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
    <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg">Plan {plan.id}</h2>
        <DeleteBotton onDelete={handleDelete}/>
      </div>
      <div className="flex flex-row gap-4 flex-wrap mb-4">
        <InputOptions
          label="Principio Activo:"
          value={plan.fertilizante.nombre}
          options={fertilizantes.map(t => t.nombre)}
          onChange={handleUpdateFertilizante}
        />

        <NumberValue name="Precio" value={plan.fertilizante.precioEnvaseDolar} unit="US$"/>
        <NumberValue name="Dosis por ha" value={plan.fertilizante.dosisAplicacion} unit={plan.fertilizante.unidadDosisAplicacion}/>
        <NumberValue name="Costo por tratamiento" esComputado value={plan.costoTotalPorTratamiento} unit="AR$"/>
        <InputNumber name="Cant. tratamientos" value={plan.cantTratamientos} onChange={handleUpdateCantTratamientos} />
        <NumberValue name="Costo Total" esComputado value={plan.costoTotalPorHectarea} unit="AR$/ha"/>
      </div>

    </div>
  )
}