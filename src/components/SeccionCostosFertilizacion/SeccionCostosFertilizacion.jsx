import InputDolar from "../InputDolar/InputDolar.jsx";
import {CardFertilizacionPlan} from "../CardFertilizacionPlan/CardFertilizacionPlan.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import SectionTitle from "../SectionTitle/SectionTitle.jsx";
import AddPlanButton from "../AddPlanButton/AddPlanButton.jsx";

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
    <section className="flex flex-col gap-4 p-4 border-1 bg-white">
      <SectionTitle title="Costos de Fertilización"/>
      <div className="flex justify-between flex-wrap gap-2">
        <div className="flex justify-center items-end gap-4">
          <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
        </div>
        <InputOptions label="Estado Fenológico" options={estadosFenologicos.map(e => e.nombre)}
                      onChange={handleEstadoChange} value={estadoFenologicoFertilizante.nombre}/>
      </div>
      <div className="flex flex-col gap-4">
        {planes.map((plan) => {
          return <CardFertilizacionPlan key={plan.id} plan={plan} fertilizantes={fertilizantes}
                                        onDelete={deletePlan} onUpdate={updatePlan}/>;
        })}
      </div>
      <AddPlanButton onClick={handleAddPlan}/>
    </section>
  );
}