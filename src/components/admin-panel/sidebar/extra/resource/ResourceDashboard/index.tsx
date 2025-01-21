import React, { useState } from "react";
import ResourceHistory from "./ResourceHistory";
import { Wrench, Check, XCircle } from "lucide-react";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection"; // Importing HeaderSection
import { FilterOption } from "@/types/DataProps";
import StatisticCardsSection from "@/components/admin-panel/UI-components/StatisticCardsSection";
import CircularDiagram from "@/components/admin-panel/UI-components/CircularDiagram";
import { ChartOptions } from "chart.js";

const stats = [
  { name: "Total Resources", value: 0, color: "bg-yellow-500", icon: Wrench },
  { name: "In Stock", value: 0, color: "bg-green-500", icon: Check },
  { name: "In Use", value: 0, color: "bg-blue-500", icon: Wrench },
  { name: "Out of Order", value: 0, color: "bg-red-500", icon: XCircle },
];
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

const ResourceDashboard: React.FC = () => {
  const history:any[] = [];

  // Filters Configuration
  const filters:FilterOption[] = [
    {
      type: "select",
      label: "Kind",
      name: "kind",
      options: ["ALL", "Type A"],
    },
    {
      type: "text",
      label: "Resource",
      name: "resource",
      placeholder: "Resource",
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

  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});

  // Handle changes in filters
  const handleFilterChange = (name: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle filter submission
  const handleFilterSubmit = () => {
    console.log("Filter values:", filterValues);
  };

  return (
    <div className="p-2 sm:p-6 space-y-10 bg-gray-100 min-h-screen">
      {/* Header Section with Filters */}
      <HeaderSection
        title="Dashboard"
        filters={filters}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
        breadcrumbs={[
          { name: "Resource", path: "/resource" },
          { name: "Resource Dashboard", path: "/resource/dashboard" },
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
      <ResourceHistory history={history} />
    </div>
  );
};

export default ResourceDashboard;
