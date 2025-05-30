export default function InputGasoil({value, onChange}) {

  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  }

  return (
    <div className="flex gap-1 border rounded bg-yellow-100 text-yellow-800">
      <label className="p-2 font-semibold text-yellow-800 border-r-1 border-yellow-800 w-full text-right">
        Valor del Gasoil
      </label>
      <label className="p-2">
        AR$
      </label>
      <input
        className="flex w-full p-2 bg-yellow-100 text-yellow-800 self-start"
        type="number"
        value={value}
        onChange={handleChange}
        min="0"
        step="1"
      />
    </div>
  );
}