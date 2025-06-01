export default function NumberValue({name, value, unit = "" }) {
  return (
    <div className="">
      <label className="block text-sm font-medium">{name}</label>
      <input value={`${value} ${unit}`}
             className="w-full p-2 border border-gray-300 rounded-md hover:cursor-default focus:outline-none"
             readOnly
             tabIndex={-1}
      />
    </div>
  );
}