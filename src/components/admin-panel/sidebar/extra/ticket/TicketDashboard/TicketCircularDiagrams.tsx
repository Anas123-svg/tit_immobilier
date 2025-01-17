import React from "react";
import CircularDiagram from "./CircularDiagram";

const TicketCircularDiagrams: React.FC = () => {
  // const availabilityData = {
  //   labels: ["To make", "In progress", "Closed"],
  //   datasets: [
  //     {
  //       data: [0, 0, 0],
  //       backgroundColor: ["#3B82F6", "#34D399", "#F87171"],
  //     },
  //   ],
  // };

  // const interventionData = {
  //   labels: ["Planned", "Stopped", "Finished"],
  //   datasets: [
  //     {
  //       data: [0, 0, 0],
  //       backgroundColor: ["#FCD34D", "#6B7280", "#059669"],
  //     },
  //   ],
  // };

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <CircularDiagram

      />
      <CircularDiagram
   
      />
    </div>
  );
};

export default TicketCircularDiagrams;
