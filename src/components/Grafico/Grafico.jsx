import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function Grafico({ title, data }) {

  return (
    <div className="w-full h-96 p-4 bg-white rounded-lg shadow-md pb-16">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#00824d" shape={<Rectangle radius={8} />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
