import { forwardRef, useContext, useEffect, useRef, useState } from "react";
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

  const [tratamientoActivoIndex, setTratamientoActivoIndex] = useState(0);
  const haAgregadoTratamientoInicial = useRef(false); // 👈 Flag para evitar múltiples llamadas

  useEffect(() => {
    if (plan.tratamientos.length === 0 && !haAgregadoTratamientoInicial.current) {
      addTratamiento(plan.id);
      haAgregadoTratamientoInicial.current = true;
    }
  }, [plan.id, plan.tratamientos.length, addTratamiento]);

  const handleAddPlan = () => {
    addTratamiento(plan.id);
    setTratamientoActivoIndex(plan.tratamientos.length); // mostrar el nuevo tratamiento
  };

  const handleDeletePlan = () => {
    deletePlan(plan.id);
  };

  const hayTratamientosConProductos = plan.tratamientos.some(
    tratamiento => tratamiento.productos && tratamiento.productos.length > 0
  );

  const mostrarTotal = plan.tratamientos.length > 0 && hayTratamientosConProductos;

  return (
    <div className="mx-auto px-2 w-full sm:max-w-md md:max-w-3xl lg:max-w-4xl mb-10" ref={ref}>
      <div className="bg-white rounded-xl shadow-lg pt-6 px-6 pb-3">
        <div className="flex justify-between items-center mb-4">
          <PlanTitle title={`Plan Fitosanitario ${plan.id}`} />
          <DeleteButton onDelete={handleDeletePlan} showText text="Eliminar Plan" />
        </div>

        {/* Navegación tipo paginación */}
        <div className="flex gap-2 mb-6 justify-start items-center flex-wrap">
          {plan.tratamientos.map((tratamiento, index) => (
            <button
              key={tratamiento.id}
              className={`w-8 h-8 rounded-full border font-semibold text-sm 
                flex items-center justify-center
                ${index === tratamientoActivoIndex
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
              onClick={() => setTratamientoActivoIndex(index)}
              title={`Tratamiento ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}

          {/* Botón para agregar tratamiento */}
          <button
            className="w-8 h-8 rounded-full border border-black text-black hover:bg-black hover:text-white flex items-center justify-center transition-colors duration-200 shadow-sm"
            onClick={handleAddPlan}
            title="Agregar Tratamiento"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Mostrar tratamiento activo */}
        {plan.tratamientos[tratamientoActivoIndex] && (
          <TratamientoSanitario
            key={plan.tratamientos[tratamientoActivoIndex].id}
            planId={plan.id}
            tratamiento={plan.tratamientos[tratamientoActivoIndex]}
          />
        )}
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



