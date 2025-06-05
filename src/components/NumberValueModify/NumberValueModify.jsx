export default function NumberValueModify({ name, value, unit = "", onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium">{name}</label>
      <div className="flex items-center gap-1">
        <input
          type="number"
          value={value}
          onChange={onChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          min="0"
        />
        {unit && (
          <span className="text-sm text-gray-500">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}