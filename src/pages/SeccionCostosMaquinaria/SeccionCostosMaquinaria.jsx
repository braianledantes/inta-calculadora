import {CardMaquinariaPlan} from "../../components/CardMaquinariaPlan/CardMaquinariaPlan.jsx";
import InputDolar from "../../components/InputDolar/InputDolar.jsx";
import InputGasoil from "../../components/InputGasoil/InputGasoil.jsx";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import AddPlanButton from "../../components/AddPlanButton/AddPlanButton.jsx";
import SelectorEstadoFenologico from "../../components/SelectorEstadoFenologico/SelectorEstadoFenologico.jsx";
import Grafico from '../../components/Grafico/Grafico.jsx'
import ButtonExportPDF from "../../components/ButtonExportPDF/ButtonExportPDF.jsx"
import {useRef} from 'react';
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

  const handleAddPlan = () => {
    addPlan();
  }

  const chartData = planes.map(p => ({
   name: `Plan ${p.id}`,
   total: p.costoEconomico, 
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
      {planes.map(plan => (
          <CardMaquinariaPlan key={plan.id} plan={plan} tractores={tractores} implementos={implementos} onDelete={deletePlan} onUpdate={updatePlan}/>
      ))}
        <AddPlanButton text="Agregar nuevo plan de maquinaria" onClick={handleAddPlan}/>
      </div>

      {planes.length >=2 &&(
        <div className="lg:basis-1/3 order-2">
        <div  className="sticky top-50 bottom-30" style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
          <div ref={chartRef}>
            <Grafico data={chartData} title={"Costo maquinaria"}/>
          </div>
          <ButtonExportPDF onExport={() => exportarGrafico(chartRef, { maquinariaPlans: planes ,  valorDolar: valorDolar, estadoFenologico: estadoFenologicoMaquinaria, valorGasoil: valorGasoilina })} />
        </div>
        </div>
      ) }
      </div>
    </div>
  )
}