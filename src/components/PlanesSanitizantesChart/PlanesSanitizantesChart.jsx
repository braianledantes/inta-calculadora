import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

/*
const planes = [
  {
    id: 1,
    name: "Plan 1",
    total: 0,
    tratamientos: [
      {
        id: 1,
        fecha: "2023-10-01",
        total: 0,
        productos: [
          {
            id: 1,
            sanitizante: {
              numero: 1,
              nombre: "ACEITE MINERAL",
              precioEnvaseDolar: 2.80,
              volumenEnvase: 1,
              unidadVolumenEnvase: "lt",
              dosisAplicacion: 1,
              unidadDosisAplicacion: "lt",
              tipo: "plaguicida",
            },
            precio: 2.80,
            dosisPorHectarea: 1,
            volumenPorHectarea: 1,
            cantidadPorHectarea: 1,
            costoTotalPorHectarea: 2.80,
          }
        ]
      }
    ]
  }
]
*/

export default function PlanesSanitizantesChart({ planes = [] }) {
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
          data={planes}
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
          <Bar dataKey="total" fill="#529949" name="Total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
