import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartJSOrUndefined } from "react-chartjs-2/dist/types";

// Register all necessary Chart.js components
Chart.register(...registerables);

const LineChart: React.FC<{ title: string }> = ({ title }) => {
  // Correctly type the ref to match react-chartjs-2 requirements
  const chartRef = useRef<ChartJSOrUndefined<"line">>(null);

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
      {
        label: "Pay Remaining",
        data: [50, 100, 75, 150],
        borderColor: "#F87171",
        backgroundColor: "rgba(248, 113, 113, 0.2)",
        tension: 0.4,
        fill: true,
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

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Destroy the chart instance to avoid canvas conflicts
      }
    };
  }, []);

  return (
    <div className="p-4 bg-white rounded-md shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div style={{ height: "300px" }}>
        {/* Pass the ref to the Line component */}
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
