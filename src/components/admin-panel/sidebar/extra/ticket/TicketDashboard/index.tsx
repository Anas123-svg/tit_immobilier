import React from "react";
import TicketHeader from "./TicketHeader";
import StatsCardsSection from "./StatsCardsSection";
import TicketCircularDiagrams from "./TicketCircularDiagrams";
import TicketHistory from "./TicketHistory";
import { HomeIcon,Wrench,CheckCircle} from "lucide-react";
const stats = [
  { name: "Promotion", value: "0", currency: "XOF", color: "bg-blue-500", icon: HomeIcon },
  { name: "Occupied House", value: "0", currency: "XOF", color: "bg-red-500", icon: Wrench },
  { name: "Reserved House", value: "0", currency: "XOF", color: "bg-yellow-500", icon: HomeIcon },
  { name: "Available House", value: "0", currency: "XOF", color: "bg-green-500", icon: CheckCircle },
];
const TicketDashboard: React.FC = () => {
  const history = {
    interventions: [],
    constructions: [],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <TicketHeader title="Dashboard" />
      <StatsCardsSection stats={stats} />
      <TicketCircularDiagrams />
      <TicketHistory history={history} />
    </div>
  );
};

export default TicketDashboard;
