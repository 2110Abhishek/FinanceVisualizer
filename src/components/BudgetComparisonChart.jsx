'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function BudgetComparisonChart({ transactions, budgets }) {
  const categoryTotals = {};

  transactions.forEach(({ amount, category }) => {
    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
  });

  const data = budgets.map((b) => ({
    category: b.category,
    Budgeted: b.amount,
    Spent: categoryTotals[b.category] || 0,
  }));

  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Budgeted" fill="#8884d8" />
      <Bar dataKey="Spent" fill="#82ca9d" />
    </BarChart>
  );
}
