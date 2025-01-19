import React from "react";

interface StatCardProps {
  name: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

interface StatsCardsSectionProps {
  stats: StatCardProps[];
}

const StatsCardsSection: React.FC<StatsCardsSectionProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
  
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg shadow-md text-white ${stat.color}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{stat.name}</h3>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
            {/* Render icon component */}
            <stat.icon size={30} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCardsSection;
