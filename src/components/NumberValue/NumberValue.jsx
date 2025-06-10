export default function NumberValue({ name, value, unit = "" }) {
  // Mostrar el valor redondeado a dos decimales si los tuviera
  let displayValue = value === 0 || isNaN(value) ? "" : value;
  if (typeof displayValue === "number" && !Number.isInteger(displayValue)) {
    displayValue = displayValue.toFixed(2).replace(".", ",");
  }
  return (
    <div className="">
      <label className="block text-sm font-medium">{name}</label>
      <div className="relative w-full">
        <input
          value={displayValue}
          className={`w-full p-2 border border-gray-300 rounded-md hover:cursor-default focus:outline-none${unit ? ' pr-10' : ''}`}
          readOnly
          tabIndex={-1}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none select-none">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}