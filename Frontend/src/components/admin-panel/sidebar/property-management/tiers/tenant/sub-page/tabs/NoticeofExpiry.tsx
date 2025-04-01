import DynamicTable from '@/components/admin-panel/UI-components/DynamicTable';
import HeaderSection from '@/components/admin-panel/UI-components/HeaderSection';
import { FilterOption } from '@/types/DataProps';
import { Download, Edit, Eye, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';
// Filter options for the HeaderSection
  const filterOptions: FilterOption[] = [
  
      {
        type: "select",
        label: "Type",
        name: "type",
        options: [
        "Notice"
        ]
      },
      {
        type: "text",
        label: "Reference No.",
        name: "referenceNo",
        placeholder: "EX: ZA-0000-0000-00"
      },
      {
        type: "select",
        label: "Owner",
        name: "owner",
        options: ["Select an item"]
      },
      {
        type: "select",
        label: "Name of the Property",
        name: "propertyName",
        options: ["Select an item"]
      },
      {
        type: "date",
        label: "Start Date",
        name: "startDate"
      },
      {
        type: "date",
        label: "End Date",
        name: "endDate"
      }
  
  ];
 
  // Define the columns for the table
  const columns = [
    { label: "Dragonfly", accessor: "dragonfly" },
    { label: "Rent", accessor: "rent" },
    { label: "Amount", accessor: "amount" },
    { label: "Pay", accessor: "pay" },
    { label: "I Am Fine", accessor: "i_am_fine" },
    { label: "Action", accessor: "action" }, // Action buttons (view, delete, etc.)
  ];
  const data = [
    {
      dragonfly: "Contract No. ZA-6972-4144-01",
      rent: "Rent from April 2025",
      amount: "9,750,000 XOF",
      pay: "0 XOF",
      i_am_fine: "150,000 XOF",
      action: (
        <>
          <button className="p-2 rounded-full bg-gray-300 text-white hover:bg-gray-400">
            <Eye size={18} />
          </button>
          <button className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600">
            <Edit size={18} />
          </button>
          <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
            <Trash2 size={18} />
          </button>
        </>
      ),
    },
    {
      dragonfly: "Contract No. ZA-6972-4144-01",
      rent: "Rent for March 2025",
      amount: "10,200,000 XOF",
      pay: "0 XOF",
      i_am_fine: "150,000 XOF",
      action: (
        <>
          <button className="p-2 rounded-full bg-gray-300 text-white hover:bg-gray-400">
            <Eye size={18} />
          </button>
          <button className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600">
            <Edit size={18} />
          </button>
          <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
            <Trash2 size={18} />
          </button>
        </>
      ),
    },
    {
      dragonfly: "Contract No. ZA-6972-4144-01",
      rent: "February 2025 rent",
      amount: "10,050,000 XOF",
      pay: "0 XOF",
      i_am_fine: "150,000 XOF",
      action: (
        <>
          <button className="p-2 rounded-full bg-gray-300 text-white hover:bg-gray-400">
            <Eye size={18} />
          </button>
          <button className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600">
            <Edit size={18} />
          </button>
          <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
            <Trash2 size={18} />
          </button>
        </>
      ),
    },
    {
      dragonfly: null,
      rent: "Total",
      amount: "30,000,000 XOF",
      pay: "0 XOF",
      i_am_fine: "450,000 XOF",
      action: null, // No action for the total row
    },
  ];
  
const NoticeofExpiry = () => {
  // State to manage filters
    const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({
      type: "",
      startDate: "",
      endDate: "",
    });
  // Handle filter value changes
  const handleFilterChange = (name: string, value: string) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle filter submission
  const handleFilterSubmit = () => {
    console.log("Filters submitted:", filterValues);
    // Add logic to filter data or make API calls based on filterValues
  };
  return (
    <div className='space-y-5'>
       <HeaderSection
        gridSize={"5"}
        filters={filterOptions}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />
        <div className="space-y-5 overflow-x-auto">
      {/* Render the DynamicTable with the provided data and columns */}
      <DynamicTable title="List of Notice of Expiry" columns={columns} data={data} pageSize={5} addButton={false} />
    </div>
    </div>
  );
};

export default NoticeofExpiry;
