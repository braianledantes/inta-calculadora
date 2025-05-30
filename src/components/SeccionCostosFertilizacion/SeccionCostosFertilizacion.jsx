import InputDolar from "../InputDolar/InputDolar.jsx";
import {CardMaquinariaPlan} from "../CardMaquinariaPlan/CardMaquinariaPlan.jsx";
import {useFertilizante} from "../../hooks/useFertilizante.js";
import {CardFertilizacionPlan} from "../CardFertilizacionPlan/CardFertilizacionPlan.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";

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
    estadoFenologico,
    setEstadoFenologico,
    estadosFenologicos,
  } = useFertilizante();

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
      <h2 className="text-lg font-bold">Costos de Fertilización</h2>
      <div>
        <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
        <InputOptions label="Estado Fenológico" options={estadosFenologicos.map(e => e.nombre)} onChange={handleEstadoChange} value={estadoFenologico.nombre} />
      </div>
      <div className="flex flex-col gap-4">
        {planes.map((plan) => {
          return <CardFertilizacionPlan key={plan.id} plan={plan} fertilizantes={fertilizantes}
                                     onDelete={deletePlan} onUpdate={updatePlan}/>;
        })}
      </div>
      <button className="p-2 border-1 hover:cursor-pointer" onClick={handleAddPlan}>Agregar Plan</button>
    </section>
  );
}