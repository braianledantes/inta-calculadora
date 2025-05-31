export default function InputOptions({label, value,  options, onChange}) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <select className="w-full p-2 border border-gray-300 rounded-md hover:cursor-pointer" value={value} onChange={onChange}>
        {options.map((o, key) => (
          <option key={key} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}