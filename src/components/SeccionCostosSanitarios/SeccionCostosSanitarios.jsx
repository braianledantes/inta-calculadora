import InputDolar from "../InputDolar/InputDolar.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import {useSanitizantes} from "../../hooks/useSanitizantes.js";
import {CardSanitarioPlan} from "../CardSanitarioPlan/CardSanitarioPlan.jsx";

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
    estadoFenologico,
    setEstadoFenologico,
    estadosFenologicos,
  } = useSanitizantes();

  const handleAddPlan = () => {
    addPlan();
  }

  const handleEstadoChange = (e) => {
    const newEstado = e.target.value;
    const estadoSeleccionado = estadosFenologicos.find(e => e.nombre === newEstado);
    if (estadoSeleccionado) {
      setEstadoFenologico(estadoSeleccionado);
    }
  }

  return (
    <section className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-bold">Costos Sanitarios</h2>
      <div>
        <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
        <InputOptions label="Estado Fenológico" options={estadosFenologicos.map(e => e.nombre)} onChange={handleEstadoChange} value={estadoFenologico.nombre} />
      </div>
      <div className="flex flex-col gap-4">
        {planes.map((plan) => {
          return <CardSanitarioPlan key={plan.id} plan={plan} sanitizantes={sanitizantes}
                                        onDelete={deletePlan} onUpdate={updatePlan}/>;
        })}
      </div>
      <button className="p-2 border-1 hover:cursor-pointer" onClick={handleAddPlan}>Agregar Plan</button>
    </section>
  );
}