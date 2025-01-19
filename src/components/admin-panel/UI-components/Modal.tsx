import React from "react";
import { motion } from "framer-motion";
import { Printer } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  transactions: Transaction[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, name, transactions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6"
      >
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-lg font-semibold">{name}</h2>
          <div className="flex items-center gap-4">
            {/* Print Icon */}
            <button
              onClick={() => window.print()}
              className="text-gray-600 hover:text-primary flex items-center"
            >
              <Printer size={20} className="mr-1" />
              <span className="text-sm">Print</span>
            </button>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 font-bold text-xl"
            >
              &times;
            </button>
          </div>
        </div>
        <div className="mt-4">
          <table className="w-full table-auto border-collapse">
            <thead className="text-white bg-primary">
              <tr>
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Date</th>
                <th className="border px-4 py-2 text-left">Description</th>
                <th className="border px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{transaction.id}</td>
                  <td className="border px-4 py-2">{transaction.date}</td>
                  <td className="border px-4 py-2">{transaction.description}</td>
                  <td className="border px-4 py-2">{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
