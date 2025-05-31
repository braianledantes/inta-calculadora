import InputDolar from "../InputDolar/InputDolar.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import {CardSanitizantePlan} from "../CardSanitizantePlan/CardSanitizantePlan.jsx";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import AddPlanButton from "../AddPlanButton/AddPlanButton.jsx";
import SectionTitle from "../SectionTitle/SectionTitle.jsx";

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

  const handleEstadoChange = (e) => {
    const newEstado = e.target.value;
    const estadoSeleccionado = estadosFenologicos.find(e => e.nombre === newEstado);
    if (estadoSeleccionado) {
      setEstadoFenologicoSanitizante(estadoSeleccionado);
    }
  }

  return (
    <div className="bg-gray-100 p-8 my-4">
      <SectionTitle title="🧪 Costos de Sanitizantes"/>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
        <InputOptions
          label="Estado fenológico"
          value={estadoFenologicoSanitizante?.nombre || ""}
          options={estadosFenologicos.map(e => e.nombre)}
          onChange={handleEstadoChange}
        />
      </div>

      {planes.map(plan => (
        <CardSanitizantePlan key={plan.id} plan={plan} sanitizantes={sanitizantes}
                             onDelete={deletePlan} onUpdate={updatePlan}/>
      ))}

      <AddPlanButton onClick={handleAddPlan}/>
    </div>
  );
}