import { View, Text, Image } from '@react-pdf/renderer';
import sipan from '../../assets/sipanPDF.png'; 
import styles from '../styles/pdfstyles'

const Header = ({ maquinariaPlans, sanitizantePlans, fertilizacionPlans, valorDolar, valorGasoil }) => {
  let titulo = 'Costos';
  let mostrarGasoil = false;
  let mostrarHeaderInfo = false;

  if (maquinariaPlans?.length) {
    titulo = 'Costos de Maquinaria';
    mostrarGasoil = true;
    mostrarHeaderInfo = true;
  } else if (sanitizantePlans?.length) {
    titulo = 'Costos de Planes Sanitarios';
    mostrarHeaderInfo = true;
  } else if (fertilizacionPlans?.length) {
    titulo = 'Costos de Fertilizante';
    mostrarHeaderInfo = true;
  }

  const fechaHoy = new Date().toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Image src={sipan} style={{ width: 180, height: 40 }} />
        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{titulo}</Text>
          <Text style={{ fontSize: 10, color: 'gray', marginTop: 2 , textAlign: 'right'}}>
            Fecha: {fechaHoy}
          </Text>
        </View>
      </View>

      {mostrarHeaderInfo && (
        <View style={[styles.row, styles.topInfoContainer,  {marginTop: 15 }]}>
          <Text style={styles.cell}>Valor del Dólar: {valorDolar ?? 'N/A'}</Text>
          {mostrarGasoil && <Text style={styles.cell}>Valor del Gasoil: {valorGasoil ?? 'N/A'}</Text>}
        </View>
      )}
    </View>
  );
};

export default Header;

