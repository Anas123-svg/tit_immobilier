import React, { useState } from "react";
import StatisticCardsSection from "@/components/admin-panel/UI-components/StatisticCardsSection";
import SummaryCardsSection from "./SummaryCard";
import { principalStats, summaryCardsData, tenantData } from "@/data/dummyData";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import TopListSection from "./TopListSection";
import { FilterOption } from "@/types/DataProps";
import ChartSection from "@/components/admin-panel/UI-components/ChartSection";
import { ChartData, ChartOptions } from "chart.js";
import SummaryCardSection2 from "@/components/admin-panel/UI-components/StatisticCardsSection2";
const Principal: React.FC = () => {
  // Filter options for the HeaderSection
  const filterOptions: FilterOption[] = [
    {
      type: "select",
      label: "Type",
      name: "type",
      options: ["ALL", "OWNER", "LOCATION", "REAL ESTATE PROGRAM", "SUBDIVISION PROJECT", "CRM"],
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

  // State to manage filters
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({
    type: "",
    startDate: "",
    endDate: "",
  });

  // Handle filter value changes
  const handleFilterChange = (name: string, value: string) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle filter submission
  const handleFilterSubmit = () => {
    console.log("Filters submitted:", filterValues);
    // Add logic to filter data or make API calls based on filterValues
  };
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
        label: "Total",
        data: [1786000, 1200000, 1300000, 1100000, 1500000],
        backgroundColor: "#4F46E5",
        borderColor: "#4F46E5",
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 30,
      },
      {
        label: "Paid",
        data: [893000, 870000, 850000, 830000, 900000],
        backgroundColor: "#22C55E",
        borderColor: "#22C55E",
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 30,
      },
      {
        label: "Unpaid",
        data: [893000, 700000, 600000, 750000, 600000],
        backgroundColor: "#EF4444",
        borderColor: "#EF4444",
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 30,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false, // Prevents automatic aspect ratio maintenance
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
        text: "Monthly Rent Collection Statistics",
        font: {
          size: 16,
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
          stepSize: 500000,
        },
      },
    },
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <HeaderSection
        title="Principal"
        breadcrumbs={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Principal", path: "/dashboard/principal" },
        ]}
        filters={filterOptions}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />

      {/* Statistics Cards Section */}
      <StatisticCardsSection stats={principalStats} />

      {/* Chart Section */}
      <ChartSection title="Monthly Rent Collection Statistics" data={chartData} options={chartOptions} />

      {/* Summary Cards Section */}
      <SummaryCardSection2 cards={summaryCardsData} />

      {/* Top 10 Lists Section */}
      <div className="my-6 p-5 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Top 10 Lists</h1>
        <div className="flex justify-between gap-5 flex-wrap">
          {/* Tenant and Owner Lists */}
          <TopListSection title="List of the Last 10 Tenants" data={tenantData} itemsPerPage={5} />
          <TopListSection title="List of the Last 10 Owners" data={tenantData} itemsPerPage={5} />
        </div>
      </div>
    </div>
  );
};

export default Principal;
