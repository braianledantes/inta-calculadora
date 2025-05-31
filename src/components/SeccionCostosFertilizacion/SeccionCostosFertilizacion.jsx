import InputDolar from "../InputDolar/InputDolar.jsx";
import {CardFertilizacionPlan} from "../CardFertilizacionPlan/CardFertilizacionPlan.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import SectionTitle from "../SectionTitle/SectionTitle.jsx";
import AddPlanButton from "../AddPlanButton/AddPlanButton.jsx";
import SelectorEstadoFenologico from "../SelectorEstadoFenologico/SelectorEstadoFenologico.jsx";

export default function SeccionCostosFertilizacion() {
  const {
    valorDolar,
    updateDolar,
    refreshDolar,
    planes,
    fertilizantes,
    addPlan,
    updatePlan,
    deletePlan,
  } = useContext(AppContext).fertilizantes;

  const {
    estadosFenologicos,
    estadoFenologicoFertilizante,
    setEstadoFenologicoFertilizante
  } = useContext(AppContext).estadosFenologicos;

  const handleAddPlan = () => {
    addPlan();
  }

  return (
    <div className="bg-gray-100 py-8 my-4">
      <SectionTitle title="🌱 Costos de Fertilización"/>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
        <SelectorEstadoFenologico
          estados={estadosFenologicos}
          estadoSeleccionado={estadoFenologicoFertilizante}
          setEstadoSeleccionado={setEstadoFenologicoFertilizante}
        />
      </div>

      {planes.map(plan => (
        <CardFertilizacionPlan key={plan.id} plan={plan} fertilizantes={fertilizantes}
                               onDelete={deletePlan} onUpdate={updatePlan}/>
      ))}

      <AddPlanButton text="Agregar nuevo plan de fertilización" onClick={handleAddPlan}/>
    </div>
  );
}