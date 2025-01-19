import React from "react";
import StatisticCard4, { StatisticCard4Props } from "./StatisticCard4";

interface StatsCardsSection4Props {
  stats: StatisticCard4Props[]; // Ensure this matches the type defined for a single card
}

const StatisticCardsSection4: React.FC<StatsCardsSection4Props> = ({ stats }) => {
  return (
    <div className="grid grid-cols-4">
      {stats.map((stat, index) => (
        <StatisticCard4
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

export default StatisticCardsSection4;
