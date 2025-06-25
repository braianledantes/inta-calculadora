import {Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

export default function PlanesFertilizantesChart({ planes = [] }) {
  const formattedPlanes = planes.map(p => ({
    name: `Plan ${p.id}`,
    costoTotalPorTratamiento: p.costoTotalPorTratamiento,
    total: p.costoTotalPorHectarea,
  }));

  if (planes.length === 0) {
    return (
      <div className="w-full h-96 p-4 bg-white rounded-xl shadow-md pb-12 border border-gray-200 flex items-center justify-center">
        <p className="text-gray-500 text-center">No hay planes disponibles para mostrar.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] sm:h-96 sm:p-4 bg-white rounded-xl shadow-md pb-12 border border-gray-200">
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
          <Bar dataKey="costoTotalPorTratamiento" fill="#f97316" name="Costo Total por Tratamiento" />
          <Bar dataKey="total" fill="#529949" name="Costo Total por Hectárea" activeBar={<Rectangle fill="#529949" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
