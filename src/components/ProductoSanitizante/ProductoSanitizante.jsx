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
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 grid grid-cols-[1fr_auto] gap-4">
      <div >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputOptions
            label="Tipo de Sanitizante"
            options={tiposSanitizantes}
            value={producto.sanitizante.tipo}
            onChange={handleChangeTipo}
          />
          <InputOptions
            label="Sanitizante"
            options={sanitizantesFiltrados.map(s => s.nombre)}
            value={producto.sanitizante.nombre}
            onChange={handleChangeSanitizante}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <InputNumber
            name={"Precio Envase"}
            value={producto.precio}
            unit={"US$"}
            onChange={handlePrecioChange}
          />
          <InputNumber
            name={"Volumen por hectárea"}
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
        <div className="mt-4 bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 shadow-inner flex flex-wrap gap-x-4 gap-y-2">
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
      <div>
        <DeleteButton onDelete={handleDeleteProducto} />
      </div>
    </div>
  );
}