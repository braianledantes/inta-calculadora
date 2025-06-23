import {FileText} from 'lucide-react';

export default function ButtonExportPdf({ onExport }) {
  return (
    <button
      onClick={onExport}
      className="relative mx-auto px-8 py-3 mt-10 rounded-full bg-gradient-to-r from-[#c95a1f] via-[#d87431] to-[#f09550] text-white uppercase font-semibold text-sm flex items-center gap-3 overflow-hidden transition duration-300 hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#c95a1f]/50"
      aria-label="Descargar y exportar PDF"
    >
      <FileText className="w-6 h-6 text-white drop-shadow-md" />

      <span className="relative z-10">Descargar en formato PDF</span>

      <span
        className="absolute top-0 left-[-75%] w-20 h-full bg-white opacity-20 rotate-12 blur-xl animate-shimmer pointer-events-none z-20"
      />
    </button>
  );
}
