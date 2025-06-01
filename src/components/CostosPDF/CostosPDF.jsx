import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import sipan from '../../assets/sipanPDF.png';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 20 },
  title: { fontSize: 14, marginBottom: 10, fontWeight: 'bold' },
  titleWithBackground: { fontSize: 14, marginBottom: 10, fontWeight: 'bold' , backgroundColor: '#264653', color: '#fff', padding: 6,},
  smallTitle: { fontSize: 10, marginBottom: 8, fontWeight: 'bold' },
  row: { flexDirection: 'row' },
  cell: { flex: 1, fontSize: 10, padding: 4, borderWidth: 0.5, borderColor: '#000000' },
  cellTotal: {backgroundColor: '#f0f0f0', fontSize: 12, padding: 4},
  headerCell: { flex: 1, fontSize: 10, padding: 4, fontWeight: 'bold', borderWidth: 0.5, borderColor: '#000000', backgroundColor: '#264653',  color: '#FFFFFF' },
  topInfoContainer: { marginBottom: 20},
  image: { width: '100%', height: 200, marginBottom: 20 }
});
const safeCurrency = (value) => (value != null ? `${value.toLocaleString()} ARS/h` : 'N/A');

const Header = ({ maquinariaPlans, sanitizantePlans, fertilizacionPlans }) => {
  let titulo = 'Costos';

  if (maquinariaPlans?.length) {
    titulo = 'Costos de Maquinaria';
  } else if (sanitizantePlans?.length) {
    titulo = 'Costos de Sanidad';
  } else if (fertilizacionPlans?.length) {
    titulo = 'Costos de Fertilizante';
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
      <Image src={sipan} style={{ width: 180, height: 40 }} />
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{titulo}</Text>
    </View>
  );
};

const TopInfo = ({ valorDolar, estadoFenologico, valorGasoil }) => (
  <View style={[styles.row, styles.topInfoContainer]}>
    <Text style={styles.cell}>Dólar: {valorDolar ?? 'N/A'}</Text>
    <Text style={styles.cell}>
      Estado Fenológico: {estadoFenologico?.nombre ?? 'N/A'}
    </Text>
    <Text style={styles.cell}>Gasoil: {valorGasoil ?? 'N/A'}</Text>
  </View>
);

const renderTable = (title, headers, rows, summaryRow = null, totalCost = null, titleStyle = styles.title) => (
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
      <View style={[styles.row]}>
        {summaryRow.map((item, i) => (
          <Text key={i} style={styles.cell}>
            {item.header}: {item.value}
          </Text>
        ))}
      </View>
    )}

    {totalCost !== null && (
      <View style={[styles.row]}>
        <Text style={[styles.cell, { flex: 7 }]}></Text>
        <Text style={[styles.cellTotal, { flex: 3 }]}> Costo total: {totalCost}</Text>
      </View>
    )}
  </View>
); 

const PDFDocument = ({ imageChartData, maquinariaPlans = [], sanitizantePlans = [], fertilizacionPlans = [], valorDolar, estadoFenologico, valorGasoil }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Header maquinariaPlans={maquinariaPlans} sanitizantePlans={sanitizantePlans} fertilizacionPlans={fertilizacionPlans} />
      <TopInfo valorDolar={valorDolar} estadoFenologico={estadoFenologico.nombre} valorGasoil={valorGasoil} />

      {maquinariaPlans.length > 0 &&
        maquinariaPlans.map(plan =>
            <>
              {renderTable (
               `Plan Maquinaria ${plan.id}`,        
               ['Tractor', 'Potencia', 'Precio', 'Coef. Conservacion', 'Horas Utiles', 'Valor Residual'],
               [[
                  plan.tractor.nombre,
                 `${plan.tractor.potencia} HP`,
                 `${plan.tractor.precioDolar} US$`,
                  plan.tractor.gastoMantenimiento, 
                  `${plan.tractor.horasVidaUtil} h`,
                  `${plan.tractor.porcentajeValorResidual} %`
                  
               ]],
               [
                 { header: 'Amortización', value: safeCurrency(plan.amortizacionTractor) },
                 { header: 'Conservación', value: safeCurrency(plan.gastoConservacionTractor) }
               ],
               null, styles.titleWithBackground
            )}

            {renderTable(
              `Implemento ${plan.implemento.nombre}`,
                ['Consumo', 'Precio', 'Coef. Conservacion', 'Horas Utiles', 'Valor residual'],
                [[
                  `${plan.implemento.consumoCombustible} lt/h`,
                 
                  plan.implemento.gastoMantenimiento,
                  `${plan.implemento.horasVidaUtil} h`,
                  `${plan.implemento.porcentajeValorResidual} %`
                ]],
                [
                { header: 'Combustible', value: safeCurrency(plan.gastoCombustibleImplemento) },
                { header: 'Amortización', value: safeCurrency(plan.amortizacionImplemento) },
                {header: 'Conservación', value: safeCurrency(plan.gastoConservacionImplemento) },
                ],   
                safeCurrency(plan.costoEconomico), styles.smallTitle
              )}
            </>
        )}

      {sanitizantePlans.length > 0 &&
        sanitizantePlans.map(plan =>
          renderTable(
            `Plan Sanitizante ${plan.id}`,
            ['Sanitizante', 'Tipo', 'Dosis por ha', 'Volumen x ha', 'Tratamientos', 'Precio'],
            [[
              plan.sanitizante.nombre,
              plan.sanitizante.tipo,
              `${plan.sanitizante.dosisAplicacion} ${plan.sanitizante.unidadDosisAplicacion}`,
              `${plan.volumenPorHectarea} lt/ha`,
              plan.cantTratamientos,
              `${plan.sanitizante.precioEnvaseDolar} US$`,
            ]],
            [
            { header: 'Costo por tratamiento', value: safeCurrency(plan.costoTotalPorTratamiento) },
            { header: 'Costo por ha', value: safeCurrency(plan.costoTotalPorHectarea) },
            ], 
            safeCurrency(plan.costoTotalPorHectarea), styles.titleWithBackground
          )
        )}

      {fertilizacionPlans.length > 0 &&
        fertilizacionPlans.map(plan =>
          renderTable(
            `Plan Fertilización ${plan.id}`,
            ['Fertilizante','Precio',  'Dosis por ha', 'Tratamientos'],
            [[
              plan.fertilizante.nombre,
              `${plan.fertilizante.precioEnvaseDolar} US$`,
              `${plan.fertilizante.dosisAplicacion} ${plan.fertilizante.unidadDosisAplicacion}`,
              plan.cantTratamientos,
            ]],
            [
            { header: 'Costo por tratamiento', value: safeCurrency(plan.costoTotalPorTratamiento) },
            { header: 'Costo por ha', value: safeCurrency(plan.costoTotalPorHectarea) },
            ], 
            safeCurrency(plan.costoTotalPorHectarea), styles.titleWithBackground
          )
        )}

        {imageChartData && <Image src={imageChartData} style={styles.image} />}
    </Page>
  </Document>
);

export default PDFDocument;