import React from "react";
import { Home, Wrench, CheckCircle, AlertCircle } from "lucide-react";

const stats = [
  { name: "Total resources", value: 0, color: "bg-yellow-500", icon: Home },
  { name: "In stock", value: 0, color: "bg-green-500", icon: CheckCircle },
  { name: "In use", value: "0 Active", color: "bg-blue-500", icon: Wrench },
  { name: "Out of order", value: 0, color: "bg-red-500", icon: AlertCircle },
];

const ResourceStatsCardsSection: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-5">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-md shadow bg-white w-1/5 mx-auto h-fit flex flex-col"
        >
          <div className="flex items-center justify-between p-4">
            <p className="text-sm text-gray-700">{stat.name}</p>
            <span>
              <stat.icon />
            </span>
          </div>
          <div
            className={`flex items-baseline justify-between rounded-br-md rounded-bl-md p-4 mt-2 text-white ${stat.color}`}
          >
            <span className="text-2xl font-bold">{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResourceStatsCardsSection;
