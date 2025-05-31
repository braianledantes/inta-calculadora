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
    <div className="bg-gray-100 p-8 my-4">
      <SectionTitle title="🌱 Costos de Fertilización"/>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
        <InputOptions
          label="Estado fenológico"
          value={estadoFenologicoFertilizante?.nombre || ""}
          options={estadosFenologicos.map(e => e.nombre)}
          onChange={handleEstadoChange}
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