import InputOptions from "../InputOptions/InputOptions.jsx";
import {DEFAULT_ESTADO_FENOLOGICO} from "../../data/local.js";

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
    <div className="bg-white shadow-md rounded-lg p-4 w-fit">
      <InputOptions
        label={label}
        value={estadoSeleccionado?.nombre || ""}
        options={options}
        onChange={handleChange}
      />
      {estadoSeleccionado && (
        <div className="mt-2 text-sm text-gray-600 italic">
          {estadoSeleccionado.descripcion}
        </div>
      )}
    </div>
  );
}