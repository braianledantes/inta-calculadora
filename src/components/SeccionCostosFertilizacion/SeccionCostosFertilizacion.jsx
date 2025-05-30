import InputDolar from "../InputDolar/InputDolar.jsx";
import {CardFertilizacionPlan} from "../CardFertilizacionPlan/CardFertilizacionPlan.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";

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

  const handleEstadoChange = (e) => {
    const newEstado = e.target.value;
    const estadoSeleccionado = estadosFenologicos.find(e => e.nombre === newEstado);
    if (estadoSeleccionado) {
      setEstadoFenologicoFertilizante(estadoSeleccionado);
    }
  }

  return (
    <section className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-bold">Costos de Fertilización</h2>
      <div>
        <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
        <InputOptions label="Estado Fenológico" options={estadosFenologicos.map(e => e.nombre)}
                      onChange={handleEstadoChange} value={estadoFenologicoFertilizante.nombre}/>
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