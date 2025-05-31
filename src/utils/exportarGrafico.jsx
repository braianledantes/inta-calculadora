import { toPng } from 'html-to-image';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import PDFDocument from "../components/CostosPDF/CostosPDF"

const exportarGrafico = async (chartRef) => {
    if(!chartRef.current) return;

    try {
        const imageData = await toPng(chartRef.current);

        const blob = await pdf(<PDFDocument imageChartData={imageData} />).toBlob();

        saveAs(blob, 'Costos.pdf');
    } catch (err) {
        console.error ('Error al generar el PDF:', err);
    }
}
export default exportarGrafico;