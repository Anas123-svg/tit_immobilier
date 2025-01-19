import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartOptions, ChartData } from "chart.js";

interface CircularDiagramProps {
  title: string; // Chart title
  data: ChartData<"doughnut">; // Chart data
  options?: ChartOptions<"doughnut">; // Optional chart configuration
  height?: string; // Optional height for the chart
  width?: string; // Optional width for the chart
}

const CircularDiagram: React.FC<CircularDiagramProps> = ({
  title,
  data,
  options,
  height = "400px",
  width = "100%",
}) => {
  // Default chart options if none are provided
  const defaultOptions: ChartOptions<"doughnut"> = {
    maintainAspectRatio: false,
    responsive: true,
    cutout: "50%", // Adjust the inner radius
    plugins: {
      legend: {
        position: "top", // Valid position value
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow rounded-md w-full">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <div style={{ height, width }}>
        <Doughnut data={data} options={options || defaultOptions} />
      </div>
    </div>
  );
};

export default CircularDiagram;
