
// TransactionHistory.tsx
import React from "react";

const transactions = [
  {
    id: 1,
    date: "January 9, 2025",
    description: "Payment of the deposit for contract No. ZA-6972-0225-01",
    speed: "0 XOF",
  },
  {
    id: 2,
    date: "January 9, 2025",
    description: "Commission (10%) AGENCY, Rent for January 2025",
    speed: "0 XOF",
  },
];

const TransactionHistory: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Speed</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border border-gray-300 p-2">#{transaction.id}</td>
              <td className="border border-gray-300 p-2">{transaction.date}</td>
              <td className="border border-gray-300 p-2">{transaction.description}</td>
              <td className="border border-gray-300 p-2">{transaction.speed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
