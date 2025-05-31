export default function ButtonExportPdf({onExport}) {
  return (
    <button className="block mx-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-sm mb-20"
            onClick={onExport}>
      Descargar/ Exportar PDF 
    </button>
  );
}