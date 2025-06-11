import {CircleDollarSign, RefreshCcw} from "lucide-react";

export default function InputDolar({ value, onChange, onRefresh }) {
  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 shadow-lg rounded-xl p-5 w-[260px] border border-green-200 h-[160px] flex justify-center items-center">
      <div>
        <label className="text-base font-semibold text-green-800 mb-3 flex items-center gap-2 p-1">
          <CircleDollarSign className="text-2xl"/>
          Valor del Dólar
        </label>
        
        <div className="flex items-center gap-3">
          
          <span className="text-green-700 font-semibold text-lg">US$</span>
          <input
            type="number"
            value={value}
            onChange={handleChange}
            min="0"
            className="w-32 p-2 border-2 border-green-300 rounded-lg text-right text-green-900 font-bold bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />


          <button
            type="button"
            onClick={onRefresh}
            className="flex items-center justify-center p-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow transition-colors"
            title="Sincronizar valor del dólar"
          >
            <RefreshCcw size={20} />
          </button>

        </div>
      </div>
    </div>
  );
}