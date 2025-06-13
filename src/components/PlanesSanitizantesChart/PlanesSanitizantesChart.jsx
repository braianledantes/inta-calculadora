import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Función para generar colores únicos en HSL
function generarColor(index) {
  const hue = (index * 137.508) % 360;
  return `hsl(${hue}, 65%, 60%)`;
}

// Tooltip personalizado
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  const tratamientos = {};

  payload.forEach(({ dataKey, value }) => {
    if (dataKey === 'totalPlan') return;

    const match = dataKey.match(/(.+?) T(\d+)/);
    if (match) {
      const nombre = match[1];
      const tratamientoNum = match[2];
      if (!tratamientos[tratamientoNum]) {
        tratamientos[tratamientoNum] = [];
      }
      tratamientos[tratamientoNum].push(`${nombre} ($${value.toFixed(2)})`);
    }
  });

  return (
    <div className="bg-white border border-gray-300 p-3 rounded shadow text-sm text-gray-800 max-w-xs">
      <strong className="block mb-1"> Plan Fitosanitario {label.replace(/plan\s*/i, '')}</strong>
      {Object.entries(tratamientos).map(([tratNum, productos]) => (
        <div key={tratNum}>
          <strong>Tratamiento {tratNum}</strong> {productos.join(', ')}
        </div>
      ))}
    </div>
  );
};

// Transforma los planes en datos para el gráfico
const transformarDatos = (planes) => {
  const data = [];
  const clavesSet = new Set();

  planes.forEach((plan) => {
    const row = {
      name: plan.name,
      totalPlan: plan.total
    };

    plan.tratamientos.forEach((tratamiento, tIndex) => {
      tratamiento.productos.forEach((producto) => {
        const nombre = producto.sanitizante?.nombre || `Producto ${producto.id}`;
        const clave = `${nombre} T${tIndex + 1}`;
        row[clave] = producto.costoTotalPorHectarea || 0;
        clavesSet.add(clave);
      });
    });

    data.push(row);
  });

  const clavesProductos = [...clavesSet];

  const mapaColores = {};
  clavesProductos.forEach((clave, i) => {
    mapaColores[clave] = generarColor(i);
  });

  return { data, clavesProductos, mapaColores };
};

export default function PlanesSanitizantesChart({ planes = [] }) {
  if (planes.length === 0) {
    return (
      <div className="w-full h-96 p-4 bg-white rounded-xl shadow-md pb-12 border border-gray-200 flex items-center justify-center">
        <p className="text-gray-500 text-center">No hay planes disponibles para mostrar.</p>
      </div>
    );
  }

  const { data, clavesProductos, mapaColores } = transformarDatos(planes);

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Costos de Plan Fitosanitario
      </h3>
      <ResponsiveContainer height={500}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Barras de productos por tratamiento */}
          {clavesProductos.map((clave) => {
            const stackId = clave.split(' T')[1] || 'tratamiento';
            return (
              <Bar
                key={clave}
                dataKey={clave}
                stackId={`tratamiento-${stackId}`}
                fill={mapaColores[clave]}
              />
            );
          })}

          {/* Barra total por plan (no apilada) */}
          <Bar dataKey="totalPlan" fill="#2563eb" name="Total del plan" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

