import {CardMaquinariaPlan} from "../CardMaquinariaPlan/CardMaquinariaPlan.jsx";
import InputDolar from "../InputDolar/InputDolar.jsx";
import InputGasoil from "../InputGasoil/InputGasoil.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import SectionTitle from "../SectionTitle/SectionTitle.jsx";
import AddPlanButton from "../AddPlanButton/AddPlanButton.jsx";

export default function SeccionCostosMaquinaria() {
  const {
    valorDolar,
    updateDolar,
    refreshDolar,
    valorGasoilina,
    updateGasolina,
    planes,
    addPlan,
    updatePlan,
    deletePlan,
    tractores,
    implementos,
  } = useContext(AppContext).maquinaria;

  const {
    estadosFenologicos,
    estadoFenologicoMaquinaria,
    setEstadoFenologicoMaquinaria,
  } = useContext(AppContext).estadosFenologicos;

  const handleAddPlan = () => {
    addPlan();
  }

  const handleEstadoChange = (e) => {
    const newEstado = e.target.value;
    const estadoSeleccionado = estadosFenologicos.find(e => e.nombre === newEstado);
    if (estadoSeleccionado) {
      setEstadoFenologicoMaquinaria(estadoSeleccionado);
    }
  }

  return (
    <div className="bg-gray-100 p-8 my-4">
      <SectionTitle title="🔧 Costos de Maquinaria"/>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
        <InputGasoil value={valorGasoilina} onChange={updateGasolina}/>
        <InputOptions
          label="Estado fenológico"
          value={estadoFenologicoMaquinaria?.nombre || ""}
          options={estadosFenologicos.map(e => e.nombre)}
          onChange={handleEstadoChange}
        />
      </div>

      {planes.map(plan => (
        <CardMaquinariaPlan key={plan.id} plan={plan} tractores={tractores} implementos={implementos}
                            onDelete={deletePlan} onUpdate={updatePlan}/>
      ))}

      <AddPlanButton onClick={handleAddPlan}/>
    </div>
  )
}