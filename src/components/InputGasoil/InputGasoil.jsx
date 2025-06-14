import { useEffect, useState } from "react";
import { Fuel } from "lucide-react";
import { getGasoil } from "../../api/gasoil"; // ajusta la ruta

const OPTIONS = [
  { label: "Manual", value: "manual" },
  { label: "Gasoil Grado 2", value: "grado2" },
  { label: "Gasoil Grado 3", value: "grado3" },
];

export default function InputGasoil({ value, onChange }) {

  const [precioAutomatico, setPrecioAutomatico] = useState({ grado2: 0, grado3: 0 });

  const [modo, setModo] = useState("manual"); 

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getGasoil()
      .then((precios) => {
        setPrecioAutomatico(precios || { grado2: 0, grado3: 0 });
      })
      .finally(() => setLoading(false));
  }, []);

  // Cambia el modo y actualiza valor si es automático
  const handleModoChange = (e) => {
    const nuevoModo = e.target.value;
    setModo(nuevoModo);
    if (nuevoModo === "grado2") onChange(precioAutomatico.grado2);
    else if (nuevoModo === "grado3") onChange(precioAutomatico.grado3);
  };

  const handleInputChange = (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      onChange(val);
    }
  };

  // Valor a mostrar en el input (editable solo si modo manual)
  const inputValue = modo === "manual" ? value : (precioAutomatico[modo] || 0);

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg rounded-xl p-5 w-[260px] border border-yellow-200 h-[180px] flex flex-col justify-center items-center gap-3">
      <label className="text-base font-semibold text-yellow-800 mb-2 flex items-center gap-2">
        <Fuel className="text-yellow-700" size={24} />
        Valor del Gasoil
      </label>

      <select
        value={modo}
        onChange={handleModoChange}
        className="w-full p-2 border-2 border-yellow-300 rounded-lg text-yellow-900 font-bold bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        disabled={loading}
      >
        {OPTIONS.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-3">
        <span className="text-yellow-700 font-semibold text-lg">ARS</span>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          min="0"
          disabled={modo !== "manual"}
          className={`w-32 p-2 border-2 rounded-lg text-right font-bold bg-white focus:outline-none transition
            ${
              modo === "manual"
                ? "border-yellow-300 text-yellow-900 focus:ring-2 focus:ring-yellow-400"
                : "border-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        />
      </div>

      {loading && <p className="text-yellow-600 text-sm">Cargando precios automáticos...</p>}

    </div>
  );
}
