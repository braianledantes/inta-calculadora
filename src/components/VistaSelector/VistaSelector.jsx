import { AlignVerticalJustifyCenter, LayoutGrid } from "lucide-react";

export default function VistaSelector({ vista, onVistaChange }) {
  return (
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={() => onVistaChange("lista")}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition focus:outline-none ${
          vista === "lista"
            ? "border border-black text-black"
            : "border border-gray-300 text-gray-400 hover:text-black hover:border-black"
        }`}
      >
        <AlignVerticalJustifyCenter size={18} />
        Lista (1 columna)
      </button>
      <button
        onClick={() => onVistaChange("dosColumnas")}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition focus:outline-none ${
          vista === "dosColumnas"
            ? "border border-black text-black"
            : "border border-gray-300 text-gray-400 hover:text-black hover:border-black"
        }`}
      >
        <LayoutGrid size={18} />
        Dos Columnas
      </button>
    </div>
  );
}
