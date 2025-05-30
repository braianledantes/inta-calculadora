import InputDolar from "../InputDolar/InputDolar.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import {CardSanitarioPlan} from "../CardSanitarioPlan/CardSanitarioPlan.jsx";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";

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
    <section className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-bold">Costos Sanitarios</h2>
      <div>
        <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
        <InputOptions label="Estado Fenológico" options={estadosFenologicos.map(e => e.nombre)}
                      onChange={handleEstadoChange} value={estadoFenologicoSanitizante.nombre}/>
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