'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function MonthlyChart({ transactions = [] }) {
  const monthlyData = {};

  if (Array.isArray(transactions)) {
    transactions.forEach(({ amount, date }) => {
      const month = new Date(date).toLocaleString('default', { month: 'short' });
      if (!monthlyData[month]) monthlyData[month] = 0;
      monthlyData[month] += amount;
    });
  }

  const data = Object.keys(monthlyData).map((month) => ({
    month,
    amount: monthlyData[month],
  }));

  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
