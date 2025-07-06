'use client';
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";

export default function TransactionList({ data, onDelete }) {
  return (
    <Card className="mt-4">
      <h3 className="text-lg font-semibold mb-3">📋 All Transactions</h3>
      <ul className="space-y-3">
        {data.map((tx) => (
          <motion.li
            key={tx._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center p-2 rounded-md hover:bg-muted transition"
          >
            <div>
              <p className="text-base">{tx.description}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(tx.date).toLocaleDateString()} • {tx.category}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-medium">₹{tx.amount}</p>
              <button onClick={() => onDelete(tx._id)} className="text-red-500 hover:scale-110 transition">
                ❌
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}
