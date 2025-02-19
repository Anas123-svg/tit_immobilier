import DynamicTable from '@/components/admin-panel/UI-components/DynamicTable';
import HeaderSection from '@/components/admin-panel/UI-components/HeaderSection';
import { FilterOption, Good, Locative } from '@/types/DataProps';
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
  

  const columns = [
    { label: "Good", accessor: "good" }, // This will represent the building name and image
    { label: "Occupant", accessor: "occupant" },
    { label: "State", accessor: "state" },
    { label: "Create It", accessor: "createIt" },
    { label: "Rent", accessor: "noRent" },

  ];
  
interface LocativeComponentProps{
  goods?:Good[]
}
const LocativeComponent:React.FC<LocativeComponentProps> = ({goods}) => {
 
  const data = goods?.map((good)=>{
   return {
    good: (
          <div className="flex items-center">
            <img
              src="https://app.zenapi.immo/assets/images/house-default.png" // Image URL
              alt="Building"
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            {good.property_name} - {good.type_of_property} {good.sodeci_identifier_number}
          </div>
        ),
        occupant: good.owner,
        state: (
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
       {good.status}
          </span>
        ),
        createIt: good.created_at,
        noRent:  " XOF",
      
      }
  })??[]
    //
    // {
    //   good: (
    //     <div className="flex items-center">
    //       <img
    //         src="https://app.zenapi.immo/assets/images/house-default.png" // Image URL
    //         alt="Building"
    //         className="w-16 h-16 object-cover rounded-md mr-4"
    //       />
    //       DEMEBLE BUILDING - APARTMENT N°B3
    //     </div>
    //   ),
    //   occupant: "No Occupants",
    //   state: (
    //     <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
    //       AVAILABLE
    //     </span>
    //   ),
    //   createIt: "January 8, 2025 at 4:55:28 AM",
    //   noRent: "175,000 XOF",
   
    // },
 
  
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
      <DynamicTable title="LIST OF RENTAL PROPERTIES" columns={columns} data={data} pageSize={5} addButton={false} />
    </div>
    </div>
  );
};

export default LocativeComponent;
