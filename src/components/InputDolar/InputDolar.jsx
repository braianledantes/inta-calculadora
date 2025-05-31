import {RefreshCcw} from "lucide-react";

export default function InputDolar({ value, onChange, onRefresh }) {

        const handleChange = (event) => {
          const newValue = parseFloat(event.target.value);
          if (!isNaN(newValue)) {
            onChange(newValue);
          }
        }

        return (
          <div className="bg-white shadow-md rounded-lg p-4 w-fit">
            <label className="block text-sm font-medium text-gray-700 mb-2">💵 Valor del Dólar</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={value}
                onChange={handleChange}
                min="0"
                className="w-28 p-2 border border-gray-300 rounded-md text-right"
              />
              <span className="text-gray-600 font-medium">US$</span>
              <button
                type="button"
                onClick={onRefresh}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                title="Sincronizar valor del dólar"
              >
                <RefreshCcw />
              </button>
            </div>
          </div>
        );
      }