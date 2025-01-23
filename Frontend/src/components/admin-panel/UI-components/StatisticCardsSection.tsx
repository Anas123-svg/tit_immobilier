import React from "react";
import StatCard from "./StatisticCard"; // Import the unit UI component

interface StatCard {
  name: string;
  value: number | string;
  currency?: string;
  color: string;
  icon: React.ElementType;
}

interface StatisticCardsSectionProps {
  stats: StatCard[];
}

const StatisticCardsSection: React.FC<StatisticCardsSectionProps> = ({ stats }) => {
  return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          name={stat.name}
          value={stat.value}
          currency={stat.currency}
          color={stat.color}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default StatisticCardsSection;
