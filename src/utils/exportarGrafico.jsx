import { toPng } from 'html-to-image';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import PDFDocument from "../components/CostosPDF/CostosPDF"

const exportarGrafico = async (chartRef, { maquinariaPlans = [], sanitizantePlans = [], fertilizacionPlans = [] , valorDolar,estadoFenologico, valorGasoil } = {} ) => {
    if(!chartRef.current) return;

    try {
        const imageData = await toPng(chartRef.current);

        const blob = await pdf(
        <PDFDocument
          imageChartData={imageData}
          maquinariaPlans={maquinariaPlans}
          sanitizantePlans={sanitizantePlans}
          fertilizacionPlans={fertilizacionPlans}
          valorDolar={valorDolar}
          estadoFenologico={estadoFenologico}
          valorGasoil={valorGasoil}
        />
        ).toBlob();

        let nombreArchivo = '';

        if (maquinariaPlans.length > 0) {
            nombreArchivo = 'Costo Maquinaria - INTA.pdf';
        } else if (fertilizacionPlans.length > 0) {
            nombreArchivo = 'Costo Fertilizante - INTA.pdf';
        } else if (sanitizantePlans.length > 0) {
            nombreArchivo = 'Costo Sanidad - INTA.pdf';
        } else {
            nombreArchivo = 'Costos - INTA.pdf';
        }

        saveAs(blob, nombreArchivo);
    } catch (err) {
        console.error ('Error al generar el PDF:', err);
    }
}
export default exportarGrafico;