import { renderTable, safeCurrency} from '../utils/pdfUtils';
import styles from '../styles/pdfstyles';

const SanitizanteTable = ({ plans }) => (
  <>
    {plans.map((plan) =>
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
        safeCurrency(plan.costoTotalPorHectarea),
        styles.titleWithBackground
      )
    )}
  </>
);

export default SanitizanteTable;