import {CardMaquinariaPlan} from "../../components/CardMaquinariaPlan/CardMaquinariaPlan.jsx";
import InputDolar from "../../components/InputDolar/InputDolar.jsx";
import InputGasoil from "../../components/InputGasoil/InputGasoil.jsx";
import { useRef, useContext, useState, useEffect } from "react";
import {AppContext} from "../../context/AppContext.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import AddPlanButton from "../../components/AddPlanButton/AddPlanButton.jsx";
import SelectorEstadoFenologico from "../../components/SelectorEstadoFenologico/SelectorEstadoFenologico.jsx";
import GraficoMaquinaria from '../../components/Grafico/GraficoMaquinaria.jsx'
import ButtonExportPDF from "../../components/ButtonExportPDF/ButtonExportPDF.jsx"
import exportarGrafico from "../../utils/exportarGrafico.jsx";
import ExportButton from "../../components/ButtonExportExcel/ButtonExportExcel.jsx";

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

  // Hacer scroll cuando cambia la cantidad de planes
  useEffect(() => {
    if (lastPlanRef) {
      lastPlanRef.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [planes.length, lastPlanRef]);

  // console.log('Planes de maquinaria:', planes);

  const chartData = planes.map(p => ({
   name: `Plan ${p.id}`,
   total: p.costoEconomico 
  }))

  const chartRef = useRef();

  return (
    <div className="bg-gray-100 py-8 my-4">
      
    <div className="flex justify-center gap-3 mb-4 flex-wrap">
      <SectionTitle title="Costos de Maquinaria" />
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

      <div className="flex flex-col lg:flex-row gap-2">
      <div className="flex-1 lg:basis-2/3 space-y-6 order-1">
      {planes.map((plan, idx) => (
          <CardMaquinariaPlan key={plan.id} plan={plan} tractores={tractores} implementos={implementos} onDelete={deletePlan} onUpdate={updatePlan} ref={idx === planes.length - 1 ? setLastPlanRef : null}/>
      ))}
        <AddPlanButton text="Agregar nuevo plan de maquinaria" onClick={handleAddPlan}/>
      </div>

      {planes.length >= 2 &&(
        
        <div className="lg:basis-1/3 order-2">
          <div  className="sticky top-50 bottom-30" style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
            
            <div ref={chartRef}>
              <GraficoMaquinaria data={chartData} title={"Costo maquinaria"}/>
            </div>

            <ButtonExportPDF onExport={() => exportarGrafico(chartRef, { maquinariaPlans: planes ,  valorDolar: valorDolar, estadoFenologico: estadoFenologicoMaquinaria, valorGasoil: valorGasoilina })} />
          
          </div>
        </div>
      )}

      </div>
    </div>
  )
}