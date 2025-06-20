import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function InputOptions({ label, value, options, onChange }) {
  const labelRef = useRef(null);
  const [minWidth, setMinWidth] = useState(0);

  useEffect(() => {
    if (labelRef.current) {
      const width = labelRef.current.offsetWidth;
      setMinWidth(width);
    }
  }, [label]);

  return (
    <div className="inline-block relative w-full max-w-xs sm:w-full">
      <label
        ref={labelRef}
        className="absolute -top-2 left-2 bg-white text-sm font-semibold text-gray-800 z-10 px-2 rounded-md whitespace-nowrap select-none"
      >
        {label}
      </label>
      <div
        className="relative flex items-center px-3 pr-10 py-3 border-l-4 border-green-900/50 cursor-pointer transition-all duration-200 bg-green-700/8 rounded-tr-xl rounded-br-xl"
        style={{ minWidth }}
      >
        <span className="text-base font-semibold text-green-900 truncate">
          {value || "Seleccionar..."}
        </span>
        <ChevronDown
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
          size={20}
        />
        <select
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
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
    </div>
  );
}
