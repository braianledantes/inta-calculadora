export default function InputGasoil({value, onChange}) {

  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">⛽ Valor del Gasoil</label>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min="0"
        className="w-32 p-2 border border-gray-300 rounded-md"
      />{' '}
      ARS
    </div>
  );
}