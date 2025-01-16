import React from "react";
import { PiggyBank, Wrench, Home, CheckCircle } from "lucide-react";

interface StatCard {
  name: string;
  value: string;
  color: string;
  icon:    React.ElementType;
}

interface StatCardsProps {
  stats: StatCard[];
}

const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-1/2 max-h-72">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg shadow-md flex justify-between items-center relative  overflow-hidden ${stat.color}`}
        >
          <div>
            <p className="text-white text-sm font-medium">{stat.name}</p>
            <p className="text-white text-lg font-bold">{stat.value}</p>
          </div>
          <div className="text-white opacity-50 -bottom-10 absolute -right-10 ">{<stat.icon size={180}/>}</div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
