import React, { useState } from "react";
import Modal from "./Modal"; // Import your reusable Modal component


interface StatisticCard4Props {
  name: string;
  value: number | string;
  currency?: string;
  color: string;
}
const StatisticCard4: React.FC<StatisticCard4Props> = ({  name,value,
  currency,
  color,
 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const transactions = [
    { id: "12345", date: "January 15, 2025", description: "Sample transaction", amount: "0 XOF" },
    { id: "12346", date: "January 16, 2025", description: "Another transaction", amount: "0 XOF" },
  ];

  return (
    <>
      {/* Card */}
      <div
        onClick={handleCardClick}
        className="rounded-md shadow bg-white  h-fit flex flex-col">
    
      <p className="text-sm text-gray-700 p-4">{name}</p>
      <div
        className={`flex items-baseline justify-between rounded-br-md rounded-bl-md p-4 mt-2 text-white ${color}`}
      >
        {currency && <span className="text-lg">{currency}</span>}
        <span className="text-2xl font-bold">{value}</span>
      </div>
    </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} name={name} transactions={transactions} />
      )}
    </>
  );
};

export default StatisticCard4;
