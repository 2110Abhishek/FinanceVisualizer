'use client';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#F06292', '#BDBDBD'];

export default function CategoryPieChart({ transactions = [] }) {
  const categoryData = {};

  if (Array.isArray(transactions)) {
    transactions.forEach(({ amount, category }) => {
      if (!categoryData[category]) categoryData[category] = 0;
      categoryData[category] += amount;
    });
  }

  const data = Object.entries(categoryData).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <PieChart width={400} height={300}>
      <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={100} label>
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
