import DynamicTable from '@/components/admin-panel/sidebar/profile/Settings/UI/DynamicTable';
import HeaderSection from '@/components/admin-panel/UI-components/HeaderSection';
import { FilterOption } from '@/types/DataProps';
import { Download, Edit, Eye, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';
import GoodCard from './GoodCard';
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
      locative: "YAO FERNAND BUILDING - APARTMENT N°A7",
      type: "HABITATION",
      period: "Due date in 730 days",
      state: "ACTIVE",
      createIt: "January 9, 2025 at 9:27:20 AM",
      depositAmount: "300,000 XOF",
      paid: "300,000 XOF",
      remaining: "0 XOF",
      action: (
        <>
          <button className="p-2 rounded-full bg-gray-300 text-white hover:bg-gray-400">
            <Eye size={18} />
          </button>
          <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
            <Edit size={18} />
          </button>
          <button className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600">
            <Upload size={18} />
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
    // Add more rows as necessary
  ];

  // Dummy data for properties
const propertyData = [
  {
    buildingName: 'DEMEBLE BUILDING',
    location: 'ANGRE - COCODY - ABIDJAN',
    status: 'For rent',
    occupiedValue: '150,000 XOF',
    availableValue: '250,000 XOF',
    reservedValue: '100,000 XOF',
    referenceNo: 'ZA-6972-9648-01',
  },
  {
    buildingName: 'BONDI BUILDING',
    location: 'ABIDJAN - RIVIERA',
    status: 'Sold',
    occupiedValue: '300,000 XOF',
    availableValue: '500,000 XOF',
    reservedValue: '200,000 XOF',
    referenceNo: 'ZA-6972-9648-02',
  },
  {
    buildingName: 'ROSE BUILDING',
    location: 'YOPALOGO - ABIDJAN',
    status: 'For rent',
    occupiedValue: '120,000 XOF',
    availableValue: '220,000 XOF',
    reservedValue: '150,000 XOF',
    referenceNo: 'ZA-6972-9648-03',
  },
  {
    buildingName: 'DEMEBLE BUILDING',
    location: 'ANGRE - COCODY - ABIDJAN',
    status: 'For rent',
    occupiedValue: '150,000 XOF',
    availableValue: '250,000 XOF',
    reservedValue: '100,000 XOF',
    referenceNo: 'ZA-6972-9648-01',
  },
];
  // Define the columns for the table
  const columns = [
    { label: "Locative", accessor: "locative" },
    { label: "Type", accessor: "type" },
    { label: "Period", accessor: "period" },
    { label: "State", accessor: "state" },
    { label: "Create It", accessor: "createIt" },
    { label: "Deposit Amount", accessor: "depositAmount" },
    { label: "Paid", accessor: "paid" },
    { label: "Remaining", accessor: "remaining" },
    {
      label: "Action",
      accessor: "action", // Render action buttons
    },
  ];
const GoodComponent = () => {
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
    <div className=" space-y-4">
      <h1  className='bg-secondary text-white p-1  text-center text-lg '>List of Properties</h1>
     {/* Filters or other components can be added here */}
     <div className="space-y-5 gap-5 grid grid-cols-3">
        {/* Render each property using the GoodCard component */}
        {propertyData.map((property, index) => (
          <GoodCard
            key={index}
            buildingName={property.buildingName}
            location={property.location}
            status={property.status}
            occupiedValue={property.occupiedValue}
            availableValue={property.availableValue}
            reservedValue={property.reservedValue}
            referenceNo={property.referenceNo}
          />
        ))}
      </div></div>
    </div>
  );
};

export default GoodComponent;
