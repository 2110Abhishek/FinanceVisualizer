// src/models/Budget.js
import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Other'],
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  }
});

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
