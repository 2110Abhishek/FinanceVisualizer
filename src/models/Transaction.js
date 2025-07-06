// /models/Transaction.js
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: Date,
  category: {
    type: String,
    enum: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Other'],
    default: 'Other',
  },
}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
