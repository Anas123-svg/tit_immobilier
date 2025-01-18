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
    cutout: "50%", // Adjust the inner radius
    plugins: {
      legend: {
        position: "top", // Explicitly use a valid position value
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow rounded-md h-[500px] w-[600px] mx-auto">
      <h3 className="text-lg font-semibold mb-4">Circular Diagram of Amounts</h3>
      <div className="h-[400px] w-full">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default CircularDiagram;
