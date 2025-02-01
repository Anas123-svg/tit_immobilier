// Owner.tsx
import { useEffect, useState } from "react";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import ActiveOwnersList from "./ActiveOwnersList";
import ValidatedMandatesList from "./ValidatedMandatesList";
import CircularDiagram from "@/components/admin-panel/UI-components/CircularDiagram";
import { FilterOption } from "@/types/DataProps";
import StatisticCard6 from "@/components/admin-panel/UI-components/StatisticCard6";
import StatisticCardsSection2 from "@/components/admin-panel/UI-components/StatisticCardsSection2";
import axios from "axios";

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

const Owner = () => {
  const [stats, setStats] = useState<Stats>();
  const [loading, setLoading] = useState(false);
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/dashboard/owners`
      );
      setStats(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const breadcrumbs = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Owner", path: "/dashboard/Owner" },
  ];

  const filters: FilterOption[] = [
    {
      type: "select",
      label: "Type",
      name: "type",
      options: ["ALL", "Promotion", "Reserved", "Occupied"],
    },
    {
      type: "text",
      label: "Owner",
      name: "Owner",
      placeholder: "owner",
    },
    {
      type: "date",
      label: "Start Date",
      name: "startDate",
    },
    {
      type: "date",
      label: "End Date",
      name: "endDate",
    },
  ];

  const circularDiagramData = {
    labels: ["Occupied", "Reserved", "Available"],
    datasets: [
      {
        data: [
          stats?.occupied ?? 0,
          stats?.reserved ?? 0,
          stats?.available ?? 0,
        ],
        backgroundColor: ["#34D399", "#3B82F6", "#F87171"],
      },
    ],
  };
  const handleFilterChange = (name: string, value: string) => {
    console.log(`${name}: ${value}`);
  };

  const handleFilterSubmit = () => {
    console.log("Filters submitted");
  };

  const cardData = [
    {
      title: "Sale",
      value: stats?.total_vente,
      stats: ["Sold", "Reserved", "Available"],
      color: "red-500",
    },
    {
      title: "Location",
      value: stats?.total_locative,
      stats: ["Busy", "Reserved", "Available"],
      color: "orange-500",
    },
  ];
  return (
    <div className="p-2 sm:p-6 bg-gray-100 space-y-10 min-h-screen">
      Header Section
      <HeaderSection
        title="Owner"
        filters={filters}
        breadcrumbs={breadcrumbs}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />
      {/* Owner Stats Cards Section */}
      {stats && <StatisticCardsSection2 stats={stats} />}
      {/* Circular Diagram Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 space-x-0 lg:space-y-0 space-y-5 lg:space-x-5 ">
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-5">
          {cardData.map((item, index) => (
            <StatisticCard6
              key={index}
              title={item.title}
              value={item.value ?? 0}
              stats={item.stats}
              color={item.color}
            />
          ))}
        </div>
        <div className="w-full">
          {" "}
          <CircularDiagram
            title="Circular Diagram of Availability"
            data={circularDiagramData}
          />
        </div>
      </div>
      {/* Active Owners List and Validated Mandates List */}
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-5">
        {stats?.last_owners && <ActiveOwnersList owners={stats?.last_owners} />}
        {stats?.last_mandates && (
          <ValidatedMandatesList mandates={stats?.last_mandates} />
        )}
      </div>
    </div>
  );
};

export default Owner;
