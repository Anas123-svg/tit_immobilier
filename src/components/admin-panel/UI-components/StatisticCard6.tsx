import React, { useState } from "react";

import Modal  from "./Modal"; // Reusable Modal Component
interface StatisticCard6Props {
  title: string;
  value: number | string;
  stats: string[]; // Labels for the bottom stats (e.g., "Busy", "Reserved", "Available")
  color: string; // Background color for the bottom bar
}

const StatisticCard6: React.FC<StatisticCard6Props> = ({ title, value, stats, color }) => { const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (<>
    <div onClick={handleCardClick} className="  h-fit  rounded-lg  border cursor-pointer bg-white overflow-hidden hover:shadow-lg">
      {/* Top Section */}
      <div className="p-4 flex flex-col items-start">
        <h3 className={`text-4xl font-bold text-${color}`}>{value}</h3>
        <p className="text-gray-600 text-lg">{title}</p>
      </div>

      {/* Bottom Stats Section */}
      <div className={`grid grid-cols-3 text-center text-white bg-${color}`}>
        {stats.map((stat, index) => (
          <div key={index} className="py-2">
            <p className="text-sm font-medium">{stat}</p>
          </div>
        ))}
      </div>
    </div>   {/* Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} name={title} transactions={transactions} />
      )}</>
  );
};

export default StatisticCard6;
