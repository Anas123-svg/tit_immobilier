

import {

  ArrowLeft, ArrowRight,
  PiggyBank,

} from "lucide-react";

import { FilterOption, Treasury } from "@/types/DataProps";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import { StatisticCard5 } from "@/components/admin-panel/UI-components/StatisticCard5";
import DetailSection from "./DetailSection";
import { useParams } from "react-router-dom";
import useFetchData from "@/hooks/useFetchData";
import LineChart from "@/components/admin-panel/UI-components/LineChart";
import CircularDiagram from "@/components/admin-panel/UI-components/CircularDiagram";
import { ChartOptions } from "chart.js";


// Define the Owner Interface based on the provided model

const TreasuryDetailPage = () => {
    const {id} = useParams()
    const { data, loading, error } = useFetchData<Treasury>(
    `${import.meta.env.VITE_API_URL}/api/treasury/add/${id}`
  );
  
    // Basic and Advanced Filters for the Intervention component
    const filters: FilterOption[] = [
      {
        type: "select",
        label: "Type",
        name: "type",
        options: ["Please select", "INTERVENTION", "LOCATIVE"],
      },
      
      {
        type: "text",
        label: "Reference No.",
        name: "referenceNumber",
        placeholder: "EX: ZA-0000-0000-00",
      },
      {
        "type": "date",
        "label": "Start Date",
        "name": "startDate"
      },
      {
        "type": "date",
        "label": "End Date",
        "name": "endDate"
      },
    ];
  
    const advancefilters:FilterOption[] = [
   
      {
        "type": "select",
        "label": "Created By",
        "name": "createdBy",
        "options": ["Select User", "User 1", "User 2"]
      },
      {
        "type": "date",
        "label": "Creation Date",
        "name": "creationDate"
      },
      {
        "type": "number",
        "label": "Min Amount",
        "name": "minAmount",
        "placeholder": "Min Amount"
      },
      {
        "type": "number",
        "label": "Max Amount",
        "name": "maxAmount",
        "placeholder": "Max Amount"
      },
      {
        "type": "select",
        "label": "Order",
        "name": "order",
        "options": ["Ascending", "Descending"]
      },
      {
        "type": "select",
        "label": "Number",
        "name": "number",
        "options": ["10", "20", "50", "100"]
      }
    ]

    const statsData = [
        {
          name: "Entrance",
          value: "0 XOF",
          color: "bg-green-500",
          icon:ArrowRight,
        },
    
        {
          name: "Exit",
          value: "0 XOF",
          color: "bg-red-500",
          icon: ArrowLeft ,
        },
        {
          name: "Pay",
          value: "0 XOF",
          color: "bg-blue-500",
          icon:PiggyBank ,
        },
      ];
      
      
  // Handle changes in filters
  const handleFilterChange = (name: string, value: string) => {
    console.log(`${name}: ${value}`);
  };

  const handleFilterSubmit = () => {
    console.log("Filters submitted");
  };
 const dataChart = {
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

  const linedata = {
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
  
  const lineoptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };
  
  return (
    <div className="bg-white shadow-lg p-0 sm:p-6 space-y-9 rounded-lg ">
      {/* Profile Header */}
 
        <HeaderSection
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
        gridSize="4"
        advancefilters={advancefilters}
        filters={filters}
       
      />
     <div className="grid grid-cols-3  gap-5 h-fit">{statsData.map((tenantStat, index) => (
       <StatisticCard5
             key={index}
             name={tenantStat.name}
             value={tenantStat.value}
             icon={tenantStat.icon}
             color={tenantStat.color}
           />
           ))}</div>
  <div className="grid grid-cols-2">   <LineChart title="Treasury Statistics" data={linedata} options={lineoptions} />
  
  <CircularDiagram title="CIRCULAR CHART OF Treasury RATES " data={dataChart} options={options} />
  </div>

  <div className="">
<DetailSection item={data??undefined}/>

  </div>
    </div>
  );
};

export default TreasuryDetailPage;

