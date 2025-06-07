import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import InputNumber from "../InputNumber/InputNumber.jsx";
import PlanTitle from "../PlanTitle/PlanTitle.jsx";
import {forwardRef} from "react";
import {useState} from "react";
import {ContainerInputDolarRefresh} from "../ContainerInputDolarRefresh/ContainerInputDolarRefresh.jsx";
import NumberValueModify from "../NumberValueModify/NumberValueModify.jsx";
import {ContainerCostoTotal} from "../ContainerCostoTotal/ContainerCostoTotal.jsx";

export const CardFertilizacionPlan = forwardRef(function CardFertilizacionPlan({plan, fertilizantes, onUpdate, onDelete}, ref) {

  const [prevPrecioFertilizacion, setPrevPrecioFertilizacion] = useState(plan.fertilizante.precioEnvaseDolar);

  const handleDelete = () => {
    onDelete(plan.id);
  }

  const handleUpdateFertilizante = (e) => {
    const nombre = e.target.value;
    const fertilizante = fertilizantes.find(f => f.nombre === nombre);
    onUpdate(plan.id, fertilizante, plan.cantTratamientos);
  }

  const onChangePrecio = (e) => {
    const newPrecio = e.target.value;
    const updatedFertilizante = {...plan.fertilizante, precioEnvaseDolar: newPrecio};
    onUpdate(plan.id, updatedFertilizante, plan.cantTratamientos);
  }

  const handleUpdateCantTratamientos = (valor) => {
    onUpdate(plan.id, plan.fertilizante, parseFloat(valor));
  }

  const onRefreshDolarFertilizante = () => {
    const updatedFertilizante = {...plan.fertilizante, precioEnvaseDolar: prevPrecioFertilizacion};
    onUpdate(plan.id, updatedFertilizante, plan.cantTratamientos);
  }

  const onChangeDosisPorHa = (e) => {
    const newDosis = e.target.value;
    const updatedFertilizante = {...plan.fertilizante, dosisAplicacion: newDosis};
    onUpdate(plan.id, updatedFertilizante, plan.cantTratamientos);  
  }

  return (
   <div className="max-w-4xl mx-auto px-2" ref={ref}>
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <PlanTitle title={`Plan ${plan.id}`}/>
        <DeleteButton onDelete={handleDelete}/>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center gap-2">
          <span>Datos del Fertilizante</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

          <InputOptions
            label="Fertilizante"
            value={plan.fertilizante.nombre}
            options={fertilizantes.map(f => f.nombre)}
            onChange={handleUpdateFertilizante}
          />
          
          <ContainerInputDolarRefresh
            value={plan.fertilizante.precioEnvaseDolar}
            onChange={onChangePrecio}
            onRefresh={onRefreshDolarFertilizante}
          />

          <NumberValueModify name="Dosis por ha" value={plan.fertilizante.dosisAplicacion} unit={plan.fertilizante.unidadDosisAplicacion} onChange={onChangeDosisPorHa}/>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
          <span>Datos del Plan</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InputNumber name="Cant. tratamientos" value={plan.cantTratamientos} onChange={handleUpdateCantTratamientos}/>
        </div>
      </div>
      <div className="mt-4 bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 shadow-inner flex flex-wrap gap-x-4 gap-y-2">
        <span>
          <span className="font-semibold">Costo por tratamiento:</span>
          <span className="font-normal"> {plan.costoTotalPorTratamiento} ARS</span>
        </span>
        <span>
          <span className="font-semibold">Costo por ha:</span>
          <span className="font-normal"> {plan.costoTotalPorHectarea} ARS/ha</span>
        </span>
      </div>
      <div className="text-right text-2xl font-extrabold border-t pt-6 mt-6">
        <ContainerCostoTotal costoTotal={plan.costoTotalPorHectarea}/>
      </div>

    </div>
    </div>
  )
});