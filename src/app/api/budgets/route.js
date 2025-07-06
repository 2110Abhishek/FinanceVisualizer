import { connectDB } from '@/lib/mongodb';
import Budget from '@/models/Budget';

export async function GET() {
  try {
    await connectDB();
    const budgets = await Budget.find();
    return Response.json(budgets);
  } catch (err) {
    console.error('GET /budgets error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { category, amount } = body;

    if (!category || typeof amount !== 'number') {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
    }

    await Budget.create({ category, amount });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("POST /budgets error:", err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
