import { connectDB } from '@/lib/mongodb';
import Budget from '@/models/Budget';

export async function GET() {
  try {
    await connectDB();
    const budgets = await Budget.find();
    return Response.json(budgets);
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { category, amount } = body;

    const budget = await Budget.findOneAndUpdate(
      { category },
      { $set: { amount } },
      { upsert: true, new: true }
    );

    return Response.json(budget);
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to set budget' }), { status: 500 });
  }
}
