import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit2, Trash2, Eye } from 'lucide-react';
import EmptyState from '@/components/admin-panel/UI-components/EmptyState';

// Props types for more clarity and maintenance
interface ColumnConfig {
  label: string;
  accessor: string; // Maps to the key from the data object
  render?: (data: any) => JSX.Element; // Optional render function for custom cell content
}

interface DynamicTableProps {
  columns: ColumnConfig[];
  data: any[];
  pageSize: number;
  title?: string
  addButton?:boolean
  addBorder?:boolean
}

const DynamicTable: React.FC<DynamicTableProps> = ({ columns, data, pageSize, title="",addButton=true,addBorder=true }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  // Calculate current page data
  const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (


    <div className=" p-4 rounded-lg  shadow-lg border-2 bg-gray-50">
      <div className={`flex justify-between items-center mb-4 ${addBorder?"border-b-2":""}  pb-5 `}>
        <h1 className="text-2xl font-semibold text-gray-700 capitalize">{title}</h1>
       {addButton && <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">Add+</button>
}</div>
      <div className=" overflow-auto">
        {columns.length > 0 ? <table className=" min-w-[600px] lg:w-full    text-sm text-left text-gray-500 border border-gray-300">
          <thead className="text-xs uppercase bg-secondary text-white">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="py-3 px-6 border-b-2 border-gray-300">{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              currentData.map((item, rowIndex) => (
                <tr key={rowIndex} className={`bg-white hover:bg-gray-100 border-b ${rowIndex % 2 === 0 ? "bg-gray-50" : ""}`}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="py-4 px-6 border-r">
                      {column.render ? column.render(item[column.accessor]) : item[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )
              : <tr>
                <td colSpan={columns.length}>
                  <EmptyState message={title} />
                </td>
              </tr>}</tbody>
        </table> : <EmptyState message={title} />
        }   <div className="flex min-w-[600px]   lg:w-full  justify-between items-center mt-4 ">
        <span>Showing item {pageSize * (currentPage - 1) + 1} to {Math.min(pageSize * currentPage, data.length)} of {data.length} items</span>
        <div className="btn-group flex gap-5 ">
          <button className="btn" onClick={() => handlePageChange(1)}>First</button>
          <button className="btn" onClick={() => handlePageChange(currentPage - 1)}>
            <ChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`btn ${currentPage === i + 1 ? "bg-primary text-white w-9 h-9 p-1 rounded-full" : ""}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button className="btn" onClick={() => handlePageChange(currentPage + 1)}>
            <ChevronRight />
          </button>
          <button className="btn" onClick={() => handlePageChange(totalPages)}>Last</button>
        </div>
      </div></div>
    
    </div>

  );
};

export default DynamicTable;
