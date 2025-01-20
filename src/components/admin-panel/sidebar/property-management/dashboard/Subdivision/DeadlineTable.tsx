import React, { useState } from "react";

const DeadlineTable: React.FC = () => {
  const data = [
    { period: "Jan 2025", forecast: "100 XOF", scheduled: "80 XOF", percentage: "80%" },
    { period: "Feb 2025", forecast: "200 XOF", scheduled: "150 XOF", percentage: "75%" },
    { period: "Mar 2025", forecast: "300 XOF", scheduled: "250 XOF", percentage: "83%" },
    { period: "Apr 2025", forecast: "400 XOF", scheduled: "350 XOF", percentage: "87%" },
    { period: "May 2025", forecast: "500 XOF", scheduled: "400 XOF", percentage: "80%" },
    { period: "Jun 2025", forecast: "600 XOF", scheduled: "500 XOF", percentage: "83%" },
    { period: "Jul 2025", forecast: "700 XOF", scheduled: "600 XOF", percentage: "85%" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the current page data
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="p-4 bg-white rounded-md shadow overflow-auto">
      <h3 className="text-lg font-bold mb-4">Deadline Table</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary-light border-primary  border-2 text-white" >
            <th className="p-2 border">Period</th>
            <th className="p-2 border">Schedule (Forecast)</th>
            <th className="p-2 border">Scheduled Schedule</th>
            <th className="p-2 border">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index} className="border-b">
              <td className="p-2 border">{row.period}</td>
              <td className="p-2 border">{row.forecast}</td>
              <td className="p-2 border">{row.scheduled}</td>
              <td className="p-2 border">{row.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-primary text-gray-50"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNext}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? "bg-gray-300" : "bg-primary text-gray-50"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DeadlineTable;
