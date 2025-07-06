// /app/api/transactions/route.js
import { connectDB } from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find().sort({ date: -1 });
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('GET /transactions failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { amount, description, date, category } = body;

    if (!amount || !description || !date || !category) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const transaction = await Transaction.create({ amount, description, date, category });
    return NextResponse.json(transaction);
  } catch (error) {
    console.error('POST /transactions failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
