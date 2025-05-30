export default function InputNumber({value, onChange}) {
  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    onChange(newValue);
  };

  return (
    <input
      type="number"
      value={value}
      onChange={handleChange}
      min="0"
      step="1"
    />
  );
}