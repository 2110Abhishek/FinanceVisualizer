'use client';
import { Card } from "@/components/ui/card";

export default function BudgetInsights({ transactions = [], budgets = [] }) {
  const categoryTotals = {};

  if (Array.isArray(transactions)) {
    transactions.forEach(({ amount, category }) => {
      categoryTotals[category] = (categoryTotals[category] || 0) + amount;
    });
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-3">💡 Budget Insights</h3>
      <ul className="space-y-2 text-sm">
        {Array.isArray(budgets) && budgets.map((b) => {
          const spent = categoryTotals[b.category] || 0;
          return (
            <li key={b.category}>
              <span className="font-medium">{b.category}:</span>{" "}
              {spent > b.amount ? (
                <span className="text-red-500">Overspent by ₹{spent - b.amount}</span>
              ) : (
                <span className="text-green-600">Within budget (₹{spent}/{b.amount})</span>
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
