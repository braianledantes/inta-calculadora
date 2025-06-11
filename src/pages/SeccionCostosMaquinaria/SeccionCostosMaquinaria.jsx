import {CardMaquinariaPlan} from "../../components/CardMaquinariaPlan/CardMaquinariaPlan.jsx";
import InputDolar from "../../components/InputDolar/InputDolar.jsx";
import InputGasoil from "../../components/InputGasoil/InputGasoil.jsx";
import { useRef, useContext, useState, useEffect } from "react";
import {AppContext} from "../../context/AppContext.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import AddPlanButton from "../../components/AddPlanButton/AddPlanButton.jsx";
import SelectorEstadoFenologico from "../../components/SelectorEstadoFenologico/SelectorEstadoFenologico.jsx";
import PlanesMaquinariaChart from "../../components/PlanesMaquinariaChart/PlanesMaquinariaChart.jsx";
import ButtonExportPDF from "../../components/ButtonExportPDF/ButtonExportPDF.jsx"
import exportarGrafico from "../../utils/exportarGrafico.jsx";

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

  const [lastPlanRef, setLastPlanRef] = useState(null);

  const handleAddPlan = () => {
    addPlan();
  }

  const handleExportPdf = () => {
    exportarGrafico(chartRef, { maquinariaPlans: planes ,  valorDolar: valorDolar, estadoFenologico: estadoFenologicoMaquinaria, valorGasoil: valorGasoilina })
  }

  // Hacer scroll cuando cambia la cantidad de planes
  useEffect(() => {
    if (lastPlanRef) {
      lastPlanRef.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [planes.length, lastPlanRef]);

  const chartRef = useRef();

  return (
    <div className="bg-gray-100 py-8 my-4">
      
    <div className="flex justify-center gap-3 mb-4 flex-wrap">
      <SectionTitle title="Calculadora de Costos de Maquinaria" />
    </div>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        
        <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>

        <SelectorEstadoFenologico
          estados={estadosFenologicos}
          estadoSeleccionado={estadoFenologicoMaquinaria}
          setEstadoSeleccionado={setEstadoFenologicoMaquinaria}
        />
        <InputGasoil value={valorGasoilina} onChange={updateGasolina}/>
        
      </div>


      {planes.map((plan, idx) => (
          <CardMaquinariaPlan key={plan.id} plan={plan} tractores={tractores} implementos={implementos} onDelete={deletePlan} onUpdate={updatePlan} ref={idx === planes.length - 1 ? setLastPlanRef : null}/>
      ))}
        <AddPlanButton text="Ingresar nuevo conjunto" onClick={handleAddPlan}/>
      
      {planes.length >= 2 && (
        <div>
          <div ref={chartRef}>
            <PlanesMaquinariaChart planes={planes} />
          </div>
          <ButtonExportPDF onExport={handleExportPdf} />
        </div>
      )}
    </div>
  )
}