import { 
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList
} from 'recharts';

export default function Grafico({ title, data }) {
  return (
    <div className="w-full h-96 p-4 bg-white rounded-xl shadow-md pb-12 border border-gray-200 ">

      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap={25}>
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
          <Tooltip
            contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8 }}
            itemStyle={{ color: '#374151' }}
            labelStyle={{ color: '#6b7280' }}
          />
          <Legend wrapperStyle={{ color: '#6b7280', fontSize: 22 }} />
          <Bar
            dataKey="total"
            fill="#354b5e"
            radius={[6, 6, 0, 0]}
            shape={<Rectangle radius={6} />}
            animationDuration={600}
            animationEasing="ease-in-out"
          >
            <LabelList
              dataKey="total"
              position="top"
              fill="#354b5e"
              fontSize={12}
              formatter={(value) => `${value}`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}