import InputDolar from "../../components/InputDolar/InputDolar.jsx";
import {CardSanitizantePlan} from "../../components/CardSanitizantePlan/CardSanitizantePlan.jsx";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import AddPlanButton from "../../components/AddPlanButton/AddPlanButton.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import SelectorEstadoFenologico from "../../components/SelectorEstadoFenologico/SelectorEstadoFenologico.jsx";
import Grafico from '../../components/Grafico/Grafico.jsx'
import ButtonExportPDF from "../../components/ButtonExportPDF/ButtonExportPDF.jsx"
import {useRef} from 'react';
import exportarGrafico from "../../utils/exportarGrafico.jsx";

  
export default function SeccionCostosSanitizantes() {
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

  const chartData = planes.map(p => ({
   name: `Plan ${p.id}`,
   total: p.costoTotalPorHectarea, 
  }))
  const chartRef = useRef();
  

  return (
    <div className="bg-gray-100 py-8 my-4">
      
      <div className="flex items-center gap-3 mb-6 justify-center">
        <SectionTitle title="Costos de Sanitizantes"/>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
        <SelectorEstadoFenologico
          estados={estadosFenologicos}
          estadoSeleccionado={estadoFenologicoSanitizante}
          setEstadoSeleccionado={setEstadoFenologicoSanitizante}
        />
      </div>

      {planes.map(plan => (
        <CardSanitizantePlan key={plan.id} plan={plan} sanitizantes={sanitizantes}
                             onDelete={deletePlan} onUpdate={updatePlan}/>
      ))}

     {planes.length >=2 &&(
      <div>
        <div ref={chartRef}>
          <Grafico data={chartData} title={"Costo Sanitizante"}/>
        </div>
        <ButtonExportPDF onExport={() => exportarGrafico(chartRef, { sanitizantePlans: planes ,  valorDolar: valorDolar, estadoFenologico: estadoFenologicoSanitizante })} />
      </div> 
      ) }

      <AddPlanButton text="Agregar nuevo plan de sanitización" onClick={handleAddPlan}/>
    </div>
  );
}