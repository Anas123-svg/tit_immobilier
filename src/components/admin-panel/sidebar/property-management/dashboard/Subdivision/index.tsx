import React from "react";
import SubdivisionDashboardHeader from "./SubdivisionDashboardHeader";
import CircularDiagram from "./CircularDiagram";
import LineChart from "./LineChart";
import DeadlineTable from "./DeadlineTable";
import { HomeIcon, PiggyBank, Wrench, Home, CheckCircle } from "lucide-react";
import StatCards from "./StatCards";
import ChartSection from "./ChartSection";

const stats = [
  {
    name: "Promotion",
    value: "0",
    currency: "XOF",
    color: "bg-blue-500",
    icon: HomeIcon,
  },
  {
    name: "Occupied House",
    value: "0",
    currency: "XOF",
    color: "bg-red-500",
    icon: HomeIcon,
  },
  {
    name: "Reserved House",
    value: "0",
    currency: "XOF",
    color: "bg-yellow-500",
    icon: HomeIcon,
  },
  {
    name: "Available House",
    value: "0",
    currency: "XOF",
    color: "bg-green-500",
    icon: HomeIcon,
  },
];

const statsData = [
  {
    name: "Turnover",
    value: "0 XOF",
    color: "bg-blue-500",
    icon: PiggyBank,
  },
  {
    name: "Marge",
    value: "0 XOF",
    color: "bg-red-500",
    icon: Wrench,
  },
  {
    name: "Construction cost",
    value: "0 XOF",
    color: "bg-yellow-500",
    icon: Home,
  },
  {
    name: "Cost price",
    value: "0 XOF",
    color: "bg-green-500",
    icon: CheckCircle,
  },
];

const SubdivisionDashboard: React.FC = () => {
  const breadcrumbs = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Subdivision", path: "/dashboard/subdivision" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-10">
      {/* Header Section */}
      <SubdivisionDashboardHeader
        title="Subdivision Dashboard"
        breadcrumbs={breadcrumbs}
      />

    

      {/* Stat Cards and Circular Diagram */}
      <div className="flex gap-6">
        <StatCards stats={statsData} />
        <CircularDiagram />
      </div>

      {/* Chart Section */}
      <ChartSection />

      {/* Line Chart Section */}
      <LineChart title="Payment Statistics" />

      {/* Deadline Table */}
      <DeadlineTable />
    </div>
  );
};

export default SubdivisionDashboard;
