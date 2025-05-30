export default function InputNumber({name, value, onChange}) {
  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    onChange(newValue);
  };

  return (
    <div>
      <label className="flex">
        {name}
      </label>
      <input className="bg-blue-100 p-2 border rounded-md w-full"
             type="number"
             value={value}
             onChange={handleChange}
             min="0"
             step="1"
      />
    </div>

  );
}