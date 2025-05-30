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
    <section className="flex flex-col gap-4 p-4 border-1 bg-red-50">
      <SectionTitle title="Costos de Maquinaria"/>
      <div className="flex justify-between flex-wrap gap-2">
        <div className="flex justify-center items-end gap-4">
          <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
          <InputGasoil value={valorGasoilina} onChange={updateGasolina}/>
        </div>
        <InputOptions label="Estado Fenológico" options={estadosFenologicos.map(e => e.nombre)}
                      onChange={handleEstadoChange} value={estadoFenologicoMaquinaria.nombre}/>
      </div>
      <div className="flex flex-col gap-4">
        {planes.map((plan) => {
          return <CardMaquinariaPlan key={plan.id} plan={plan} tractores={tractores} implementos={implementos}
                                     onDelete={deletePlan} onUpdate={updatePlan}/>;
        })}
      </div>
      <div className="flex justify-end">
        <AddPlanButton onClick={handleAddPlan}/>
      </div>
    </section>
  )
}