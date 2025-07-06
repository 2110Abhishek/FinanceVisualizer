// /app/api/budgets/[category]/route.js
import { connectDB } from '@/lib/mongodb';
import Budget from '@/models/Budget';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Budget.findOneAndDelete({ category: params.category });
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error('DELETE /budgets/:category error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
