
import React from "react";
import CircularDiagram from "@/components/admin-panel/UI-components/CircularDiagram";
import LineChart from "@/components/admin-panel/UI-components/LineChart";
import DeadlineTable from "./DeadlineTable";
import { Home} from "lucide-react";
import ChartSection from "@/components/admin-panel/UI-components/ChartSection";
import { ChartData, ChartOptions } from "chart.js";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import { FilterOption } from "@/types/DataProps";
import StatisticCard from "@/components/admin-panel/UI-components/StatisticCard";

const statsData = [
  {
    name: "Subdivison ",
    value: "0 XOF",
    color: "bg-blue-500",
    icon:Home,
  },
  {
    name: "Occupied lots",
    value: "0 XOF",
    color: "bg-red-500",
    icon: Home ,
  },
  {
    name: "Reseverd lots",
    value: "0 XOF",
    color: "bg-yellow-500",
    icon: Home ,
  },
  {
    name: "Lots available",
    value: "0 XOF",
    color: "bg-green-500",
    icon:Home ,
  },
];


const data = {
  labels: ["Jan 01", "Jan 08", "Jan 15", "Jan 22"],
  datasets: [
    {
      label: "Total Forecast",
      data: [100, 200, 150, 300],
      borderColor: "#3B82F6",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Total Recovered",
      data: [50, 100, 75, 150],
      borderColor: "#34D399",
      backgroundColor: "rgba(52, 211, 153, 0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
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
const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};


  const baroptions: ChartOptions<"bar"> = {
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

 


const SubdivisionDashboard: React.FC = () => {
  const breadcrumbs = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Subdivision", path: "/dashboard/subdivision" },
  ];

  const filters : FilterOption[] = [
    {
      type: "select",
      label: "Type",
      name: "type",
      options: ["ALL",],
    },
    {
      type: "text",
      label: "Subdivision",
      name: "subdivision",
      placeholder: "subdivision",
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
    console.log(`${name}: ${value}`);
  };

  const handleFilterSubmit = () => {
    console.log("Filters submitted");
  };
  return (
    <div className="p-2 sm:p-6 bg-gray-100 min-h-screen space-y-10">
         <HeaderSection
        title="Subdivision Dashboard"
        breadcrumbs={breadcrumbs}
        filters={filters}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
     
      
     <div className="grid grid-cols-2 gap-5 h-fit ">
     {statsData.map((stat, index) => (
        <
        StatisticCard
          key={index}
          name={stat.name}
          value={stat.value}
        
          color={stat.color}
          icon={stat.icon}
        />
      ))}
      

      </div>
      <CircularDiagram  title="Circular Diagram of amount" data={circulardata}/>
      </div>
   <ChartSection title="Monthly Rent Collection Statistics" data={chartData} options={options}/>
      <LineChart title="Payment Statistics" data={data} options={options} />
      <DeadlineTable />
    </div>
  );
};

export default SubdivisionDashboard;
