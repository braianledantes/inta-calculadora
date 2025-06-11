import {Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

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
  
  if (planes.length === 0) {
    return (
      <div className="w-full h-96 p-4 bg-white rounded-xl shadow-md pb-12 border border-gray-200 flex items-center justify-center">
        <p className="text-gray-500 text-center">No hay planes disponibles para mostrar.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-96 p-4 bg-white rounded-xl shadow-md pb-12 border border-gray-200 ">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Costos de Maquinaria</h3>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={formattedPlanes}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amortizacionTractor" fill="#354b5e" name="Amortización Tractor" />
          <Bar dataKey="gastoConservacionTractor" fill="#6b7280" name="Gasto Conservación Tractor" />
          <Bar dataKey="amortizacionImplemento" fill="#f59e0b" name="Amortización Implemento" />
          <Bar dataKey="gastoConservacionImplemento" fill="#f97316" name="Gasto Conservación Implemento" />
          <Bar dataKey="costoCombustibleImplemento" fill="#ef4444" name="Costo Combustible Implemento" />
          <Bar dataKey="costoEconomico" fill="#529949" name="Costo Total" activeBar={<Rectangle fill="#529949" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
