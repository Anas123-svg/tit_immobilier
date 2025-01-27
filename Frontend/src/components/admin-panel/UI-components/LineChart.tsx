import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { ChartJSOrUndefined } from "react-chartjs-2/dist/types";


// Register all necessary Chart.js components
Chart.register(...registerables);

interface LineChartProps {
  title: string; // Chart title
  data: ChartData<"line">; // Chart data
  options?: ChartOptions<"line">; // Optional chart options
}

const LineChart: React.FC<LineChartProps> = ({ title, data, options }) => {
  // Correctly type the ref to match react-chartjs-2 requirements
  const chartRef = useRef<ChartJSOrUndefined<"line">>(null);

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
