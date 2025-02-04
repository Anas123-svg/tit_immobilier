import HeaderSection from '@/components/admin-panel/UI-components/HeaderSection';
import { FilterOption } from '@/types/DataProps';

import React, { useState } from 'react';
import { Download, Edit, Eye, Flag, Trash2, Upload } from 'lucide-react';
import DynamicTable from '@/components/admin-panel/UI-components/DynamicTable';

interface EmergencyContactProps {
  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyContactRelation: string;
}
const filterOptions: FilterOption[] = [
  
  {
    type: "select",
    label: "Type",
    name: "type",
    options: [
     "Mutations"
    ]
  },
  {
    type: "text",
    label: "Reference No.",
    name: "referenceNo",
    placeholder: "EX: ZA-0000-0000-00"
  },
  {
    type: "text",
    label: "File No.",
    name: "file-no",
    placeholder: "File Number"
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
const data:any[] = [
   
  // Add more rows as necessary
];
// Define the columns for the table
const columns:any[] = [
  
];
const Mutations = () => {

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
      <DynamicTable addButton={false} columns={columns} data={data} pageSize={5} />
    </div>
    </div>
  );
};

export default Mutations;
