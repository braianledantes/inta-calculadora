import { useEffect, useState } from "react";
import { CircleDollarSign } from "lucide-react";
import { getDolar } from "../../api/dolar";

const OPTIONS = [
  { label: "Manual", value: "manual" },
  { label: "Dólar Oficial", value: "oficial" },
  { label: "Dólar Tarjeta", value: "tarjeta" },
];

export default function InputDolar({ value, onChange }) {

  const [precioAutomatico, setPrecioAutomatico] = useState({ oficial: 0, tarjeta: 0 });
  const [modo, setModo] = useState("manual");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDolar()
      .then((precios) => {
        setPrecioAutomatico(precios || { oficial: 0, tarjeta: 0 });
      })
      .finally(() => setLoading(false));
  }, []);


  // Cambia el modo y actualiza valor si es automático
  
  const handleModoChange = (e) => {
    setModo(e.target.value);
    if (e.target.value === "oficial") 
      onChange(precioAutomatico.oficial);
    else if (e.target.value === "tarjeta")
       onChange(precioAutomatico.tarjeta);
  };

  const handleInputChange = (e) => {
    const valor = parseFloat(e.target.value);
    if (!isNaN(valor)) {
      onChange(valor);
    }
  };

  // Valor a mostrar en el input (editable solo si modo manual)
  const inputValue = modo === "manual" ? value : (precioAutomatico[modo] || 0 );

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 shadow-lg rounded-xl p-5 w-[260px] border border-green-200 h-[180px] flex flex-col justify-center items-center gap-3">
      <label className="text-base font-semibold text-green-800 mb-2 flex items-center gap-2">
        <CircleDollarSign className="text-2xl"/>
        Valor del Gasoil
      </label>

      <select
        value={modo}
        onChange={handleModoChange}
        className="w-full p-2 border-2 border-green-300 rounded-lg text-green-900 font-bold bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        disabled={loading}
      >
        {OPTIONS.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}

      </select>

      <div className="flex items-center gap-3">
        <span className="text-green-700 font-semibold text-lg">ARS</span>

        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          min="0"
          disabled={modo !== "manual"}
          className={`w-32 p-2 border-2 rounded-lg text-right font-bold bg-white focus:outline-none transition
            ${
              modo === "manual"
                ? "border-green-300 text-green-900 focus:ring-2 focus:ring-green-400"
                : "border-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        />
      </div>

      {loading && <p className="text-green-600 text-sm">Cargando cotizaciones...</p>}
    </div>
  );
}