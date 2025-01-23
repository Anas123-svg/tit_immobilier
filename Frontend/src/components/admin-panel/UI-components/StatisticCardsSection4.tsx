import React from "react";
import StatisticCard4 from "./StatisticCard4"; // Import the unit component

interface StatCard {
  name: string;
  value: number | string;
  currency?: string;
  color: string;
}

interface StatisticCardSection4Props {
  stats: StatCard[];
}

const StatisticCardsSection4: React.FC<StatisticCardSection4Props> = ({ stats }) => {
  return (
    <div className="flex flex-wrap gap-5 w-1/2 h-fit">
      {stats.map((stat, index) => (
        <StatisticCard4
          key={index}
          name={stat.name}
          value={stat.value}
          currency={stat.currency}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatisticCardsSection4;
