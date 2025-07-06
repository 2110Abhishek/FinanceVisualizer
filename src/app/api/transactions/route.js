import { connectDB } from '@/lib/mongodb';
import Transaction from '@/models/Transaction';

export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find().sort({ date: -1 });
    return Response.json(transactions);
  } catch (error) {
    console.error('GET /transactions failed:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { amount, description, date, category } = body;

    if (!amount || !description || !date || !category) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400,
      });
    }

    const transaction = await Transaction.create({ amount, description, date, category });
    return Response.json(transaction);
  } catch (error) {
    console.error('POST /transactions failed:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
