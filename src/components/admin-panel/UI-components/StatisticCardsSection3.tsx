import React from "react";
import StatisticCard3 from "./StatisticCards3";

interface StatCard {
  name: string;
  value: number | string;
  currency?: string;
  color: string;
}

interface TenantStatsCurrencyCardsProps {
  stats: StatCard[];
}

const TenantStatsCurrencyCards: React.FC<TenantStatsCurrencyCardsProps> = ({ stats }) => {
  return (
    <div className="flex flex-wrap gap-5 w-1/2">
      {stats.map((stat, index) => (
      <StatisticCard3
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

export default TenantStatsCurrencyCards;
