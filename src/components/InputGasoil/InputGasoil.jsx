
import { Fuel } from "lucide-react";

export default function InputGasoil({ gasoil, listaGasoil, onChangeGasoil }) {

  const { tipo, valor } = gasoil;

  const handleOnChangeGasoil = (e) => {
  const newGasoil = { ...gasoil, valor: parseFloat(e.target.value) || 0 };
    onChangeGasoil(newGasoil);
  }

  const handleChangeTipo = (e) => {
    const newTipo = e.target.value;
    const newGasoil = listaGasoil.find(d => d.tipo === newTipo) || { tipo: newTipo, valor: 0 };
    onChangeGasoil(newGasoil);
  }


  return (
    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg rounded-xl p-5 w-sm border border-yellow-200 flex flex-col justify-center items-center gap-3">
      <label className="text-base font-semibold text-yellow-800 flex items-center gap-2">
        <Fuel className="text-yellow-700" size={24} />
        Valor del Gasoil
      </label>

      <div className="w-full flex justify-between items-center gap-2">
        <select
          value={tipo}
          onChange={handleChangeTipo}
          className="w-1/2 p-2 border-2 border-yellow-300 rounded-lg text-yellow-900 font-bold bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        >
          {listaGasoil.map((g) => (
            <option key={g.tipo} value={g.tipo}>
              {g.tipo}
            </option>
          ))}
        </select>

        {/* Contenedor relative para el input con texto dentro */}
        <div className="relative w-1/2">
          <input
            type="number"
            value={valor}
            onChange={handleOnChangeGasoil}
            min="0"
            disabled={tipo !== "manual"}
            className={`w-full p-2 pr-12 border-2 rounded-lg text-right font-bold bg-white focus:outline-none transition
              ${
                tipo === "manual"
                  ? "border-yellow-300 text-yellow-900 focus:ring-2 focus:ring-yellow-400"
                  : "border-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-700 font-semibold text-sm pointer-events-none">
            ARS
          </span>
        </div>
      </div>
    </div>
  );
}



