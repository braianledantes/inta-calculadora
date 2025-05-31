import {useMemo, useState} from "react";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";
import NumberValue from "../NumberValue/NumberValue.jsx";
import InputNumber from "../InputNumber/InputNumber.jsx";
import PlanTitle from "../PlanTitle/PlanTitle.jsx";

export function CardSanitizantePlan({plan, sanitizantes, onUpdate, onDelete}) {
  const [tipoSeleccionado, setTipoSeleccionado] = useState(
    plan.sanitizante?.tipo || (sanitizantes[0]?.tipo ?? "")
  );

  // Obtener tipos únicos
  const tipos = useMemo(
    () => [...new Set(sanitizantes.map(s => s.tipo))],
    [sanitizantes]
  );

  // Filtrar sanitizantes por tipo seleccionado
  const sanitizantesFiltrados = useMemo(
    () => sanitizantes.filter(s => s.tipo === tipoSeleccionado),
    [sanitizantes, tipoSeleccionado]
  );

  const handleDelete = () => {
    onDelete(plan.id);
  };

  const handleUpdateTipo = (e) => {
    const nuevoTipo = e.target.value;
    setTipoSeleccionado(nuevoTipo);
    // Opcional: resetear sanitizante al primero del tipo seleccionado
    const primerSanitizante = sanitizantes.find(s => s.tipo === nuevoTipo);
    if (primerSanitizante) {
      onUpdate(plan.id, primerSanitizante, plan.volumenPorHectarea, plan.cantTratamientos);
    }
  };

  const handleUpdateSanitizante = (e) => {
    const sanitizanteName = e.target.value;
    const sanitizante = sanitizantesFiltrados.find(f => f.nombre === sanitizanteName);
    onUpdate(plan.id, sanitizante, plan.volumenPorHectarea, plan.cantTratamientos);
  };

  const handleUpdateVolumenPorHectarea = (valor) => {
    const volumenPorHectarea = parseFloat(valor);
    onUpdate(plan.id, plan.sanitizante, volumenPorHectarea, plan.cantTratamientos);
  };

  const handleUpdateCantTratamientos = (valor) => {
    const cantTratamientos = parseFloat(valor);
    onUpdate(plan.id, plan.sanitizante, plan.volumenPorHectarea, cantTratamientos);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <PlanTitle title={`Plan ${plan.id}`}/>
        <DeleteButton onDelete={handleDelete}/>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">🧪 Datos del Sanitizante</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InputOptions
            label="Tipo"
            value={tipoSeleccionado}
            options={tipos}
            onChange={handleUpdateTipo}
          />
          <InputOptions
            label="Sanitizante"
            value={plan.sanitizante.nombre}
            options={sanitizantesFiltrados.map(f => f.nombre)}
            onChange={handleUpdateSanitizante}
          />
          <NumberValue name="Precio" value={plan.sanitizante.precioEnvaseDolar} unit="US$"/>
          <NumberValue name="Dosis por ha" value={plan.sanitizante.dosisAplicacion}
                       unit={plan.sanitizante.unidadDosisAplicacion}/>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">🖋️ Datos del Plan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InputNumber name="Volumen por ha" value={plan.volumenPorHectarea} onChange={handleUpdateVolumenPorHectarea}/>
          <InputNumber name="Cant. tratamientos" value={plan.cantTratamientos} onChange={handleUpdateCantTratamientos}/>
        </div>
      </div>
      <div className="mt-3 bg-green-100 text-green-700 font-semibold p-3 rounded-md">
        🛢️ Costo por tratamiento: {plan.costoTotalPorTratamiento} ARS | Costo : {plan.costoTotalPorHectarea} ARS/ha
      </div>
      <div className="text-right text-xl font-bold text-green-600">
        Costo Total: {plan.costoTotalPorHectarea.toLocaleString()} ARS/ha
      </div>
    </div>
  );
}