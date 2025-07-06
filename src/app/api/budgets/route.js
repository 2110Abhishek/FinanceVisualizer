// /app/api/budgets/route.js
import { connectDB } from '@/lib/mongodb';
import Budget from '@/models/Budget';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const budgets = await Budget.find();
    return NextResponse.json(budgets);
  } catch (err) {
    console.error('GET /budgets error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { category, amount } = body;

    if (!category || typeof amount !== 'number') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    await Budget.findOneAndUpdate(
      { category },
      { category, amount },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('POST /budgets error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
