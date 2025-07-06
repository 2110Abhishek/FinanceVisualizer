'use client';
import { useEffect, useState } from 'react';

import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyChart from '@/components/MonthlyChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import DashboardCards from '@/components/DashboardCards';

import BudgetForm from '@/components/BudgetForm';
import BudgetComparisonChart from '@/components/BudgetComparisonChart';
import BudgetInsights from '@/components/BudgetInsights';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await fetch('/api/budgets');
      const data = await res.json();
      setBudgets(data);
    } catch (error) {
      console.error("Failed to fetch budgets:", error);
    }
  };

  const addTransaction = async (form) => {
    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    fetchTransactions();
  };

  const deleteTransaction = async (id) => {
    await fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
    });
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>💰 Personal Finance Dashboard</h1>

      {/* Transaction Form */}
      <TransactionForm onSubmit={addTransaction} />

      {/* Dashboard Cards */}
      <DashboardCards transactions={transactions} />

      {/* Charts */}
      <MonthlyChart transactions={transactions} />
      <CategoryPieChart transactions={transactions} />

      {/* Budgeting */}
      <h2 style={{ marginTop: '40px' }}>📊 Budget Management</h2>
      <BudgetForm onBudgetSet={fetchBudgets} />
      <BudgetComparisonChart transactions={transactions} budgets={budgets} />
      <BudgetInsights transactions={transactions} budgets={budgets} />

      {/* Transaction List */}
      <TransactionList data={transactions} onDelete={deleteTransaction} />
    </div>
  );
}
