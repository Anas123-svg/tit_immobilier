import React from "react";

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
        <div
          key={index}
          className="rounded-md shadow bg-white w-52 h-fit flex flex-col "
        >
          <p className="text-sm text-gray-700 p-4">{stat.name}</p>
          <div
            className={`flex items-baseline justify-between rounded-br-md rounded-bl-md  p-4 mt-2 text-white ${stat.color}`}
          >
            {stat.currency && <span className="text-lg">{stat.currency}</span>}
            <span className="text-2xl font-bold">{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TenantStatsCurrencyCards;
