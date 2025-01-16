import React from "react";
import { Doughnut } from "react-chartjs-2";

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

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    cutout: "50%", // Adjust the inner radius (default for a doughnut is 50%)
    radius: "60%", // Increases the size of the chart
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow rounded-md h-[500px] w-[600px] mx-auto">
      <h3 className="text-lg font-semibold mb-4">Circular Diagram of Amounts</h3>
      <div className="h-full w-full">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default CircularDiagram;
