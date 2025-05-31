import InputDolar from "../../components/InputDolar/InputDolar.jsx";
import {CardFertilizacionPlan} from "../../components/CardFertilizacionPlan/CardFertilizacionPlan.jsx";
import InputOptions from "../../components/InputOptions/InputOptions.jsx";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import AddPlanButton from "../../components/AddPlanButton/AddPlanButton.jsx";
import SelectorEstadoFenologico from "../../components/SelectorEstadoFenologico/SelectorEstadoFenologico.jsx";
import Grafico from "../../components/Grafico/Grafico.jsx";

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

  const chartData = planes.map(p => ({
   name: `Plan ${p.id}`,
   total: p.costoTotalPorHectarea, 
  }))

  return (
    <div className="bg-gray-100 py-8 my-4">
      <SectionTitle title="🌱 Costos de Fertilización"/>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
        <SelectorEstadoFenologico
          estados={estadosFenologicos}
          estadoSeleccionado={estadoFenologicoFertilizante}
          setEstadoSeleccionado={setEstadoFenologicoFertilizante}
        />
      </div>

      {planes.map(plan => (
        <CardFertilizacionPlan key={plan.id} plan={plan} fertilizantes={fertilizantes}
                               onDelete={deletePlan} onUpdate={updatePlan}/>
      ))}

      <Grafico data={chartData} title={"Costo fertilización"}/>

      <AddPlanButton text="Agregar nuevo plan de fertilización" onClick={handleAddPlan}/>
    </div>
  );
}