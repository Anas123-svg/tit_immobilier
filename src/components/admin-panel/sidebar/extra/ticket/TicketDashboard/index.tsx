import React from "react";
import TicketHistory from "./TicketHistory";
import { HomeIcon, Wrench, CheckCircle } from "lucide-react";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection"; // Importing HeaderSection
import { FilterOption } from "@/types/DataProps";
import StatisticCardsSection from "@/components/admin-panel/UI-components/StatisticCardsSection";
import { ChartOptions } from "chart.js";
import CircularDiagram from "@/components/admin-panel/UI-components/CircularDiagram";

const stats = [
  { name: "Total Ticket", value: "0", color: "bg-blue-500", icon: HomeIcon },
  { name: "Ticket to Make", value: "0", color: "bg-red-500", icon: Wrench },
  { name: "Ticket in Progress", value: "0", color: "bg-yellow-500", icon: HomeIcon },
  { name: "Firm Ticket", value: "0", color: "bg-green-500", icon: CheckCircle },
];

const TicketDashboard: React.FC = () => {
  const data = {
    labels: ["Outstanding", "Paid", "Total"],
    datasets: [
      {
        data: [72, 22, 96],
        backgroundColor: ["#F87171", "#34D399", "#3B82F6"],
      },
    ],
  };

  // Define the options with the correct type
  const options: ChartOptions<"doughnut"> = {
    maintainAspectRatio: false,
    responsive: true,
    cutout: "50%", // Adjust the inner radius (default for a doughnut is 50%)
    radius: "60%", // Increases the size of the chart
    plugins: {
      legend: {
        position: "top", // Valid value for position
      },
    },
  };
  const history = {
    interventions: [],
    constructions: [],
  };

  // Filters
  const filters:FilterOption[] = [
    {
      type: "select",
      label: "Type",
      name: "type",
      options: ["ALL", "COMMERCIAL"],
    },
    {
      type: "select",
      label: "Commercial",
      name: "commercial",
      options: ["Select an item"],
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

  const handleFilterChange = (name: string, value: string) => {
    console.log(`Filter changed: ${name} = ${value}`);
  };

  const handleFilterSubmit = () => {
    console.log("Filters applied.");
  };

  return (
    <div className="p-2 sm:p-6 space-y-10 bg-gray-100 min-h-screen">
      {/* Header Section with Filters */}
      <HeaderSection
        title= "Ticket Dashboard"
        filters={filters}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Ticket Dashboard", path: "/dashboard" },
        ]}
      />
      
      {/* Stats Section */}
      <StatisticCardsSection stats={stats} />
      
      {/* Circular Diagrams Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
   <CircularDiagram title="CIRCULAR DIAGRAM OF AVAILABILITY " data={data} options={options} />
   <CircularDiagram title="CIRCULAR CHART OF INTERVENTION RATES " data={data} options={options} />
    </div>
      
      {/* History Section */}
      <TicketHistory history={history} />
    </div>
  );
};

export default TicketDashboard;
