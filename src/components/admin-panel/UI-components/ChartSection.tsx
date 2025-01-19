import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { ChartData, ChartOptions } from "chart.js";

// Register chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Title, Tooltip);

interface ChartSectionProps {
  title: string; // Title for the chart
  data: ChartData<"bar">; // Chart data
  options: ChartOptions<"bar">; // Chart options
  className?: string; // Optional additional class for styling
}

const ChartSection: React.FC<ChartSectionProps> = ({ title, data, options, className }) => {
  return (
    <div className={`bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md mb-6 ${className || ""}`}>
      <h2 className="text-lg font-semibold mb-4 text-center sm:text-left">{title}</h2>
      <div className="w-full" style={{ height: "400px", maxWidth: "100%" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartSection;
