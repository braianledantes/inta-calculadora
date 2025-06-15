import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import PlanTitle from "../PlanTitle/PlanTitle.jsx";
import TratamientoSanitario from "../TratamientoSanitario/TratamientoSanitario.jsx";
import Paginacion from "../Paginacion/Paginacion.jsx";

export const CardSanitizantePlan = forwardRef(function CardSanitizantePlan({ plan }, ref) {
  const {
    deletePlan,
    addTratamiento,
    deleteTratamiento,
  } = useContext(AppContext).sanitizantes;

  const [tratamientoActivoIndex, setTratamientoActivoIndex] = useState(0);
  const haAgregadoTratamientoInicial = useRef(false);

  useEffect(() => {
    if (plan.tratamientos.length === 0 && !haAgregadoTratamientoInicial.current) {
      addTratamiento(plan.id);
      haAgregadoTratamientoInicial.current = true;
    }

    setTratamientoActivoIndex((prev) => {
      if (plan.tratamientos.length === 0) return 0;
      if (prev >= plan.tratamientos.length) return plan.tratamientos.length - 1;
      return prev;
    });
  }, [plan.tratamientos.length, addTratamiento, plan.id]);

  const handleAddTratamiento = () => {
    addTratamiento(plan.id);
    setTratamientoActivoIndex(plan.tratamientos.length);
  };

  const handleDeletePlan = () => {
    deletePlan(plan.id);
  };

  const handleDeleteTratamiento = (tratamientoId) => {
    const indexToDelete = plan.tratamientos.findIndex((t) => t.id === tratamientoId);
    if (indexToDelete === -1) return;

    deleteTratamiento(plan.id, tratamientoId);

    setTratamientoActivoIndex((prev) => {
      if (indexToDelete === prev) {
        return prev === 0 ? 0 : prev - 1;
      }
      if (indexToDelete < prev) {
        return prev - 1;
      }
      return prev;
    });
  };

  const hayTratamientosConProductos = plan.tratamientos.some(
    (t) => t.productos && t.productos.length > 0
  );

  const mostrarTotal = plan.tratamientos.length > 0 && hayTratamientosConProductos;

  return (
    <div className="mx-auto px-2 w-full sm:max-w-md md:max-w-3xl lg:max-w-4xl mb-10" ref={ref}>
      <div className="bg-white rounded-xl shadow-lg pt-6 px-6 pb-3">
        <div className="flex justify-between items-center mb-4">
          <PlanTitle title={`Plan Fitosanitario ${plan.id}`} />
          <DeleteButton onDelete={handleDeletePlan} showText text="Eliminar Plan" />
        </div>

        <span className="block text-sm text-gray-500 mb-2">Lista de tratamientos</span>

        <Paginacion
          tratamientos={plan.tratamientos}
          tratamientoActivoIndex={tratamientoActivoIndex}
          onChangeIndex={setTratamientoActivoIndex}
          onAdd={handleAddTratamiento}
        />

        {plan.tratamientos[tratamientoActivoIndex] && (
          <TratamientoSanitario
            key={plan.tratamientos[tratamientoActivoIndex].id}
            planId={plan.id}
            tratamiento={plan.tratamientos[tratamientoActivoIndex]}
            onDelete={() =>
              handleDeleteTratamiento(plan.tratamientos[tratamientoActivoIndex].id)
            }
          />
        )}
        {mostrarTotal && (
          <div className="text-right text-2xl font-bold text-gray-800 border-t border-gray-200 px-6 py-4 rounded-b-xl">
            <span className="font-semibold text-gray-800 tracking-wide mr-2">
              Costo Total:
            </span>
            <span className="text-green-900 font-extrabold tracking-tight">
              {plan.total.toLocaleString()} <span className="text-sm font-semibold text-gray-600">ARS/ha</span>
            </span>
          </div>
        )}
      </div>

    </div>
  );
});
