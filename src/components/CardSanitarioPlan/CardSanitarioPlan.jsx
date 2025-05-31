import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import NumberValue from "../NumberValue/NumberValue.jsx";
import InputNumber from "../InputNumber/InputNumber.jsx";
import PlanTitle from "../PlanTitle/PlanTitle.jsx";

export function CardSanitarioPlan({plan, sanitizantes, onUpdate, onDelete}) {

  const handleDelete = () => {
    onDelete(plan.id);
  }

  const handleUpdateSanitizante = (e) => {
    const sanitizanteName = e.target.value;
    const sanitizante = sanitizantes.find(f => f.nombre === sanitizanteName);
    onUpdate(plan.id, sanitizante, plan.volumenPorHectarea, plan.cantTratamientos);
  }

  const handleUpdateVolumenPorHectarea = (valor) => {
    const volumenPorHectarea = parseFloat(valor);
    onUpdate(plan.id, plan.sanitizante, volumenPorHectarea, plan.cantTratamientos);
  }

  const handleUpdateCantTratamientos = (valor) => {
    const cantTratamientos = parseFloat(valor);
    onUpdate(plan.id, plan.sanitizante, plan.volumenPorHectarea, cantTratamientos);
  }

  return (
    <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <PlanTitle title={`Plan ${plan.id}`}/>
        <DeleteButton onDelete={handleDelete}/>
      </div>
      <div className="flex flex-row gap-4 flex-wrap mb-4">
        <InputOptions
          label="Principio activo:"
          value={plan.sanitizante.nombre}
          options={sanitizantes.map(t => t.nombre)}
          onChange={handleUpdateSanitizante}
        />

        <NumberValue name="Precio US$" value={plan.sanitizante.precioEnvaseDolar}/>
        <NumberValue name="Dosis por hl" value={plan.sanitizante.dosisAplicacion}
                     unit={plan.sanitizante.unidadDosisAplicacion}/>
        <InputNumber name="Volumen por hl/ha" value={plan.volumenPorHectarea}
                     onChange={handleUpdateVolumenPorHectarea}/>
        <NumberValue name="Cantidad por tratamiento" value={plan.cantidadPorHectarea} esComputado/>
        <NumberValue name="Costo por tratamiento" value={plan.costoTotalPorTratamiento} unit="AR$" esComputado/>
        <InputNumber name="Cant. tratamientos" value={plan.cantTratamientos} onChange={handleUpdateCantTratamientos}/>
      </div>
      <div className="flex flex-wrap justify-end items-center gap-3 mb-4 border-t  pt-3">
        <NumberValue name="Costo Total" esComputado value={plan.costoTotalPorHectarea} unit="AR$/ha"/>
      </div>

    </div>
  )
}