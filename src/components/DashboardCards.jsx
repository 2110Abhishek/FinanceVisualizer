'use client';
export default function DashboardCards({ transactions }) {
  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  const latest = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '20px' }}>
      <div className="card" style={{ flex: 1 }}>
        <h3>Total Spent</h3>
        <p>₹{total}</p>
      </div>
      <div className="card" style={{ flex: 2 }}>
        <h3>Recent Transactions</h3>
        <ul>
          {latest.map(tx => (
            <li key={tx._id}>{tx.description} - ₹{tx.amount}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
