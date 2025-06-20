import { View, Text} from '@react-pdf/renderer';
import { renderTable, safeCurrency} from '../utils/pdfUtils';
import styles from '../styles/pdfstyles';

const MaquinariaTable = ({ plans }) => (
  <>
    {plans.map((plan) => (
      <View key={plan.id}>
        <Text style={styles.titleWithBackground}>
          Plan Maquinaria {plan.id}
        </Text>
        {renderTable(
          `${plan.tractor.nombre} (Potencia ${plan.tractor.potencia} HP)`,
          [ 'Precio', 'Coef. Conservacion', 'Horas Utiles', 'Valor Residual'],
          [[
            `${plan.tractor.precioDolar} US$`,
            plan.tractor.gastoMantenimiento,
            `${plan.tractor.horasVidaUtil} h`,
            `${plan.tractor.porcentajeValorResidual} %`
          ]],
          [
            { header: 'Amortización', value: safeCurrency(plan.amortizacionTractor) },
            { header: 'Conservación', value: safeCurrency(plan.gastoConservacionTractor) }
          ],
          null,
          styles.SubtitleWithBackground
        )}

        {renderTable(
          `Implemento ${plan.implemento.nombre}`,
          ['Consumo', 'Precio', 'Coef. Conservacion', 'Horas Utiles', 'Valor residual'],
          [[
            `${plan.implemento.consumoCombustible} lt/h`,
            `${plan.implemento.precioDolar} US$`,
            plan.implemento.gastoMantenimiento,
            `${plan.implemento.horasVidaUtil} h`,
            `${plan.implemento.porcentajeValorResidual} %`
          ]],
          [
            { header: 'Combustible', value: safeCurrency(plan.costoCombustibleImplemento) },
            { header: 'Amortización', value: safeCurrency(plan.amortizacionImplemento) },
            { header: 'Conservación', value: safeCurrency(plan.gastoConservacionImplemento) }
          ],
          safeCurrency(plan.costoEconomico),
          styles.SubtitleWithBackground
        )}
      </View>
    ))}
  </>
);

export default MaquinariaTable;