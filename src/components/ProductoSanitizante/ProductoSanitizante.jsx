import {useContext, useMemo, useState} from "react";
import {AppContext} from "../../context/AppContext";
import DeleteButton from "../DeleteButton/DeleteButton";
import InputOptions from "../InputOptions/InputOptions";
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
      <div className="flex justify-between items-start">
        <span className="font-semibold text-gray-400 tracking-wide">
          Producto {producto.id}
        </span>
        <DeleteButton onDelete={handleDeleteProducto} />
      </div>

      <div className="flex flex-wrap gap-7 mt-5">
        <InputOptions
          label="Principio Activo"
          options={sanitizantesFiltrados.map(s => s.nombre)}
          value={producto.sanitizante.nombre}
          onChange={handleChangeSanitizante}
        />
        <InputOptions
          label="Tipo"
          options={tiposSanitizantes}
          value={producto.sanitizante.tipo}
          onChange={handleChangeTipo}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-2 mt-5">
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

    <div className="w-full grid sm:grid-cols-2 bg-green-50 text-green-800 p-4 rounded-bl-lg rounded-br-lg border border-green-900/10 shadow-sm  gap-2">
      <span>
        <span className="font-semibold tracking-wide">Cantidad por ha:</span>
        <span className="font-extrabold tracking-tight"> {producto.cantidadPorHectarea}<span className="font-semibold">/ha</span></span>
      </span>
      <span>
        <span className="font-semibold tracking-wide">Costo por ha:</span>
        <span className="font-extrabold tracking-tight"> {producto.costoTotalPorHectarea}<span className="font-semibold">/ha</span></span>
      </span>
    </div>
  </div>
);
}