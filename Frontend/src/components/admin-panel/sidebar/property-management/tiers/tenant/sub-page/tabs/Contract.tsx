import DynamicTable from '@/components/admin-panel/UI-components/DynamicTable';
import HeaderSection from '@/components/admin-panel/UI-components/HeaderSection';
import { FilterOption, TenantBill, TenantContract } from '@/types/DataProps';
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
    { label: "Locative", accessor: "locative" },
    { label: "Type", accessor: "type" },
    { label: "Period", accessor: "period" },
    { label: "State", accessor: "state" },
    { label: "Create It", accessor: "createIt" },
    { label: "Deposit Amount", accessor: "depositAmount" },
    { label: "Paid", accessor: "paid" },
    {
      label: "Action",
      accessor: "action", // Render action buttons
    },
  ];
  interface DocumentProps{
    tenant_cases ?: TenantContract[]
  }
const Documents :React.FC<DocumentProps>= ({tenant_cases}) => {

  const data = tenant_cases?.map((tc)=>{
 return   {
      locative: tc.location,
      type: tc.contract_type,
      period: tc.entry_date,
      state: tc.status,
      createIt: tc.created_at,
      depositAmount: tc.deposit_amount+ " XOF",
      paid: tc.advance_amount+ " XOF",
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
      )
    }
 
  })??["Asdad"]

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
      <DynamicTable title="Plan of Auxiliary Accounts" columns={columns} data={data} pageSize={5} />
    </div>
    </div>
  );
};

export default Documents;
