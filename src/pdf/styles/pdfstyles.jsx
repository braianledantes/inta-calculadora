import { StyleSheet } from '@react-pdf/renderer';

export default StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 20 },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  titleWithBackground: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    backgroundColor: '#264653',
    color: '#fff',
    padding: 6,
  },
  smallTitle: {
    fontSize: 10,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  row: { flexDirection: 'row' },
  cell: {
    flex: 1,
    fontSize: 10,
    padding: 4,
    borderWidth: 0.5,
    borderColor: '#000000',
  },
  cellTotal: {
    fontSize: 12,
    padding: 4,
    borderWidth: 0.5,
    borderColor: '#000000',
  },
  headerCell: {
    flex: 1,
    fontSize: 10,
    padding: 4,
    fontWeight: 'bold',
    borderWidth: 0.5,
    borderColor: '#000000',
    backgroundColor: '#264653',
    color: '#FFFFFF',
  },
  topInfoContainer: { marginBottom: 20 },
  image: { width: '100%', height: 200, marginBottom: 20 }
});
