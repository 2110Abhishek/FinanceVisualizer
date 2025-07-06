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
    const body = await req.json();
    const { category, amount } = body;

    if (!category || typeof amount !== 'number') {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
    }

    // save to DB (pseudo)
    await connectDB();
    await Budget.create({ category, amount });


    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Budget API error:", err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

