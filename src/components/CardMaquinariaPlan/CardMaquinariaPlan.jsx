import React, { forwardRef } from "react";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import NumberValue from "../NumberValue/NumberValue.jsx";
import PlanTitle from "../PlanTitle/PlanTitle.jsx";
import InputNumber from "../InputNumber/InputNumber.jsx";


export const CardMaquinariaPlan = forwardRef(function CardMaquinariaPlan(
  { plan, tractores, implementos, onUpdate, onDelete },ref) {
    
  const handleDelete = () => {
    onDelete(plan.id);
  }

  const onChangePrecioMaquinaria = (value) => {
    const newPrecio = parseFloat(value);
    const updatedTractor = { ...plan.tractor, precioDolar: newPrecio };
    onUpdate(plan.id, updatedTractor, plan.implemento);
  };

  const onChangePrecioImplemento = (value) => {
    const newPrecio = parseFloat(value);
    const updatedImplemento = { ...plan.implemento, precioDolar: newPrecio };
    onUpdate(plan.id, plan.tractor, updatedImplemento);
  };

  const handleUpdateTractor = (e) => {
    const tractorName = e.target.value;
    const tractor = tractores.find(t => t.nombre === tractorName);
    onUpdate(plan.id, tractor, plan.implemento);
  }

  const handleUpdateImplemento = (e) => {
    const implementoName = e.target.value;
    const implemento = implementos.find(i => i.nombre === implementoName);
    onUpdate(plan.id, plan.tractor, implemento);
  }

  const handleUpdateValorResidualTractor = (value) => {
    const newValorResidual = parseFloat(value);
    const updatedTractor = { ...plan.tractor, porcentajeValorResidual: newValorResidual };
    onUpdate(plan.id, updatedTractor, plan.implemento);
  }

  const handleUpdateValorResidualImplemento = (value) => {
    const newValorResidual = parseFloat(value);
    const updatedImplemento = { ...plan.implemento, porcentajeValorResidual: newValorResidual };
    onUpdate(plan.id, plan.tractor, updatedImplemento);
  }

  return (
   <div className="bg-white shadow-lg rounded-xl mx-auto w-full sm:max-w-md md:max-w-3xl lg:max-w-4xl mb-10" ref={ref}>

    <div className="px-6 pt-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <PlanTitle title={`Conjunto de Maquinaria ${plan.id}`} />
        <DeleteButton onDelete={handleDelete} />
      </div>

      {/* DATOS DEL TRACTOR */}
      <div className="mb-8">
        
        <div className="w-64">
          <InputOptions
            label="Tractor"
            value={plan.tractor.nombre}
            options={tractores.map((t) => t.nombre)}
            onChange={handleUpdateTractor}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">

          <NumberValue name="Potencia" value={plan.tractor.potencia} unit="HP" />
          <NumberValue name="Horas útiles" value={plan.tractor.horasVidaUtil} unit="h" />
          <InputNumber name="Precio" value={plan.tractor.precioDolar} unit="US$" onChange={onChangePrecioMaquinaria} />
          <InputNumber name="Valor residual" value={plan.tractor.porcentajeValorResidual} unit="%" onChange={handleUpdateValorResidualTractor} />

        </div>
        <div className="mt-4 bg-green-50 text-green-800 p-4 border border-green-200 shadow-inner flex flex-wrap gap-x-4 gap-y-2">
          <span>
            <span className="font-semibold">Amortización:</span>
            <span className="font-normal"> {plan.amortizacionTractor} ARS/h</span>
          </span>
          <span>
            <span className="font-semibold">Conservación:</span>
            <span className="font-normal"> {plan.gastoConservacionTractor} ARS/h</span>
          </span>
        </div>
      </div>

      {/* IMPLEMENTO */}
      <div className="mb-8">
        
        <InputOptions
            label="Implemento"
            value={plan.implemento.nombre}
            options={implementos.map((i) => i.nombre)}
            onChange={handleUpdateImplemento}
          />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
          <NumberValue name="Consumo" value={plan.implemento.consumoCombustible} unit="lt/h" />
          <NumberValue name="Horas útiles" value={plan.implemento.horasVidaUtil} unit="h" />

          <InputNumber name="Precio" value={plan.implemento.precioDolar} unit="US$" onChange={onChangePrecioImplemento} />
          <InputNumber name="Valor residual" value={plan.implemento.porcentajeValorResidual} unit="%" onChange={handleUpdateValorResidualImplemento} />
          
        </div>
        <div className="mt-4 bg-green-50 text-green-800 p-4  border border-green-200 shadow-inner flex flex-wrap gap-x-4 gap-y-2">
          <span>
            <span className="font-semibold">Combustible:</span>
            <span className="font-normal"> {plan.costoCombustibleImplemento} ARS/h</span>
          </span>
          <span>
            <span className="font-semibold">Amortización:</span>
            <span className="font-normal"> {plan.amortizacionImplemento} ARS/h</span>
          </span>
          <span>
            <span className="font-semibold">Conservación:</span>
            <span className="font-normal"> {plan.gastoConservacionImplemento} ARS/h</span>
          </span>
        </div>
      </div>

    </div>

      {/* COSTO TOTAL */}
      <div className="text-right text-2xl font-bold text-gray-800 border-t border-gray-200 px-6 py-4 rounded-b-xl">
        <span className="font-semibold text-gray-800 tracking-wide mr-2">
          Costo Total:
        </span>
        <span className="text-green-900 font-extrabold tracking-tight">
          {plan.costoEconomico.toLocaleString()} <span className="text-sm font-semibold text-gray-600">ARS/h</span>
        </span>
      </div>

   </div>
  )
}); 