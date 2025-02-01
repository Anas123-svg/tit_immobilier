import { User, Home, FileText, Repeat } from "lucide-react";
import StatisticCard2 from "./StatisticCard2";

interface Stats {
  available: number;
  reserved: number;
  last_mandates: any[];
  last_owners: any[];
  reversals: any[];
  vente: any[];
  locative: any[];
  occupied: number;
  total_locative: number;
  total_mandates: number;
  total_owners: number;
  total_reversals: number;
  total_vente: number;
}
const StatisticCardsSection2 = ({ stats }: { stats: Stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <StatisticCard2
        name="Owner"
        value={stats?.total_owners}
        color="bg-red-500 text-red-700"
        icon={User}
      />
      <StatisticCard2
        name="Locative"
        value={stats.total_locative}
        color="bg-green-500 text-green-700"
        icon={Home}
      />
      <StatisticCard2
        name="Mandate"
        value={stats.total_mandates}
        color="bg-yellow-500 "
        icon={FileText}
      />
      <StatisticCard2
        name="Reversal"
        value={stats.total_reversals}
        color="bg-blue-500 text-blue-700"
        icon={Repeat}
      />
    </div>
  );
};

export default StatisticCardsSection2;
