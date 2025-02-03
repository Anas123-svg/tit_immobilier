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
          "ALL",
          "OWNER",
          "LOCATION",
          "REAL ESTATE PROGRAM",
          "SUBDIVISION PROJECT",
          "CRM"
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
 

  const data = [
    {
      select: (
        <input type="checkbox" className="form-checkbox" />
      ),
      locative: (
        <div className="flex items-center">
          <img
            src="https://app.zenapi.immo/assets/images/house-default.png" // Image URL
            alt="Building"
            className="w-16 h-16 object-cover rounded-md mr-4"
          />
          DEMEBLE BUILDING <br />
          <span className="text-xs text-gray-500">Surface area: 0 m²</span>
          <br />
          <span className="text-xs text-gray-500">Owner: DEMBELE BASSERIBA</span>
        </div>
      ),
      type: "Location",
      commission: "12%",
      amount: "180,120 XOF",
      state: (
        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
          VALID
        </span>
      ),
      createIt: "January 8, 2025 at 5:14:40 AM",
      action: (
        <>
          <button className="p-2 rounded-full bg-gray-300 text-white hover:bg-gray-400">
            <Eye size={18} />
          </button>
          <button className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600">
            <Edit size={18} />
          </button>
          <button className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600">
            <Download size={18} />
          </button>
          <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
            <Trash2 size={18} />
          </button>
        </>
      ),
    },
    {
      select: (
        <input type="checkbox" className="form-checkbox" />
      ),
      locative: (
        <div className="flex items-center">
          <img
            src="https://app.zenapi.immo/assets/images/house-default.png"
            alt="Building"
            className="w-16 h-16 object-cover rounded-md mr-4"
          />
          DEMEBLE BUILDING - APARTMENT N°A3 <br />
          <span className="text-xs text-gray-500">Surface area: 50 m²</span>
          <br />
          <span className="text-xs text-gray-500">Owner: DEMBELE BASSERIBA</span>
        </div>
      ),
      type: "Rent",
      commission: "8%",
      amount: "250,000 XOF",
      state: (
        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
          BUSY
        </span>
      ),
      createIt: "January 8, 2025 at 5:30:00 AM",
      action: (
        <>
          <button className="p-2 rounded-full bg-gray-300 text-white hover:bg-gray-400">
            <Eye size={18} />
          </button>
          <button className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600">
            <Edit size={18} />
          </button>
          <button className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600">
            <Download size={18} />
          </button>
          <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
            <Trash2 size={18} />
          </button>
        </>
      ),
    },
  // Total Row (Adding a total row to the bottom)
  {
    select: null,
    locative: "TOTAL",
    type: null,
    commission: null,
    amount: "430,120 XOF", // Sum of amounts
    state: null,
    createIt: null,
    action: null,
  },
  ];
  
  // Define the columns for the table
  const columns = [
    { label: "Select", accessor: "select" }, // Checkbox for row selection
    { label: "Good", accessor: "locative" },
    { label: "Type", accessor: "type" },
    { label: "Commission", accessor: "commission" },
    { label: "Amount", accessor: "amount" },
    { label: "State", accessor: "state" },
    { label: "Create It", accessor: "createIt" },
    { label: "Action", accessor: "action" }, // Action buttons for each row
  ];
const MandateComponent = () => {
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
      <DynamicTable  columns={columns} data={data} pageSize={5} addButton={false} />
    </div>
    </div>
  );
};

export default MandateComponent;
