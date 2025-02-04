import React, { useState } from "react";

interface DynamicTableProps {
  title: string;
  data: any[];
  itemsPerPage: number;
  headerColor:string
}

const DynamicTable: React.FC<DynamicTableProps> = ({ title, data, itemsPerPage,  headerColor }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Pagination logic
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="p-4 bg-white rounded-md shadow overflow-auto">
     <div className="w-fit"> <h3 className="text-lg font-bold mb-4">{title}</h3>
      <table className=" " style={{ borderSpacing: "0 10px" }}>
        <thead>
          <tr className={` ${headerColor} text-white ` }>
            {headers.map((header) => (
              <th key={header} className="p-2 text-left capitalize">
                {header.replace(/([A-Z])/g, " $1")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, rowIndex) => (
            <tr key={rowIndex} className="bg-white shadow rounded-md">
              {headers.map((header) => (
                <td key={header} className="p-2 border">
                  {item[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 w-fit  gap-5 ">
        <button
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          disabled={currentPage === 1}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      </div>
    </div>
  );
};

export default DynamicTable;
