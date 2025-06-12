import { forwardRef, useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import PlanTitle from "../PlanTitle/PlanTitle.jsx";
import TratamientoSanitario from "../TratamientoSanitario/TratamientoSanitario.jsx";
import { Plus } from "lucide-react";

export const CardSanitizantePlan = forwardRef(function CardSanitizantePlan({ plan }, ref) {
  const {
    deletePlan,
    addTratamiento,
  } = useContext(AppContext).sanitizantes;

  const handleAddPlan = () => {
    addTratamiento(plan.id);
  }

  const handleDeletePlan = () => {
    deletePlan(plan.id);
  };

  const hayTratamientosConProductos = plan.tratamientos.some(
  tratamiento => tratamiento.productos && tratamiento.productos.length > 0
);

const mostrarTotal = plan.tratamientos.length > 0 && hayTratamientosConProductos;

  return (
    <div className="mx-auto px-2 w-full sm:max-w-md md:max-w-3xl lg:max-w-4xl" ref={ref}>
      <div className="bg-white rounded-xl shadow-lg pt-6 px-6 pb-3">
        <div className="flex justify-between items-center mb-4">
          <PlanTitle title={`Plan Fitosanitario ${plan.id}`} />
          <DeleteButton onDelete={handleDeletePlan} />
        </div>
        <div className="mb-3">
          <div className="grid grid-cols-1 gap-4">

            {plan.tratamientos.map(tratamiento => (
              <TratamientoSanitario key={tratamiento.id} planId={plan.id} tratamiento={tratamiento} />
            ))}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4 flex justify-between items-center ">
            <span className="font-bold text-lg font-semibold">
              Agregar Tratamiento 
            </span>
            <button
              className=" flex items-center justify-center px-2 py-2 border border-black text-black rounded-full hover:bg-black hover:text-white transition-colors duration-200 shadow-sm font-medium"
              onClick={handleAddPlan}> <Plus size={18} />
            </button>
          </div>
          </div>
        </div>
      </div>

      {mostrarTotal && (
        <div className="-mt-5 bg-green-50 text-green-800 p-4 rounded-bl-lg rounded-br-lg shadow-sm border border-green-200 shadow-inner flex flex-wrap gap-x-4 gap-y-2">
          <span>
            <span className="font-semibold">Total:</span>
            <span className="font-normal"> {plan.total} AR$/ha</span>
          </span>            
        </div>
      )}
    </div>
  );
});