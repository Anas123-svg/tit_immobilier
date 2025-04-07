import HeaderSection from '@/components/admin-panel/UI-components/HeaderSection';
import { Contract, FilterOption, Good, StateOfPlay } from '@/types/DataProps';

import React, { useState } from 'react';
import { CheckCircle, Download, Edit, Eye, Flag, RefreshCw, Trash2, Upload } from 'lucide-react';
import DynamicTable from '@/components/admin-panel/UI-components/DynamicTable';
import useFetchData from '@/hooks/useFetchData';
import DeleteStateOfPlayDialog from './DeleteStateofPlay';
import StateOfPlayDialog from './StateOfPlayDialog';

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

const columns = [
  { label: "Locative", accessor: "locative" },
  { label: "Type", accessor: "type" },
  { label: "State", accessor: "state" },
  {
    label: "Action",
    accessor: "action", // Render action buttons (eye, edit, check, upload, trash)
    // You can use custom rendering logic for this column when rendering the data in the table
  },
];


 interface StateofPlayProps{
    stateOfPlay ?: StateOfPlay[]
    handleReload?: ()=>void
  }
const StateofPlay :React.FC<StateofPlayProps>= ({stateOfPlay,handleReload}) => {


  const data = stateOfPlay?.map((item) => {
   


    // const { data:item.contract,loading } = useFetchData<Contract>(`${import.meta.env.VITE_API_URL}/api/tenant-item.contract/${item.contract_id}`)
    return   {
      locative: <div>
   
      <h2 id="property-name" className="text-md font-bold text-gray-800">
        {item.contract?.rent_property.property_name} - {item.contract?.rent_locative.rental_type} N°{item.contract?.rent_locative.door_number}
      </h2>
     
      <p className="text-gray-600">
        Surface area: 
        <span id="surface-area" className="font-medium">{item.contract?.rent_locative.area}m²</span> — 
        <span id="room-count" className="font-medium">{item.contract?.rent_locative.room}</span> room(s)
      </p>
    
      <p className="text-gray-600">
        Owner: 
        <span id="owner-name" className="font-medium">{item.contract?.rent_property.owner}</span>
      </p>
     
    </div>,
      type: item.state_type, // Adjust accordingly
      state: item.state.toUpperCase(), // Adjust accordingly (e.g., ACTIVE, WAITING)
      action: (
        <>
     <StateOfPlayDialog  stateOfPlay={item}/>
          {/* <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
            <Edit size={18} />
          </button>
          <button className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600">
            <CheckCircle size={18} />
          </button>
          <button className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600">
            <Upload size={18} />
          </button> */}
          <DeleteStateOfPlayDialog StateOfPlayId={item?.id}/>
        </>
      ),
    };
  }) ?? [];
  

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
      <DynamicTable title="LIST OF STATE REPORTS" columns={columns} data={data} pageSize={5} AddButton={
 <button
        onClick={handleReload}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
      >
        <RefreshCw/>
      </button>}/>
    </div>
    </div>
  );
};

export default StateofPlay;
