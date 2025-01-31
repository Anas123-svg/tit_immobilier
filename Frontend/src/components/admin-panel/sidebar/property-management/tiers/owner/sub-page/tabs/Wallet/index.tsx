import DynamicTable from '@/components/admin-panel/sidebar/profile/Settings/UI/DynamicTable';
import HeaderSection from '@/components/admin-panel/UI-components/HeaderSection';
import { FilterOption } from '@/types/DataProps';
import { Download, Edit, Eye, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';
import StatisticCardsLayout from './StatisticCardsLayout';
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
    const data:any = [
    
    // Add more rows as necessary
  ];
  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Date", accessor: "date" },
    { label: "Dragonelle", accessor: "dragonelle" },
    { label: "Speed", accessor: "speed" },
    { label: "Credit", accessor: "credit" },
    { label: "Pay", accessor: "pay" },
  ];
  
const WalletComponent = () => {
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
        <StatisticCardsLayout/>
      {/* Render the DynamicTable with the provided data and columns */}
      <DynamicTable title="Transaction History" columns={columns} data={data} pageSize={5} addButton={false} />
  
    </div>
    </div>
  );
};

export default WalletComponent;
