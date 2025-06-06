import React, { forwardRef, useState } from "react";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import NumberValue from "../NumberValue/NumberValue.jsx";
import PlanTitle from "../PlanTitle/PlanTitle.jsx";
import NumberValueModify from "../NumberValueModify/NumberValueModify.jsx";
import { RefreshCcw } from "lucide-react";
import {ButtonRefreshDolar} from "../ButtonRefreshDolar/ButtonRefreshDolar.jsx";

// import 

export const CardMaquinariaPlan = forwardRef(function CardMaquinariaPlan(
  { plan, tractores, implementos, onUpdate, onDelete },
  ref
  ) {
  const handleDelete = () => {
    onDelete(plan.id);
  }

  const [prevPrecioImplemento, setPrevPrecioImplemento] = useState(plan.implemento.precioDolar);
  const [prevPrecioTractor, setPrevPrecioTractor] = useState(plan.tractor.precioDolar);

  const onChangePrecioMaquinaria = (e) => {
    const newPrecio = parseFloat(e.target.value);
    const updatedTractor = { ...plan.tractor, precioDolar: newPrecio };
    onUpdate(plan.id, updatedTractor, plan.implemento);
  };

  const onChangePrecioImplemento = (e) => {
    const newPrecio = parseFloat(e.target.value);
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

  const onRefreshDolarMaquinaria = () => {
    const updatedTractor = { ...plan.tractor, precioDolar: prevPrecioTractor };
    onUpdate(plan.id, updatedTractor, plan.implemento);
  }

  const onRefreshDolarImplemento = () => {
    const updatedImplemento = { ...plan.implemento, precioDolar: prevPrecioImplemento };
    onUpdate(plan.id, plan.tractor, updatedImplemento);
  }

  return (
   <div className="max-w-6xl mx-auto px-2" ref={ref}>
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <PlanTitle title={`Plan ${plan.id}`} />
        <DeleteButton onDelete={handleDelete} />
      </div>

      {/* DATOS DEL TRACTOR */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <span>Datos del Tractor</span>
        </h3>
        <div className="grid lg:grid-cols-6 sm:grid-cols-2 md:grid-cols-3 gap-5">

          <InputOptions
            label="Tractor"
            value={plan.tractor.nombre}
            options={tractores.map((t) => t.nombre)}
            onChange={handleUpdateTractor}
          />

          <NumberValue name="Potencia" value={plan.tractor.potencia} unit="HP" />

          <div className="flex items-center gap-2">
            <NumberValueModify
              name="Precio"
              value={plan.tractor.precioDolar}
              unit="US$"
              onChange={onChangePrecioMaquinaria}
            />
            
            <ButtonRefreshDolar onClick={onRefreshDolarMaquinaria} className={"flex items-center justify-center p-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow transition-colors mt-5"} 
            title={"Sincronizar valor del dólar"} style={"minWidth: 36, minHeight: 36"} content={<RefreshCcw size={20} />}/>

          </div>

          <NumberValue name="Coef. conserv." value={plan.tractor.gastoMantenimiento} />
          <NumberValue name="Horas útiles" value={plan.tractor.horasVidaUtil} unit="h" />
          <NumberValue name="Valor residual" value={plan.tractor.porcentajeValorResidual} unit="%" />

        </div>
        <div className="mt-4 bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 shadow-inner flex flex-wrap gap-x-4 gap-y-2">
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

        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <span>Implemento</span>
        </h3>

        <div className="grid lg:grid-cols-6 sm:grid-cols-2 md:grid-cols-3 gap-5">

          <InputOptions
            label="Implemento"
            value={plan.implemento.nombre}
            options={implementos.map((i) => i.nombre)}
            onChange={handleUpdateImplemento}
          />
          <NumberValue name="Consumo" value={plan.implemento.consumoCombustible} unit="lt/h" />

          <div className="flex items-center gap-2">
            <NumberValueModify name="Precio" value={plan.implemento.precioDolar} unit="US$" onChange={onChangePrecioImplemento}/>
            <ButtonRefreshDolar onClick={onRefreshDolarImplemento} className={"flex items-center justify-center p-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow transition-colors mt-5"}             title={"Sincronizar valor del dólar"} style={"minWidth: 36, minHeight: 36"} content={<RefreshCcw size={20} />}/>
          </div>

          <NumberValue name="Coef. conserv." value={plan.implemento.gastoMantenimiento} />
          <NumberValue name="Horas útiles" value={plan.implemento.horasVidaUtil} unit="h" />
          <NumberValue name="Valor residual" value={plan.implemento.porcentajeValorResidual} unit="%" />
          
        </div>
        <div className="mt-4 bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 shadow-inner flex flex-wrap gap-x-4 gap-y-2">
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

      {/* COSTO TOTAL */}
      <div className="text-right text-2xl font-extrabold text-black border-t pt-6 mt-6">
        <span className="ml-2">Costo Total:</span>
        <span className="ml-2">{plan.costoEconomico.toLocaleString()} ARS/h</span>
      </div>
    </div>

   </div>
  )
});