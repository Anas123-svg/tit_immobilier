import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { CircularDiagramProps } from "@/types/DataProps";

// Register necessary chart elements
Chart.register(ArcElement, Tooltip, Legend);

// Props type for the component
interface CircularDiagramSectionProps {
  data: CircularDiagramProps;
}

const CircularDiagramSection: React.FC<CircularDiagramSectionProps> = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-semibold mb-4">
        Circular Diagram of Availability
      </h3>
      <div className="h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default CircularDiagramSection;
