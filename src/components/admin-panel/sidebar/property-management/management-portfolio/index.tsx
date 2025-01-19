import React from "react";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import StatsCardsSection from "@/components/admin-panel/UI-components/StatisticCardsSection";
import TransactionHistory from "./TransactionHistory";
import { statCardsData } from "@/data/dummyData";
import { FilterOption } from "@/types/DataProps";
import ChartSection from "@/components/admin-panel/UI-components/ChartSection";
import { ChartData, ChartOptions } from "chart.js";

// Define the filter options
const filterOptions: FilterOption[] = [
  {
    type: "select",
    label: "Type",
    name: "type",
    options: [
      "ALL",
      "Pay",
      "Commission Agency",
      "Caution",
      "VAT on Commission",
      "Dependence",
      "Caution CIE/SODECI",
      "Agency Fees",
      "Tax Stamps",
      "Registration Fee",
      "Application Fees",
      "Insurance Costs",
      "Other Fund",
    ],
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

// Define the chart data and options
const chartData: ChartData<"bar"> = {
  labels: [
    "Jan 1 - Jan 5, 2025",
    "Jan 6 - Jan 12, 2025",
    "Jan 13 - Jan 19, 2025",
    "Jan 20 - Jan 26, 2025",
    "Jan 27 - Jan 31, 2025",
  ],
  datasets: [
    {
      label: "Commission",
      data: [15000, 12000, 13000, 14000, 15000],
      backgroundColor: "#4F46E5",
      borderColor: "#4F46E5",
      borderWidth: 1,
    },
    {
      label: "Tax",
      data: [8000, 9000, 8500, 8700, 8900],
      backgroundColor: "#F59E0B",
      borderColor: "#F59E0B",
      borderWidth: 1,
    },
    {
      label: "Spent",
      data: [6000, 5500, 5900, 5700, 6000],
      backgroundColor: "#EF4444",
      borderColor: "#EF4444",
      borderWidth: 1,
    },
    {
      label: "Registration Fee",
      data: [2000, 2500, 2200, 2300, 2100],
      backgroundColor: "#9C27B0",
      borderColor: "#9C27B0",
      borderWidth: 1,
    },
    {
      label: "Insurance",
      data: [3000, 2800, 2900, 3000, 3100],
      backgroundColor: "#22C55E",
      borderColor: "#22C55E",
      borderWidth: 1,
    },
    {
      label: "Tax Stamps",
      data: [1000, 1200, 1100, 900, 800],
      backgroundColor: "#6B7280",
      borderColor: "#6B7280",
      borderWidth: 1,
    },
  ],
};

const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 12,
        },
      },
    },
    title: {
      display: true,
      text: "Portfolio Representation Diagram",
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const rawValue = tooltipItem.raw as number; // Explicitly cast raw to number
          return `${tooltipItem.dataset.label}: ${rawValue.toLocaleString()} XOF`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Period",
      },
    },
    y: {
      title: {
        display: true,
        text: "Amount (XOF)",
      },
      beginAtZero: true,
      ticks: {
        stepSize: 500,
      },
    },
  },
};

const ManagementPortfolio: React.FC = () => {
  const handleFilterChange = (name: string, value: string) => {
    console.log(`Filter changed: ${name} = ${value}`);
  };

  const handleFilterSubmit = () => {
    console.log("Filters submitted");
  };

  return (
    <div className="sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <HeaderSection
        title="Management Portfolio"
        breadcrumbs={[
          { name: "Home", path: "/portfolio" },
          { name: "Dashboard", path: "/dashboard" },
          { name: "Management Portfolio", path: "/portfolio" },
        ]}
        filters={filterOptions}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />

      {/* Stats Cards Section */}
      <StatsCardsSection stats={statCardsData} />

      {/* Chart Section */}
      <ChartSection title="Portfolio Representation Diagram" data={chartData} options={chartOptions} />

      {/* Transaction History Section */}
      <TransactionHistory />
    </div>
  );
};

export default ManagementPortfolio;
