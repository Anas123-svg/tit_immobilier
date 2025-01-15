// OwnerStatsCardsSection.tsx
import React from "react";
import { LucideIcon } from "lucide-react";

import { StatCard } from "@/types/DataProps"
// Define the props type for the section
interface OwnerStatsCardsSectionProps {
  stats: StatCard[];
}

const OwnerStatsCardsSection: React.FC<OwnerStatsCardsSectionProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-4 rounded-md shadow ${stat.color} flex items-center justify-between`}
        >
          <div>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="text-sm">{stat.name}</p>
          </div>
          <stat.icon size={30} />
        </div>
      ))}
    </div>
  );
};

export default OwnerStatsCardsSection;
