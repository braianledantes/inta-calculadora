import InputDolar from "../../components/InputDolar/InputDolar.jsx";
import {CardFertilizacionPlan} from "../../components/CardFertilizacionPlan/CardFertilizacionPlan.jsx";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import AddPlanButton from "../../components/AddPlanButton/AddPlanButton.jsx";
import SelectorEstadoFenologico from "../../components/SelectorEstadoFenologico/SelectorEstadoFenologico.jsx";
import Grafico from "../../components/Grafico/Grafico.jsx";
import ButtonExportPDF from "../../components/ButtonExportPDF/ButtonExportPDF.jsx"
import {useRef} from 'react';
import exportarGrafico from "../../utils/exportarGrafico.jsx";

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

  const chartData = planes.map(p => ({
   name: `Plan ${p.id}`,
   total: p.costoTotalPorHectarea, 
  }))
  const chartRef = useRef();
  

  return (
    <div className="bg-gray-100 py-8 my-4">
      
     <div className="flex justify-center gap-3 mb-4 flex-wrap">
        <SectionTitle title="Costos de Fertilización"/>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
        <SelectorEstadoFenologico
          estados={estadosFenologicos}
          estadoSeleccionado={estadoFenologicoFertilizante}
          setEstadoSeleccionado={setEstadoFenologicoFertilizante}
        />
      </div>
      
      <div className="flex flex-col lg:flex-row gap-2">
      <div className="flex-1 lg:basis-2/3 space-y-6 order-1">
      {planes.map((plan, idx) => (
        <CardFertilizacionPlan key={plan.id} plan={plan} fertilizantes={fertilizantes}
                               onDelete={deletePlan} onUpdate={updatePlan}
                               ref={idx === planes.length - 1 ? setLastPlanRef : null}/>
      ))}
      <AddPlanButton text="Agregar nuevo plan de maquinaria" onClick={handleAddPlan}/>
      </div>

      {planes.length >=2 &&(
        <div className="lg:basis-1/3 order-2">
        <div  className="sticky top-50 bottom-30" style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
          <div ref={chartRef}>
            <Grafico data={chartData} title={"Costo Fertilizacion"}/>
          </div> 
         <ButtonExportPDF onExport={() => exportarGrafico(chartRef, { fertilizacionPlans: planes ,  valorDolar: valorDolar, estadoFenologico: estadoFenologicoFertilizante})} />
        </div>
      </div>
      ) }
     </div>
    </div>
  );
}