import React from "react";
import ContractsList from "./ContractsList";

import { renewals } from "@/data/dummyData";


import { tenantStats } from "@/data/dummyData";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import { FilterOption } from "@/types/DataProps";
import { User, FileText, Briefcase, DollarSign } from "lucide-react";

import StatisticCardsSection2 from "@/components/admin-panel/UI-components/StatisticCardsSection2";
import ChartSection from "@/components/admin-panel/UI-components/ChartSection";
import { ChartData, ChartOptions } from "chart.js";
import StatisticCardsSection4 from "@/components/admin-panel/UI-components/StatisticCardsSection4";
import CircularDiagram from "@/components/admin-panel/UI-components/CircularDiagram";
 const stats = [
    { name: "Tenant", value: 12, icon: User, color: "bg-red-500" },
    { name: "Contract", value: 12, icon: FileText, color: "bg-blue-500" },
    { name: "Bill", value: 96, icon: Briefcase, color: "bg-green-500" },
    { name: "Payment", value: 18, icon: DollarSign, color: "bg-yellow-500" },
  ];

const TenantDashboard: React.FC = () => {
  const breadcrumbs = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Tenant", path: "/dashboard/tenant" },
  ];
  const filters: FilterOption[] = [
    {
      type: "select",
      label: "Type",
      name: "type",
      options: [
        "ALL",
        "RENT",
        "ENTRY INVOICE",
        "PENALTY",
        "OTHER INVOICES",
        "RENEWAL",
        "TERMINATION"
      ]
    },
    {
      type: "text",
      label: "Tenant",
      name: "tenant",
      placeholder: "Tenant"
    },
    {
      type: "date",
      label: "Start date",
      name: "startDate",
      placeholder: "mm/dd/yyyy"
    },
    {
      type: "date",
      label: "End date",
      name: "endDate",
      placeholder: "mm/dd/yyyy"
    }
  ];

  const handleFilterChange = (name: string, value: string) => {
    console.log(`Filter changed: ${name} = ${value}`);
  };

  const handleFilterSubmit = () => {
    console.log("Filters submitted");
  };
  const data: ChartData<"bar"> = {
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

  const options: ChartOptions<"bar"> = {
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


    const circulardata = {
      labels: ["Outstanding", "Paid", "Total"],
      datasets: [
        {
          data: [72, 22, 96],
          backgroundColor: ["#F87171", "#34D399", "#3B82F6"],
        },
      ],
    };
  
    // Explicitly type the options object
    const circularoptions: ChartOptions<"doughnut"> = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: "top", // Explicitly use a valid value
        },
      },
    }
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-10">
      {/* Header Section */}
      <HeaderSection
      title="Tenant"
      breadcrumbs={breadcrumbs}
      filters={filters}
      onFilterChange={handleFilterChange}
      onFilterSubmit={handleFilterSubmit}
    />
      {/* Statistics Cards Section */}
      <StatisticCardsSection2 stats={stats} />

      {/* Contracts Lists */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <ContractsList title="Active Contracts" data={renewals} headerColor="bg-red-500"   itemsPerPage={5} />
        <ContractsList title="Renewals" data={renewals} headerColor="bg-yellow-500"  itemsPerPage={5} />
      </div>

      {/* Circular Diagram */}
      <div className="flex mt-6 ">
      <StatisticCardsSection4 stats={tenantStats} />
      <div className="w-1/2"> <CircularDiagram title="Circular Diagram of Amount" data={circulardata}  /></div> 
      </div>
      <div className="mt-6">
        
      <ChartSection title="Monthly Reveneu" data={data} options={options} />

      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <ContractsList title="Active Contracts" data={renewals} headerColor="bg-red-500"   itemsPerPage={5} />
        <ContractsList title="Renewals" data={renewals} headerColor="bg-yellow-500"  itemsPerPage={5} />
      </div>
    </div>
  );
};

export default TenantDashboard;
