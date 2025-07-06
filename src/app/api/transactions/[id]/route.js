// /app/api/transactions/[id]/route.js
import { connectDB } from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Transaction.findByIdAndDelete(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error('DELETE /transactions/:id error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const updated = await Transaction.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT /transactions/:id error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
