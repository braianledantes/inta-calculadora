import InputDolar from "../../components/InputDolar/InputDolar.jsx";
import {CardSanitizantePlan} from "../../components/CardSanitizantePlan/CardSanitizantePlan.jsx";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import AddPlanButton from "../../components/AddPlanButton/AddPlanButton.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import SelectorEstadoFenologico from "../../components/SelectorEstadoFenologico/SelectorEstadoFenologico.jsx";
import GraficoSanitizante from '../../components/Grafico/GraficosSanitizante.jsx'
import ButtonExportPDF from "../../components/ButtonExportPDF/ButtonExportPDF.jsx"
import {useRef} from 'react';
import exportarGrafico from "../../utils/exportarGrafico.jsx";
import PlanesSanitizantesChart from "../../components/PlanesSanitizantesChart/PlanesSanitizantesChart.jsx";
  
export default function SeccionCostosSanitizantes() {
  const {
    valorDolar,
    updateDolar,
    refreshDolar,
    planes,
    addPlan,
  } = useContext(AppContext).sanitizantes;

  const {
    estadosFenologicos,
    estadoFenologicoSanitizante,
    setEstadoFenologicoSanitizante,
  } = useContext(AppContext).estadosFenologicos;

  const [lastPlanRef, setLastPlanRef] = useState(null);

  const handleAddPlan = () => {
    addPlan();
  }

  // Hacer scroll cuando cambia la cantidad de planes
  useEffect(() => {
    if (lastPlanRef) {
      lastPlanRef.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [planes.length, lastPlanRef]);

  const handleExportPdf = () => {
    () => exportarGrafico(chartRef, { sanitizantePlans: planes ,  valorDolar: valorDolar, estadoFenologico: estadoFenologicoSanitizante })
  }

  const chartRef = useRef();
  

  return (
    <div className="bg-gray-100 py-8 my-4">
      
      <div className="flex items-center gap-3 mb-6 justify-center">
        <SectionTitle title="Calculadora de Costos de Planes Sanitarios"/>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
        <SelectorEstadoFenologico
          estados={estadosFenologicos}
          estadoSeleccionado={estadoFenologicoSanitizante}
          setEstadoSeleccionado={setEstadoFenologicoSanitizante}
        />
      </div>

      {planes.map((plan, idx) => (
        <CardSanitizantePlan key={plan.id} plan={plan} ref={idx === planes.length - 1 ? setLastPlanRef : null}/>
      ))}
        <AddPlanButton text="Agregar Plan Fitosanitario" onClick={handleAddPlan}/>
      {planes.length >= 2 && (
        <div>
          <div ref={chartRef}>
            <PlanesSanitizantesChart planes={planes} />
          </div>
          <ButtonExportPDF onExport={handleExportPdf} />
        </div>
      )}
    </div>
  );
}