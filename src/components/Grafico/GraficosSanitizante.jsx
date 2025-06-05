import { useState, useEffect } from 'react';

import { 
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList
} from 'recharts';


const METRICAS = [
  { key: "total", label: "Costo total (ARS/ha)", color: "#354b5e" },
  { key: "precio", label: "Precio sanitizante", color: "#ff9800" },
  { key: "dosisPorHa", label: "Dosis por ha", color: "#4caf50" },
  { key: "volumenPorHa", label: "Volumen por ha", color: "#9c27b0" },
  { key: "cantTratamientos", label: "Cant. tratamientos", color: "#1976d2" }
];


export default function GraficoSanitizante({ title, data = [] }) {
  const [selectedKey, setSelectedKey] = useState("total");

  // Verifica que el selectedKey exista en los datos
  useEffect(() => {
    if (data.length > 0 && !data[0].hasOwnProperty(selectedKey)) {
      setSelectedKey("total"); // fallback seguro
    }
  }, [data, selectedKey]);

  const currentMetrica = METRICAS.find(m => m.key === selectedKey);

  if (!currentMetrica) return null;

  return (
    <div className="w-full h-full p-4 bg-white rounded-xl shadow-md pb-12 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>

      <div className="flex gap-2 mb-4">
        {METRICAS.map((metrica) => (
          <button
            key={metrica.key}
            onClick={() => setSelectedKey(metrica.key)}
            className={`px-3 py-1 rounded-md border text-sm ${
              selectedKey === metrica.key
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {metrica.label}
          </button>
        ))}
      </div>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barCategoryGap={50}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#d1d5db' }}
            />
            <YAxis
              stroke="#9ca3af"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#d1d5db' }}
            />
            <Tooltip />
            <Bar
              dataKey={currentMetrica.key}
              name={currentMetrica.label}
              fill={currentMetrica.color}
              shape={<Rectangle radius={6} />}
            >
              <LabelList dataKey={currentMetrica.key} position="top" fill={currentMetrica.color} fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">No hay datos disponibles.</p>
      )}
    </div>
  );
}
