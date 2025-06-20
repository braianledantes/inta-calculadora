import { StyleSheet, Font } from '@react-pdf/renderer';

import montserratRegular from '../../assets/fonts/Montserrat-Regular.ttf';
import montserratBold from '../../assets/fonts/Montserrat-Bold.ttf';

Font.register({
  family: 'Montserrat',
  fonts: [
    { src: montserratRegular },
    { src: montserratBold, fontWeight: 'bold' },
  ],
});

export default StyleSheet.create({
  page: { padding: 30, fontFamily: 'Montserrat' },
  section: { marginBottom:0 },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  titleWithBackground: {
    fontSize: 14,
    marginBottom: 0,
    marginTop: 20,
    fontWeight: 'bold',
    backgroundColor: '#264653',
    color: '#fff',
    padding: 6,
    fontFamily: 'Montserrat',
  },
  SubtitleWithBackground: {
    fontSize: 10,
    marginBottom: 0,
    fontWeight: 'bold',
    backgroundColor: '#9EB8C6',
    color: '#fff',
    padding: 6,
    fontFamily: 'Montserrat',
  },
  titleProductWithBackground: {
    fontSize: 10,
    marginBottom: 0,
    fontWeight: 'bold',
    padding: 6,
    fontFamily: 'Montserrat',
    borderWidth: 0.4,
    borderColor: '#000000',
  },
  smallTitle: {
    fontSize: 10,
    marginBottom: 0,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  row: { flexDirection: 'row' },
  cell: {
    flex: 1,
    fontSize: 10,
    padding: 4,
    borderWidth: 0.4,
    borderColor: '#000000',
    fontFamily: 'Montserrat',
  },
  cellTotal: {
    fontSize: 12,
    padding: 4,
    borderWidth: 0.4,
    borderColor: '#000000',
    fontFamily: 'Montserrat',
  },
  headerCell: {
    flex: 1,
    fontSize: 10,
    padding: 4,
    fontWeight: 'bold',
    borderWidth: 0.4,
    borderColor: '#333333',
    backgroundColor: '#264653',
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
  },
  topInfoContainer: { marginBottom: 5 },
  image: {
    width: 100,
    height: 'auto',
    marginBottom: 20,
  },
});


