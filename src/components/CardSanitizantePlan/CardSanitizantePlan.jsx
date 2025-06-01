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
  <div className="max-w-4xl mx-auto px-2">
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <PlanTitle title={`Plan ${plan.id}`}/>
        <DeleteButton onDelete={handleDelete}/>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center gap-2">
          <span>Datos del Sanitizante</span>
        </h3>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
        <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
          <span>Datos del Plan</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InputNumber name="Volumen por ha" value={plan.volumenPorHectarea} onChange={handleUpdateVolumenPorHectarea}/>
          <InputNumber name="Cant. tratamientos" value={plan.cantTratamientos} onChange={handleUpdateCantTratamientos}/>
        </div>
      </div>
      <div className="mt-4 bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 shadow-inner flex flex-wrap gap-x-4 gap-y-2">
        <span>
          <span className="font-semibold">Costo por tratamiento:</span>
          <span className="font-normal"> {plan.costoTotalPorTratamiento} ARS</span>
        </span>
        <span>
          <span className="font-semibold">Costo por ha:</span>
          <span className="font-normal"> {plan.costoTotalPorHectarea} ARS/ha</span>
        </span>
      </div>
      <div className="text-right text-2xl font-extrabold  border-t pt-6 mt-6">
        Costo Total: <span className="ml-2">{plan.costoTotalPorHectarea.toLocaleString()} ARS/ha</span>
      </div>
    </div>
    </div>
  );
}