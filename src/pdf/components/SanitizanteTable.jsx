import { View, Text } from '@react-pdf/renderer';
import { renderTable, safeCurrency } from '../utils/pdfUtils';
import styles from '../styles/pdfstyles';

const SanitizanteTable = ({ plans }) => (
  <>
    {plans.map((plan) => {
      const costoTotalPlan = safeCurrency(
        plan.total ??
        plan.tratamientos?.reduce((acc, t) => acc + (t.total || 0), 0) ??
        0
      );

      return (
        <View key={`plan-${plan.id}`} style={{ marginBottom: 0 }}>
          <Text style={styles.titleWithBackground}>
            Plan Fitosanitario {plan.id}
          </Text>

          {plan.tratamientos?.map((tratamiento) => {
            const fechaFormateada = tratamiento.fecha
              ? new Date(tratamiento.fecha).toLocaleDateString()
              : '';

            return (
              <View key={`tratamiento-${tratamiento.id}`} style={{ marginBottom: 10 }}>
                <Text style={styles.SubtitleWithBackground}>
                  Tratamiento {tratamiento.id} - Fecha: {fechaFormateada}
                </Text>

                {(tratamiento.productos || []).map((producto, index) => {
                  if (!producto || !producto.sanitizante) return null;

                  const rows = [[
                    producto.sanitizante.tipo || '—',
                    producto.precio != null ? `${producto.precio} US$` : '—',
                    producto.dosisPorHectarea != null
                      ? `${producto.dosisPorHectarea} ${producto.sanitizante.unidadDosisAplicacion || ''}`.trim()
                      : '—',
                    producto.volumenPorHectarea != null
                      ? `${producto.volumenPorHectarea} ${producto.sanitizante.unidadVolumenEnvase || ''}`.trim()
                      : '—',
                    producto.cantidadPorHectarea != null
                      ? `${producto.cantidadPorHectarea}`
                      : '—',
                    producto.costoTotalPorHectarea != null
                      ? `${safeCurrency(producto.costoTotalPorHectarea)}`
                      : '—',
                  ]];

                  return (
                    <View key={`producto-${producto.sanitizante.id || index}`} style={{ marginBottom: 5}}>
                      <Text style={styles.titleProductWithBackground}>
                        {producto.sanitizante.nombre || ''}
                      </Text>
                      {renderTable(
                        '',
                        [
                          'Tipo',
                          'Precio',
                          'Dosis por ha',
                          'Volumen x ha',
                          'Cant. por ha',
                          'Costo por ha'
                        ],
                        rows,
                        null,
                        null,
                        null
                      )}
                    </View>
                  );
                })}

                {/* Total por tratamiento */}
                <View style={[styles.row, {marginTop: 0 }]}>
                  <Text style={[styles.cell, { flex: 6, backgroundColor: '#f0f0f0' }]}></Text>
                  <Text style={[styles.cellTotal, { flex: 4 }]}>Total tratamiento: {tratamiento.total}</Text>
                </View>
              </View>
            );
          })}

          {/* Total por Plan */}
          <View style={styles.row}>
            <Text style={[styles.cell, { flex: 6, backgroundColor: '#fce5cd' }]}></Text>
            <Text style={[styles.cellTotal, { flex: 4 }]}>Costo del Plan: {plan.total}</Text>
          </View>

        </View>
      );
    })}
  </>
);

export default SanitizanteTable;
