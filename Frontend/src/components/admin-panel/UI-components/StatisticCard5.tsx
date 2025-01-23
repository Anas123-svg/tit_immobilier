import React, { useState } from "react";
import Modal  from "./Modal"; // Reusable Modal Component
import { PiggyBank } from "lucide-react";

export interface StatisticCards5Props {
  name: string;
  value: string;
  color: string;
  icon: React.ElementType;
}

export const StatisticCard5: React.FC<StatisticCards5Props> = ({ name, value, color, icon: Icon }) => {
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
      {/* Statistic Card */}
      <div
        onClick={handleCardClick}
        className={`p-4 rounded-lg shadow-md flex justify-between sm:h-[100px] items-center relative overflow-hidden hover:shadow-xl cursor-pointer ${color}`}
      >
        <div>
          <p className="text-white text-sm font-medium">{name}</p>
          <p className="text-white text-lg font-bold">{value}</p>
        </div>
        <div className="text-white opacity-50 -bottom-10 absolute -right-10">
          <Icon  className=" size-40 md:size-40 sm:size-24"/>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} name={name} transactions={transactions} />
      )}
    </>
  );
};
