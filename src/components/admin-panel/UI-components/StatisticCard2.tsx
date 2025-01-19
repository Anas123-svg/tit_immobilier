import React, { useState } from "react";
import { Home } from "lucide-react"; // Default icon in case no mapping is provided
import Modal from "./Modal";

// Define the type for a single card
interface StatisticCardProps {
  name: string; // Card title or identifier
  value: string | number; // Value to display
  color: string; // Color identifier for the card
  icon?: React.ElementType; // Optional icon component
  additionalClasses?: string; // Optional additional classes
}

const StatisticCard2: React.FC<StatisticCardProps> = ({
  name,
  value,
  color,
  icon: Icon = Home, // Default to the `Home` icon if no icon is provided
  additionalClasses = "",
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
  return (<>
    <div    onClick={handleCardClick}
      className={`p-4 rounded-md shadow ${color} text-white ${additionalClasses}`}
    >
      <div className="flex items-center justify-between">
        <Icon size={24} />
        <h3 className="text-lg font-semibold">{value}</h3>
      </div>
      <p className="text-sm">{name}</p>
    </div>
      {/* Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} name={name} transactions={transactions} />
      )}</>
  );
};

export default StatisticCard2;
