import {useMaquinaria} from "../../hooks/useMaquinaria.js";
import {CardMaquinariaPlan} from "../CardMaquinariaPlan/CardMaquinariaPlan.jsx";
import InputDolar from "../InputDolar/InputDolar.jsx";
import InputGasoil from "../InputGasoil/InputGasoil.jsx";

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
    implementos
  } = useMaquinaria();

  const handleAddPlan = () => {
    addPlan();
  }

  return (
    <section className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-bold">Costos de Maquinaria</h2>
      <div>
        <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar}/>
        <InputGasoil value={valorGasoilina} onChange={updateGasolina}/>
      </div>
      <div className="flex flex-col gap-4">
        {planes.map((plan) => {
          return <CardMaquinariaPlan key={plan.id} plan={plan} tractores={tractores} implementos={implementos}
                                     onDelete={deletePlan} onUpdate={updatePlan}/>;
        })}
      </div>
      <button className="p-2 border-1 hover:cursor-pointer" onClick={handleAddPlan}>Agregar Plan</button>
    </section>
  )
}