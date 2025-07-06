'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Other'];

export default function TransactionForm({ onSubmit }) {
  const [form, setForm] = useState({
    amount: '',
    description: '',
    date: '',
    category: 'Other',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSelect = (value) => setForm({ ...form, category: value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.description || !form.date || !form.category) return;
    onSubmit(form);
    setForm({ amount: '', description: '', date: '', category: 'Other' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} />
      <Input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <Input name="date" type="date" value={form.date} onChange={handleChange} />
      <Select onValueChange={handleSelect} defaultValue={form.category}>
        <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Add</Button>
    </form>
  );
}
