import { View, Text, Image } from '@react-pdf/renderer';
import sipan from '../../assets/sipanPDF.png'; 
import styles from '../styles/pdfstyles'

const Header = ({ maquinariaPlans, sanitizantePlans, fertilizacionPlans, valorDolar, estadoFenologico, valorGasoil }) => {
  let titulo = 'Costos';
  let mostrarGasoil = false;
  let mostrarHeaderInfo = false;

  if (maquinariaPlans?.length) {
    titulo = 'Costos de Maquinaria';
    mostrarGasoil = true;
    mostrarHeaderInfo = true;
  } else if (sanitizantePlans?.length) {
    titulo = 'Costos de Sanidad';
    mostrarHeaderInfo = true;
  } else if (fertilizacionPlans?.length) {
    titulo = 'Costos de Fertilizante';
    mostrarHeaderInfo = true;
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Image src={sipan} style={{ width: 180, height: 40 }} />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{titulo}</Text>
      </View>

      {mostrarHeaderInfo && (
        <View style={[styles.row, styles.topInfoContainer]}>
          <Text style={styles.cell}>Dólar: {valorDolar ?? 'N/A'}</Text>
          <Text style={styles.cell}>Estado Fenológico: {estadoFenologico?.nombre ?? 'N/A'}</Text>
          {mostrarGasoil && <Text style={styles.cell}>Gasoil: {valorGasoil ?? 'N/A'}</Text>}
        </View>
      )}
    </View>
  );
};

export default Header;
