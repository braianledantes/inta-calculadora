import {Fuel} from "lucide-react";

export default function InputGasoil({ value, onChange }) {
  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg rounded-xl p-5  w-[260px] border border-yellow-200 h-[160px] flex justify-center items-center">
      <div>
        <label className="text-base font-semibold text-yellow-800 mb-3 flex items-center gap-2">
          <Fuel className="text-yellow-700" size={24} />
          Valor del Gasoil
        </label>
        <div className="flex items-center gap-3">
          <span className="text-yellow-700 font-semibold text-lg">ARS</span>
          <input
            type="number"
            value={value}
            onChange={handleChange}
            min="0"
            className="w-32 p-2 border-2 border-yellow-300 rounded-lg text-right text-yellow-900 font-bold bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>
      </div>

    </div>
  );
}