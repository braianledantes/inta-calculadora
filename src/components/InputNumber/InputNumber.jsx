export default function InputNumber({ name, value, onChange }) {
  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    onChange(newValue);
  };

  return (
    <div className="block text-sm font-medium">
      <label className="flex">
        {name}
      </label>
      <input
        className="w-full p-2 border border-gray-300 rounded-md"
        type="number"
        value={value === 0 ? "" : value}
        onChange={handleChange}
        min="0"
        step="1"
        placeholder="Ingrese un valor"
      />
    </div>
  );
}