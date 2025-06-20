import {Text, View} from '@react-pdf/renderer';
import styles from '../styles/pdfstyles';
import {Buffer} from 'buffer';

window.Buffer = Buffer;


export function safeCurrency(value) {
  if (value === null || value === undefined || isNaN(value)) return '0 US$';
  return `${value.toFixed(2)} US$`;
}

export const renderTable = (title, headers, rows, summaryRow = null, totalCost = null, titleStyle) => (
  <View style={styles.section}>
    <Text style={titleStyle}>{title}</Text>
    <View style={[styles.row, { fontWeight: 'bold' }]}>
      {headers.map((header, i) => (
        <Text key={i} style={styles.cell}>{header}</Text>
      ))}
    </View>
    {rows.map((row, i) => (
      <View key={i} style={styles.row}>
        {row.map((cell, j) => (
          <Text key={j} style={styles.cell}>{cell}</Text>
        ))}
      </View>
    ))}
    {summaryRow && (
      <View style={styles.row}>
        {summaryRow.map((item, i) => (
          <Text key={i} style={styles.cell}>{item.header}: {item.value}</Text>
        ))}
      </View>
    )}
    {totalCost !== null && (
      <View style={styles.row}>
        <Text style={[styles.cell, { flex: 6, backgroundColor: '#f0f0f0' }]}></Text>
        <Text style={[styles.cellTotal, { flex: 4 }]}>Costo total: {totalCost}</Text>
      </View>
    )}
  </View>
);