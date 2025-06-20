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
  const [modo, setModo] = useState("oficial");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDolar()
      .then((precios) => {
        setPrecioAutomatico(precios || { oficial: 0, tarjeta: 0 });
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (modo !== "manual") {
      const nuevoValor = precioAutomatico[modo];
      if (
        typeof nuevoValor === "number" &&
        !isNaN(nuevoValor) &&
        nuevoValor !== value
      ) {
        onChange(nuevoValor);
      } else if ((nuevoValor === undefined || isNaN(nuevoValor)) && value !== 0) {
        onChange(0);
      }
    }
  }, [precioAutomatico, modo, onChange, value]);

  const handleModoChange = (e) => {
    const nuevoModo = e.target.value;
    setModo(nuevoModo);
    if (nuevoModo !== "manual") {
      const nuevoValor = precioAutomatico[nuevoModo];
      if (
        typeof nuevoValor === "number" &&
        !isNaN(nuevoValor) &&
        nuevoValor !== value
      ) {
        onChange(nuevoValor);
      } else if ((nuevoValor === undefined || isNaN(nuevoValor)) && value !== 0) {
        onChange(0);
      }
    }
  };

  const handleInputChange = (e) => {
    const valor = parseFloat(e.target.value);
    if (!isNaN(valor) && valor !== value) {
      onChange(valor);
    } else if (isNaN(valor) && value !== 0) {
      onChange(0);
    }
  };

  const inputValue = modo === "manual" ? value : precioAutomatico[modo] || 0;

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 shadow-lg rounded-xl p-5 w-sm border border-green-200 flex flex-col justify-center items-center gap-3">
      <label className="text-base font-semibold text-green-800 flex items-center gap-2">
        <CircleDollarSign className="text-green-700" size={24} />
        Valor del Dólar
      </label>

      <div className="w-full flex justify-between items-center gap-2">
        <select
          value={modo}
          onChange={handleModoChange}
          className="w-1/2 p-2 border-2 border-green-300 rounded-lg text-green-900 font-bold bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          disabled={loading}
        >
          {OPTIONS.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        {/* Contenedor relativo para input con texto "ARS" dentro */}
        <div className="relative w-1/2">
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            min="0"
            disabled={modo !== "manual"}
            className={`w-full p-2 pr-12 border-2 rounded-lg text-right font-bold bg-white focus:outline-none transition
              ${
                modo === "manual"
                  ? "border-green-300 text-green-900 focus:ring-2 focus:ring-green-400"
                  : "border-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-700 font-semibold text-sm pointer-events-none">
            ARS
          </span>
        </div>
      </div>

      {loading && <p className="text-green-600 text-sm mt-1">Cargando cotizaciones...</p>}
    </div>
  );
}


