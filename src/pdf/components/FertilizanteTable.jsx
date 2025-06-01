import { renderTable, safeCurrency} from '../utils/pdfUtils.jsx';
import styles from '../styles/pdfstyles';

const FertilizacionTable = ({ plans }) => (
  <>
    {plans.map((plan) =>
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
        safeCurrency(plan.costoTotalPorHectarea),
        styles.titleWithBackground
      )
    )}
  </>
);

export default FertilizacionTable;