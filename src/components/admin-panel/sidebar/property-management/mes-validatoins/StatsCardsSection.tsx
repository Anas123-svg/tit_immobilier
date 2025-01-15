import React from "react";
import { StatCardProps } from "@/types/DataProps";

interface StatsCardsSectionProps {
  stats: StatCardProps[];
}

const StatsCardsSection: React.FC<StatsCardsSectionProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-4 rounded-md shadow-md text-white flex items-center justify-between ${stat.color}`}
        >
          <div>
            <h3 className="text-lg font-semibold">{stat.name}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
          <stat.icon size={30} />
        </div>
      ))}
    </div>
  );
};

export default StatsCardsSection;
