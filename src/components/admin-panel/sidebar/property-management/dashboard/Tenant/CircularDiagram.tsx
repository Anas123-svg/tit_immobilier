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
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow rounded-md h-[300px] w-1/2">
      <h3 className="text-lg font-semibold mb-4">Circular Diagram of Amounts</h3>
      <div className="  w-full">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default CircularDiagram;
