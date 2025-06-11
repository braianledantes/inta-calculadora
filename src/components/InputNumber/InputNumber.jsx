export default function InputNumber({ name, value, unit = "", onChange }) {
  
  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    onChange(newValue);
  };

  // Mostrar el valor redondeado a dos decimales si los tuviera
  let displayValue = value === "" || isNaN(value) ? "" : value;
  if (typeof displayValue === "number" && !Number.isInteger(displayValue)) {
    displayValue = displayValue.toFixed(2);
  }

  const showError = value === "" || value === undefined || value === null || isNaN(value);

  return (
    <div className="block text-sm font-medium">
      <label className="flex">
        {name}
      </label>
      <div className="relative w-full">
        <input
          className={`w-full p-2 border-2 ${showError ? 'border-red-500' : 'border-blue-300 focus:border-blue-500'} rounded-md focus:outline-none${unit ? " pr-10" : ""}`}
          type="number"
          value={displayValue}
          onChange={handleChange}
          min="0"
          placeholder="Ingrese un valor"
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none select-none">
            {unit}
          </span>
        )}
        {showError && (
          <span className="text-red-500 text-xs absolute left-0 -bottom-5">Se requiere un valor</span>
        )}
      </div>
    </div>
  );
}