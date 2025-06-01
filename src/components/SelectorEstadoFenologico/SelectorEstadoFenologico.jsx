import InputOptions from "../InputOptions/InputOptions.jsx";
import { DEFAULT_ESTADO_FENOLOGICO } from "../../data/local.js";
import { GiPlantSeed } from "react-icons/gi";
import { Flower2, Leaf } from "lucide-react";

export default function SelectorEstadoFenologico({
  estados,
  estadoSeleccionado,
  setEstadoSeleccionado,
  label = "Estado fenológico"
}) {
  const handleChange = (e) => {
    const nombre = e.target.value;
    const estado = estados.find(est => est.nombre === nombre);
    if (estado) setEstadoSeleccionado(estado);
  };

  let options = estados.map(e => e.nombre);
  if (!estados.includes(estadoSeleccionado)) {
    options = [DEFAULT_ESTADO_FENOLOGICO.nombre, ...estados.map(e => e.nombre)]
  }

  return (
    <div className="shadow-lg rounded-xl p-5 w-fit border border-blue-200">
      
      <label className="flex items-center gap-2 text-blue-800 font-semibold mb-3 text-base rounded-xl">
        <Leaf className="text-blue-500 text-2xl drop-shadow" />
        {label}
      </label>

      <InputOptions
        value={estadoSeleccionado?.nombre || ""}
        options={options}
        onChange={handleChange}
        className="w-52 p-2 border-2 border-blue-300 rounded-lg bg-white text-blue-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      
      {estadoSeleccionado && (
        <div className="mt-3 text-blue-700 italic text-sm bg-blue-50 rounded px-2 py-1 shadow-inner border border-blue-100">
          {estadoSeleccionado.descripcion}
        </div>
      )}
    </div>
  );
}