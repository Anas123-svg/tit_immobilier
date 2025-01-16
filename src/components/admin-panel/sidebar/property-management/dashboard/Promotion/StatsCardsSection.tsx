import React from "react";

interface StatCard {
  name: string;
  value: number | string;
  currency?: string;
  color: string;
  icon: React.ElementType;
}

interface StatsCardsSectionProps {
  stats: StatCard[];
}

const StatsCardsSection: React.FC<StatsCardsSectionProps> = ({ stats }) => {
  return (
    <div className="flex flex-wrap gap-5 ">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-md shadow bg-white w-1/5 mx-auto h-fit flex flex-col "
        >
            <div className=" flex items-center justify-between p-4">
          <p className="text-sm text-gray-700">{stat.name}</p>
       <span><stat.icon/></span>   </div>
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

export default StatsCardsSection;

