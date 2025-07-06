import { connectDB } from '@/lib/mongodb';
import Transaction from '@/models/Transaction';

export async function DELETE(req, { params }) {
  await connectDB();
  await Transaction.findByIdAndDelete(params.id);
  return new Response(null, { status: 204 });
}

export async function PUT(req, { params }) {
  await connectDB();
  const body = await req.json();
  const updated = await Transaction.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updated);
}
