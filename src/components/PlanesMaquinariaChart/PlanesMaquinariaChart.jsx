import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function PlanesMaquinariaChart({ planes = [] }) {
  const formattedPlanes = planes.map(plane => ({
    name: `Conjunto ${plane.id}`,
    amortizacionTractor: plane.amortizacionTractor || 0,
    gastoConservacionTractor: plane.gastoConservacionTractor || 0,
    amortizacionImplemento: plane.amortizacionImplemento || 0,
    gastoConservacionImplemento: plane.gastoConservacionImplemento || 0,
    costoCombustibleImplemento: plane.costoCombustibleImplemento || 0,
    costoEconomico: plane.costoEconomico || 0,
  }));

  const COLORS = {
    amortizacionTractor: "#354b5e",
    gastoConservacionTractor: "#6b7280",
    amortizacionImplemento: "#f59e0b",
    gastoConservacionImplemento: "#f97316",
    costoCombustibleImplemento: "#ef4444",
    costoEconomico: "#529949",
  };

  const CustomLegend = ({ payload }) => (
    <ul className="flex flex-wrap gap-4 mt-2 text-sm">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-2">
          <span
            className="w-3.5 h-3.5 inline-block rounded-full ml-15"
            style={{ backgroundColor: entry.color }}
          ></span>
          {entry.value}
        </li>
      ))}
    </ul>
  );

  if (planes.length === 0) {
    return (
      <div className="w-full h-96 p-4 bg-white rounded-xl shadow-md pb-12 border border-gray-200 flex items-center justify-center">
        <p className="text-gray-500 text-center">No hay planes disponibles para mostrar.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-96 p-4 bg-white rounded-xl shadow-md pb-12 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Costos de Maquinaria</h3>
      <ResponsiveContainer>
        <BarChart
          data={formattedPlanes}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend content={<CustomLegend />} />
          <Bar dataKey="amortizacionTractor" fill={COLORS.amortizacionTractor} name="Amortización Tractor" />
          <Bar dataKey="gastoConservacionTractor" fill={COLORS.gastoConservacionTractor} name="Gasto Conservación Tractor" />
          <Bar dataKey="amortizacionImplemento" fill={COLORS.amortizacionImplemento} name="Amortización Implemento" />
          <Bar dataKey="gastoConservacionImplemento" fill={COLORS.gastoConservacionImplemento} name="Gasto Conservación Implemento" />
          <Bar dataKey="costoCombustibleImplemento" fill={COLORS.costoCombustibleImplemento} name="Costo Combustible Implemento" />
          <Bar dataKey="costoEconomico" fill={COLORS.costoEconomico} name="Costo Total" activeBar={<Rectangle fill={COLORS.costoEconomico} />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
