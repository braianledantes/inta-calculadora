import {View} from '@react-pdf/renderer';
import {renderTable, safeCurrency} from '../utils/pdfUtils';
import styles from '../styles/pdfstyles';

const MaquinariaTable = ({ plans }) => (
  <>
    {plans.map((plan) => (
      <View key={plan.id}>
        {renderTable(
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
          null,
          styles.titleWithBackground
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
            { header: 'Combustible', value: safeCurrency(plan.gastoCombustibleImplemento) },
            { header: 'Amortización', value: safeCurrency(plan.amortizacionImplemento) },
            { header: 'Conservación', value: safeCurrency(plan.gastoConservacionImplemento) }
          ],
          safeCurrency(plan.costoEconomico),
          styles.smallTitle
        )}
      </View>
    ))}
  </>
);

export default MaquinariaTable;