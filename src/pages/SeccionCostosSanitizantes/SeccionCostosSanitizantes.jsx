import InputDolar from "../../components/InputDolar/InputDolar.jsx";
import {CardSanitizantePlan} from "../../components/CardSanitizantePlan/CardSanitizantePlan.jsx";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import AddPlanButton from "../../components/AddPlanButton/AddPlanButton.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import SelectorEstadoFenologico from "../../components/SelectorEstadoFenologico/SelectorEstadoFenologico.jsx";

export default function SeccionCostosSanitizantes() {
  const {
    valorDolar,
    updateDolar,
    refreshDolar,
    planes,
    sanitizantes,
    addPlan,
    updatePlan,
    deletePlan,
  } = useContext(AppContext).sanitizantes;

  const {
    estadosFenologicos,
    estadoFenologicoSanitizante,
    setEstadoFenologicoSanitizante,
  } = useContext(AppContext).estadosFenologicos;

  const handleAddPlan = () => {
    addPlan();
  }

  return (
    <div className="bg-gray-100 py-8 my-4">
      <SectionTitle title="🧪 Costos de Sanitizantes"/>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
        <SelectorEstadoFenologico
          estados={estadosFenologicos}
          estadoSeleccionado={estadoFenologicoSanitizante}
          setEstadoSeleccionado={setEstadoFenologicoSanitizante}
        />
      </div>

      {planes.map(plan => (
        <CardSanitizantePlan key={plan.id} plan={plan} sanitizantes={sanitizantes}
                             onDelete={deletePlan} onUpdate={updatePlan}/>
      ))}

      <AddPlanButton text="Agregar nuevo plan de sanitización" onClick={handleAddPlan}/>
    </div>
  );
}