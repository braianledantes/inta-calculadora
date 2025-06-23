import {Document, Image, Page} from '@react-pdf/renderer';
import Header from './components/Header';
import Maquinaria from './components/MaquinariaTable';
import Sanitizante from './components/SanitizanteTable';
import Fertilizacion from './components/FertilizanteTable';
import {renderTable, safeCurrency} from './utils/pdfUtils';
import styles from './styles/pdfstyles';

const PDFDocument = ({
  maquinariaPlans = [],
  sanitizantePlans = [],
  fertilizacionPlans = [],
  valorDolar,
  valorGasoil,
  imageChartData,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Header
        maquinariaPlans={maquinariaPlans}
        sanitizantePlans={sanitizantePlans}
        fertilizacionPlans={fertilizacionPlans}
        valorDolar={valorDolar}
        valorGasoil={valorGasoil}
      />

      {maquinariaPlans.length > 0 && (
        <Maquinaria plans={maquinariaPlans} renderTable={renderTable} safeCurrency={safeCurrency} styles={styles} />
      )}

      {sanitizantePlans.length > 0 && (
        <Sanitizante plans={sanitizantePlans} renderTable={renderTable} safeCurrency={safeCurrency} styles={styles} />
      )}

      {fertilizacionPlans.length > 0 && (
        <Fertilizacion plans={fertilizacionPlans} renderTable={renderTable} safeCurrency={safeCurrency} styles={styles} />
      )}

      {imageChartData && <Image src={imageChartData} style={styles.image} />}
    </Page>
  </Document>
);

export default PDFDocument;
