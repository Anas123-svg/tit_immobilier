import DynamicTable from '@/components/admin-panel/UI-components/DynamicTable';
import HeaderSection from '@/components/admin-panel/UI-components/HeaderSection';
import { FilterOption, Mandate, OwnerMandate } from '@/types/DataProps';
import { Download, Edit, Eye, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { number, string } from 'zod';
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
  interface MandateComponentProps{
    mandates?:Mandate[]
  }
const MandateComponent:React.FC<MandateComponentProps> = ({mandates}) => {
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
  let total =0
  // Handle filter submission
  const handleFilterSubmit = () => {
    console.log("Filters submitted:", filterValues);
    // Add logic to filter data or make API calls based on filterValues
  };
  let data = mandates?.map((mandate)=>{

   total += mandate.commission*100
return   {
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
    <div className=""> {mandate.neighborhood} <br />
      <span className="text-xs text-gray-500">{mandate.type_of_property}</span>
      <br />
      <span className="text-xs text-gray-500">Owner id:{mandate.owner_id}</span>
    </div>
    </div> 
  ),
  type: mandate.type_of_mandate,
  commission: mandate.commission+"%",
  amount: <p className=''>{mandate.commission*100} XOF</p> ,
  state: (
    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
      {mandate.status}
    </span>
  ),
  createIt: mandate.created_at,
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
}
  })??[]
  
// Push the total object at the end of the data
data.push({
  select: <></>,
  locative: <p className=' text-lg font-bold'> TOTAL</p>,
  type: "",
  commission: "",
  amount: <p className='text-green-500 font-bold text-lg'> {total} XOF</p>, // Format the total amount
  state: <></>,
  createIt: "",
  action: <></>,
});

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
