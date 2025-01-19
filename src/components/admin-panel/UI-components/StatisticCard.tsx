import React,{useState} from "react";
import Modal from "./Modal";

interface StatisticCardsProps {
  name: string;
  value: number | string;
  currency?: string;
  color: string;
  icon: React.ElementType;
}

const StatisticCards: React.FC<StatisticCardsProps> = ({ name, value, currency, color, icon: Icon }) => {

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
    <div   onClick={handleCardClick} className="rounded-md shadow cursor-pointer bg-white w-1/5
    mb-10 mx-auto h-fit flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <p className="text-sm text-gray-700">{name}</p>
        <span>
          <Icon />
        </span>
      </div>

      {/* Value Section */}
      <div
        className={`flex items-baseline justify-between rounded-br-md rounded-bl-md p-4 mt-2 text-white ${color}`}
      >
        {currency && <span className="text-lg">{currency}</span>}
        <span className="text-2xl font-bold">{value}</span>
      </div>
      
    
    </div>
   {isModalOpen && (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} name={name} transactions={transactions} />
  )}</>
  );
};

export default StatisticCards;
