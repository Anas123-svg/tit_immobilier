
import { StatisticCard5 } from "@/components/admin-panel/UI-components/StatisticCard5";
import { PiggyBank, ArrowRight } from "lucide-react";

 const statsData = [
  { name: "Pay", value: "0 XOF", color: "bg-green-500", icon: PiggyBank },
  { name: "Commission agence", value: "0 XOF", color: "bg-blue-500", icon: ArrowRight },
  { name: "Caution", value: "0 XOF", color: "bg-yellow-500", icon: ArrowRight },
  { name: "VAT on commission", value: "0 XOF", color: "bg-red-500", icon: ArrowRight },
  { name: "Spent", value: "0 XOF", color: "bg-red-500", icon: ArrowRight },
  { name: "Caution CIE/SODECI", value: "0 XOF", color: "bg-blue-500", icon: PiggyBank },
  { name: "Agency fee", value: "0 XOF", color: "bg-blue-500", icon: ArrowRight },
  { name: "Tax stamps (Lease legalization)", value: "0 XOF", color: "bg-blue-500", icon: ArrowRight },
  { name: "Registration fee", value: "0 XOF", color: "bg-blue-500", icon: ArrowRight },
  { name: "Application fees", value: "0 XOF", color: "bg-blue-500", icon: PiggyBank },
  { name: "Insurance costs", value: "0 XOF", color: "bg-blue-500", icon: PiggyBank },
  { name: "Other funds", value: "0 XOF", color: "bg-blue-500", icon: ArrowRight },
];
const StatisticCardsLayout = () => {
    return (
      <div className="p-6 bg-gray-100 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {statsData.slice(0, 3).map((stat, index) => (
            <StatisticCard5
              key={index}
              name={stat.name}
              value={stat.value}
              color={stat.color}
              icon={stat.icon}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {statsData.slice(3).map((stat, index) => (
             <StatisticCard5
             key={index}
             name={stat.name}
             value={stat.value}
             color={stat.color}
             icon={stat.icon}
           />
          ))}
        </div>
      </div>
    );
  };
  
  export default StatisticCardsLayout;