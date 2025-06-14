export default function NumberValueModify({ name, value, unit = "", onChange }) {
  const showError = value === "" || value === undefined || value === null || isNaN(value);
  let displayValue = value === "" || isNaN(value) ? "" : value;
  if (typeof displayValue === "number" && !Number.isInteger(displayValue)) {
    displayValue = displayValue.toFixed(2);
  }

  return (
    <div className="w-full max-w-xs">
      <label className="block mb-1 text-sm font-semibold text-gray-800">
        {name}
      </label>

      <div className="relative">
        <input
          type="number"
          value={displayValue}
          onChange={onChange}
          min="0"
          placeholder="Ingrese un valor"
          className={`w-full bg-white text-gray-900 border ${
            showError ? "border-red-400" : "border-gray-300"
          } rounded-xl py-2 pr-12 pl-3 text-base font-medium placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700 transition`}
        />

        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-semibold pointer-events-none select-none">
            {unit}
          </span>
        )}

        {showError && (
          <span className="absolute -bottom-5 left-0 text-xs text-red-500 mt-1">
            Se requiere un valor válido
          </span>
        )}
      </div>
    </div>
  );
}
