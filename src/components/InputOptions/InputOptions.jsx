export default function InputOptions({label, value,  options, onChange}) {
  return (
    <div>
      <label className="flex font-semibold">
        {label}
      </label>
      <select
        className="bg-blue-100 p-2 border rounded-md w-full"
        value={value}
        onChange={onChange}
      >
        {options.map((o, key) => (
          <option key={key} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}