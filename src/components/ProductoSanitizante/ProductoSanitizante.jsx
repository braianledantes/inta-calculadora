import { useContext, useMemo, useState } from "react";
import { AppContext } from "../../context/AppContext";
import DeleteButton from "../DeleteButton/DeleteButton";
import NumberValueModify from "../NumberValueModify/NumberValueModify";
import InputOptions from "../InputOptions/InputOptions";
import NumberValue from "../NumberValue/NumberValue";
import InputNumber from "../InputNumber/InputNumber";

export default function ProductoSanitizante({ idPlan, idTratamiento, producto }) {
  const { updateProducto, deleteProducto, sanitizantes } = useContext(AppContext).sanitizantes;

  const sanitizante = producto.sanitizante;

  const [tipoSeleccionado, setTipoSeleccionado] = useState(sanitizante?.tipo || (sanitizantes[0]?.tipo ?? ""));

  // Obtener tipos únicos
  const tiposSanitizantes = useMemo(() => [...new Set(sanitizantes.map(s => s.tipo))],
    [sanitizantes]);

  // Filtrar sanitizantes por tipo seleccionado
  const sanitizantesFiltrados = useMemo(() => sanitizantes.filter(s => s.tipo === tipoSeleccionado),
    [sanitizantes, tipoSeleccionado]);

  const handleChangeTipo = (e) => {
    const nuevoTipo = e.target.value;
    setTipoSeleccionado(nuevoTipo);
    const primerSanitizante = sanitizantes.find(s => s.tipo === nuevoTipo);
    if (primerSanitizante) {
      updateProducto(idPlan, idTratamiento, producto.id, primerSanitizante, primerSanitizante.precioEnvaseDolar, 1, 1);
    }
  };

  const handleChangeSanitizante = (e) => {
    const sanitizanteSeleccionado = sanitizantesFiltrados.find(f => f.nombre === e.target.value);
    if (sanitizanteSeleccionado) {
      updateProducto(idPlan, idTratamiento, producto.id, sanitizanteSeleccionado, sanitizanteSeleccionado.precioEnvaseDolar, 1, 1);
    }
  }

  const handleDeleteProducto = () => {
    deleteProducto(idPlan, idTratamiento, producto.id);
  };

  const handlePrecioChange = (newPrecio) => {
    updateProducto(idPlan, idTratamiento, producto.id, sanitizante, newPrecio, producto.dosisPorHectarea, producto.volumenPorHectarea);
  }

  const handleDosisChange = (newDosis) => {
    updateProducto(idPlan, idTratamiento, producto.id, sanitizante, producto.precio, newDosis, producto.volumenPorHectarea);
  }

  const handleVolumenChange = (newVolumen) => {
    updateProducto(idPlan, idTratamiento, producto.id, sanitizante, producto.precio, producto.dosisPorHectarea, newVolumen);
  }

  return (
    <div>
    <div className="bg-white p-4 rounded-tl-lg rounded-tr-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold"> {producto.sanitizante.nombre || "producto1"} </h2>
          <span className="text-sm text-gray-500">{producto.sanitizante.tipo || "tipo"}</span>
        </div>
        <DeleteButton onDelete={handleDeleteProducto} />
      </div>
    <div className="grid sm:grid-cols-5 gap-2">
      <InputOptions
        label="Tipo de Sanitizante"
        options={tiposSanitizantes}
        value={producto.sanitizante.tipo}
        onChange={handleChangeTipo}
      />
      <InputOptions
        label="Principio Activo"
        options={sanitizantesFiltrados.map(s => s.nombre)}
        value={producto.sanitizante.nombre}
        onChange={handleChangeSanitizante}
      />
      <InputNumber
        name={"Precio Envase"}
        value={producto.precio}
        unit={"US$"}
        onChange={handlePrecioChange}
      />
            <InputNumber
        name={"Volumen hectárea"}
        value={producto.volumenPorHectarea}
        unit={producto.sanitizante.unidadVolumenEnvase}
        onChange={handleVolumenChange}
      />
      <InputNumber
        name={"Dosis por hectárea"}
        value={producto.dosisPorHectarea}
        unit={producto.sanitizante.unidadDosisAplicacion}
        onChange={handleDosisChange}
      />
    </div>

  </div>
      <div className="w-full bg-green-50 text-green-800 p-4 rounded-bl-lg rounded-br-lg border border-green-200 flex flex-wrap gap-x-4 gap-y-2 shadow-sm">
      <span>
        <span className="font-semibold">Cant. por ha:</span>
        <span className="font-normal"> {producto.cantidadPorHectarea}/ha</span>
      </span>
      <span>
        <span className="font-semibold">Costo por ha:</span>
        <span className="font-normal"> {producto.costoTotalPorHectarea}/ha</span>
      </span>
    </div>
  </div>
);
}