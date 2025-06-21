import { CircleDollarSign } from "lucide-react";

// dolar = { tipo: "manual", valor: 0 }
// dolares = [{ tipo: "manual", valor: 0 }, ...]

export default function InputDolar({ dolar, dolares, onChangeDolar }) {

  const { tipo, valor } = dolar;

  const handleOnChangeDolar = (e) => {
    const newDolar = { ...dolar, valor: parseFloat(e.target.value) || 0 };
    onChangeDolar(newDolar);
  }

  const handleChangeTipo = (e) => {
    const newTipo = e.target.value;
    const newDolar = dolares.find(d => d.tipo === newTipo) || { tipo: newTipo, valor: 0 };
    onChangeDolar(newDolar);
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 shadow-lg rounded-xl p-5 w-sm border border-green-200 flex flex-col justify-center items-center gap-3">
      <label className="text-base font-semibold text-green-800 flex items-center gap-2">
        <CircleDollarSign className="text-green-700" size={24} />
        Valor del Dólar
      </label>

      <div className="w-full flex justify-between items-center gap-2">
        <select
          value={tipo}
          onChange={handleChangeTipo}
          className="w-1/2 p-2 border-2 border-green-300 rounded-lg text-green-900 font-bold bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        >
          {dolares.map((d) => (
            <option key={d.tipo} value={d.tipo}>
              {d.tipo}
            </option>
          ))}
        </select>

        {/* Contenedor relativo para input con texto "ARS" dentro */}
        <div className="relative w-1/2">
          <input
            type="number"
            value={valor}
            onChange={handleOnChangeDolar}
            min="0"
            disabled={tipo !== "manual"}
            className={`w-full p-2 pr-12 border-2 rounded-lg text-right font-bold bg-white focus:outline-none transition
              ${tipo === "manual"
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
    </div>
  );
}


