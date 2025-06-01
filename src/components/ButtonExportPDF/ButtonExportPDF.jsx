import { FileText } from 'lucide-react';

export default function ButtonExportPdf({ onExport }) {
  return (
    <button
      className="mx-auto bg-[#c95a1f] text-white px-6 py-3 rounded-lg hover:bg-[#a94b18] hover:cursor-pointer text-sm mb-20 mt-10 uppercase transition-colors duration-200 flex items-center gap-2"
      onClick={onExport}
    >
      <FileText className="w-5 h-5" />
      Descargar / Exportar PDF
    </button>
  );
}