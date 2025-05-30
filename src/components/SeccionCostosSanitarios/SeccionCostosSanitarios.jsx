import InputDolar from "../InputDolar/InputDolar.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import {CardSanitarioPlan} from "../CardSanitarioPlan/CardSanitarioPlan.jsx";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import AddPlanButton from "../AddPlanButton/AddPlanButton.jsx";
import SectionTitle from "../SectionTitle/SectionTitle.jsx";

export default function SeccionCostosSanitarios() {
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
    <section className="flex flex-col gap-4 p-4 border-1 bg-blue-50">
      <SectionTitle title="Costos Sanitarios"/>
      <div className="flex justify-between flex-wrap gap-2">
        <div className="flex justify-center items-end gap-4">
          <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
        </div>
        <InputOptions label="Estado Fenológico" options={estadosFenologicos.map(e => e.nombre)}
                      onChange={handleEstadoChange} value={estadoFenologicoSanitizante.nombre}/>
      </div>
      <div className="flex flex-col gap-4">
        {planes.map((plan) => {
          return <CardSanitarioPlan key={plan.id} plan={plan} sanitizantes={sanitizantes}
                                    onDelete={deletePlan} onUpdate={updatePlan}/>;
        })}
      </div>
      <div className="flex justify-end">
        <AddPlanButton onClick={handleAddPlan}/>
      </div>
    </section>
  );
}