import React, { useState } from "react";
import StatisticCardsSection from "@/components/admin-panel/UI-components/StatisticCardsSection";
import { principalStats } from "@/data/dummyData";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import TopListSection from "./TopListSection";
import { FilterOption } from "@/types/DataProps";
import ChartSection from "@/components/admin-panel/UI-components/ChartSection";
import { ChartData, ChartOptions } from "chart.js";
import {  User,Home, Ticket,Tag} from "lucide-react";
import { StatisticCard5 } from "@/components/admin-panel/UI-components/StatisticCard5";
import StatisticCardsSection5 from "@/components/admin-panel/UI-components/StatisticCardsSection5";

export const tenantData = [
  {
    name: "ASSEMIAN N'GUESSAN ADOLPHE",
    phone: "0707787973",
    code: "ZA-6972-6414-01",
    status: "Active",
    pay: "OWE: 9,900,000 XOF",
  },
  {
    name: "YAO N'GUESSAN ALAIN ROLAND",
    phone: "0777120473",
    code: "ZA-6972-2939-01",
    status: "Active",
    pay: "DUE: 0 XOF",
  },
  {
    name: "KOUADIO JEAN MICHEL",
    phone: "0778901234",
    code: "ZA-6972-1293-01",
    status: "Inactive",
    pay: "OWE: 5,500,000 XOF",
  },
  {
    name: "AHOUA MARIE LAURE",
    phone: "0583920123",
    code: "ZA-6972-9384-01",
    status: "Active",
    pay: "DUE: 0 XOF",
  },
];

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
    maintainAspectRatio: false, // Allow the chart to adjust aspect ratio based on container size
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
  

  // Summary cards data
 const summaryCardsData = [
  { name: "Real Estate", value: "4", currency:"XOF", color: "bg-yellow-500", icon: Home },
  { name: "Ticket", value: "10", currency:"XOF", color: "bg-green-500", icon: Ticket },
  { name: "Intervention", value: "22", currency:"XOF", color: "bg-red-500", icon: Tag },
  { name: "Supplier", value: "14", currency:"XOF", color: "bg-blue-500", icon: User },
];

  return (
    <div className=" p-2 sm:p-6 bg-gray-100 min-h-screen space-y-6">
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
      <StatisticCardsSection5 stats={summaryCardsData}/>
  
      {/* Top 10 Lists Section */}
      <div className="my-6 p-5 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Top 10 Lists</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Tenant and Owner Lists */}
          <TopListSection title="List of the Last 10 Tenants" data={tenantData} itemsPerPage={5} />
          <TopListSection title="List of the Last 10 Owners" data={tenantData} itemsPerPage={5} />
          <TopListSection title="List of the Last 10  BALANCE RECEIPTS" data={tenantData} itemsPerPage={5} />
          <TopListSection title="List of the Last 10 RECEIPTS PENDING PAYMENT" data={tenantData} itemsPerPage={5} />
        </div>
      </div>
    </div>
  );
};

export default Principal;
