export default function InputNumber({ name, value, unit = "", onChange }) {
  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    onChange(newValue);
  };

  return (
    <div className="block text-sm font-medium">
      <label className="flex">
        {name}
      </label>
      <div className="relative w-full">
        <input
          className={`w-full p-2 border-2 border-blue-300 focus:border-blue-500 rounded-md text-right focus:outline-none${
            unit ? " pr-10" : ""
          }`}
          type="number"
          value={value === 0 ? "" : value}
          onChange={handleChange}
          min="0"
          step="1"
          placeholder="Ingrese un valor"
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