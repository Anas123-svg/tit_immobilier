import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

const CircularDiagram: React.FC = () => {
  const data = {
    labels: ["Outstanding", "Paid", "Total"],
    datasets: [
      {
        data: [72, 22, 96],
        backgroundColor: ["#F87171", "#34D399", "#3B82F6"],
      },
    ],
  };

  // Explicitly type the options object
  const options: ChartOptions<"doughnut"> = {
    maintainAspectRatio: false,
    responsive: true,
    cutout: "50%", // Adjust the inner radius (default for a doughnut is 50%)
    radius: "60%", // Increase the size of the chart
    plugins: {
      legend: {
        position: "top", // Use a valid position value
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow rounded-md h-[300px] w-1/2">
      <h3 className="text-lg font-semibold mb-4">Circular Diagram of Amounts</h3>
      <div className="w-full h-full">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default CircularDiagram;
