import React from "react";
import { User, FileText, Briefcase, DollarSign } from "lucide-react";

const TenantStatsCards: React.FC = () => {
  const stats = [
    { name: "Tenant", value: 12, icon: User, color: "bg-red-500" },
    { name: "Contract", value: 12, icon: FileText, color: "bg-blue-500" },
    { name: "Bill", value: 96, icon: Briefcase, color: "bg-green-500" },
    { name: "Payment", value: 18, icon: DollarSign, color: "bg-yellow-500" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg shadow-md text-white ${stat.color}`}
        >
          <div className="flex justify-between">
            <h3 className="text-xl font-bold">{stat.value}</h3>
            <stat.icon size={24} />
          </div>
          <p className="text-sm">{stat.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TenantStatsCards;
