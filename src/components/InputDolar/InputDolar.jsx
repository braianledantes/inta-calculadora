import {RefreshCw} from "lucide-react";

export default function InputDolar({ value, onChange, onRefresh }) {

  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  }

  return (
    <div className="flex gap-1 border rounded bg-yellow-100 text-yellow-800">
      <label className="p-2 font-semibold text-yellow-800 border-r-1 border-yellow-800 w-full text-right">
        Valor del Dólar
      </label>
      <label className="p-2">
        US$
      </label>
      <input
        className="flex w-full p-2 bg-yellow-100 text-yellow-800 self-start"
        type="number"
        value={value}
        onChange={handleChange}
        min="0"
        step="1"
      />
      <button
        className="p-2 bg-yellow-800 text-white hover:bg-yellow-700 hover:cursor-pointer"
        onClick={onRefresh}
      >
        <RefreshCw />
      </button>
    </div>
  );
}