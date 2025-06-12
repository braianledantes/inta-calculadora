export default function NumberValue({ name, value, unit = "" }) {
  // Mostrar el valor redondeado a dos decimales si los tuviera
  let displayValue = value === 0 || isNaN(value) ? "" : value;
  if (typeof displayValue === "number" && !Number.isInteger(displayValue)) {
    displayValue = displayValue.toFixed(2).replace(".", ",");
  }

  return (
    <div className="w-full max-w-xs select-none">
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        {name}
      </label>
      <div className="relative pointer-events-none">
        <input
          value={displayValue}
          readOnly
          tabIndex={-1}
          className="w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-xl py-2 pr-12 pl-3 text-base font-medium shadow-inner cursor-not-allowed select-none"
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-black text-sm font-semibold opacity-80 tracking-wide">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

