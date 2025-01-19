import React from "react";
import { User, FileText, Briefcase, DollarSign } from "lucide-react";
import StatisticCard2 from "./StatisticCard2";

// Define the type for a single card
interface StatCard {
  name: string; // Title of the card
  value: string | number; // Value to display
  icon: React.ElementType; // Icon to display
  color: string; // Background color of the card
}

// Define the type for props
interface StatisticCardSection2Props {
  stats: StatCard[]; // Array of stat cards
}

const StatisticCardsSection2: React.FC<StatisticCardSection2Props> = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, index) => (
       <StatisticCard2 name={stat.name} value={stat.value} color={stat.color} icon={stat.icon}/>
      ))}
    </div>
  );
};

export default StatisticCardsSection2;
