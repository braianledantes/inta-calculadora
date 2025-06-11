import {forwardRef, useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import PlanTitle from "../PlanTitle/PlanTitle.jsx";
import TratamientoSanitario from "../TratamientoSanitario/TratamientoSanitario.jsx";


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

  return (
    <div className="max-w-4xl mx-auto px-2" ref={ref}>
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <PlanTitle title={`Plan ${plan.id}`} />
          <DeleteButton onDelete={handleDeletePlan} />
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center gap-2">
            <span>Tratamientos</span>
          </h3>
          <div className="grid grid-cols-1 gap-4">

            {plan.tratamientos.map(tratamiento => (
              <TratamientoSanitario key={tratamiento.id} planId={plan.id} tratamiento={tratamiento} />
            ))}
            <div className="mt-4 bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 shadow-inner flex flex-wrap gap-x-4 gap-y-2">
              <span>
                <span className="font-semibold">Total:</span>
                <span className="font-normal"> {plan.total} AR$/ha</span>
              </span>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handleAddPlan}
            >
              Agregar Tratamiento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});