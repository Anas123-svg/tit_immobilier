
import { StatisticCard5 } from "@/components/admin-panel/UI-components/StatisticCard5";
import { PiggyBank, ArrowRight, ArrowLeft } from "lucide-react";

 const statsData = [
  { name: "Pay", value: "0 XOF", color: "bg-green-500", icon: PiggyBank },
  { name: "Rent", value: "0 XOF", color: "bg-red-500", icon: ArrowRight },
  { name: "Caution", value: "0 XOF", color: "bg-yellow-500", icon: ArrowLeft },
  
  { name: "Commission agence", value: "0 XOF", color: "bg-blue-500", icon: ArrowRight },


];
const StatisticCardsLayout = () => {
    return (
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
          {statsData.map((stat, index) => (
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