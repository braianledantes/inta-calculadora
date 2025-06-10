import {ChevronDown} from 'lucide-react';

export default function InputOptions({label, value,  options, onChange}) {
  return (
    <div className="lg:max-w-sm sm:max-w-sm md:max-w-md" >
      <label className="block text-sm font-medium">{label}</label>
      <div className="relative">
        <select
          className="w-full p-2 pr-8 border-2 border-blue-300 focus:border-blue-500 rounded-md hover:cursor-pointer appearance-none"
          value={value}
          onChange={onChange}
        >
          {options.map((o, key) => (
            <option key={key} value={o}>{o}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
          <ChevronDown/>
        </span>
      </div>
    </div>
  );
}