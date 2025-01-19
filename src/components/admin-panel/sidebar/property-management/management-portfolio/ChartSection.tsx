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

const ChartSection: React.FC = () => {
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
        label: "Commission",
        data: [15000, 12000, 13000, 14000, 15000],
        backgroundColor: "#4F46E5",
        borderColor: "#4F46E5",
        borderWidth: 1,
        barPercentage: 0.8, // Adjust bar width
        categoryPercentage: 0.9, // Adjust spacing
      },
      {
        label: "Tax",
        data: [8000, 9000, 8500, 8700, 8900],
        backgroundColor: "#F59E0B",
        borderColor: "#F59E0B",
        borderWidth: 1,
        barPercentage: 0.8,
        categoryPercentage: 0.9,
      },
      {
        label: "Spent",
        data: [6000, 5500, 5900, 5700, 6000],
        backgroundColor: "#EF4444",
        borderColor: "#EF4444",
        borderWidth: 1,
        barPercentage: 0.8,
        categoryPercentage: 0.9,
      },
      {
        label: "Registration Fee",
        data: [2000, 2500, 2200, 2300, 2100],
        backgroundColor: "#9C27B0",
        borderColor: "#9C27B0",
        borderWidth: 1,
        barPercentage: 0.8,
        categoryPercentage: 0.9,
      },
      {
        label: "Insurance",
        data: [3000, 2800, 2900, 3000, 3100],
        backgroundColor: "#22C55E",
        borderColor: "#22C55E",
        borderWidth: 1,
        barPercentage: 0.8,
        categoryPercentage: 0.9,
      },
      {
        label: "Tax Stamps",
        data: [1000, 1200, 1100, 900, 800],
        backgroundColor: "#6B7280",
        borderColor: "#6B7280",
        borderWidth: 1,
        barPercentage: 0.8,
        categoryPercentage: 0.9,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
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
        text: "Portfolio Representation Diagram",
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const rawValue = tooltipItem.raw as number; // Explicitly cast raw to number
            return `${tooltipItem.dataset.label}: ${rawValue.toLocaleString()} XOF`;
          },
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
          stepSize: 500,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4 text-center sm:text-left">
        Portfolio Representation Diagram
      </h2>
      <div className="w-full" style={{ height: "400px", maxWidth: "100%" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartSection;
