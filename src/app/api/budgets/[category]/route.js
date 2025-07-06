import { connectDB } from '@/lib/mongodb';
import Budget from '@/models/Budget';

export async function DELETE(req, { params }) {
  await connectDB();
  await Budget.findOneAndDelete({ category: params.category });
  return new Response(null, { status: 204 });
}
