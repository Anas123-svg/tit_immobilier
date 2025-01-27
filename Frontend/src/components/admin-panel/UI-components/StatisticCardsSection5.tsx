import React from "react";
import { PiggyBank, Wrench, Home, CheckCircle } from "lucide-react";
import StatisticCards3 from "./StatisticCards3";
import { StatisticCard5 } from "./StatisticCard5";
interface StatisticCard5 {
    name: string;
    value: string;
    color: string;
    icon: React.ElementType;
  }
// StatisticCardsSection5 Component
interface StatisticCardsSection5Props {
    stats: StatisticCard5[];
  }
  
  const StatisticCardsSection5: React.FC<StatisticCardsSection5Props> = ({ stats }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatisticCard5
            key={index}
            name={stat.name}
            value={stat.value}
            color={stat.color}
            icon={stat.icon}
          />
        ))}
      </div>
    );
  };
  
  export default StatisticCardsSection5;