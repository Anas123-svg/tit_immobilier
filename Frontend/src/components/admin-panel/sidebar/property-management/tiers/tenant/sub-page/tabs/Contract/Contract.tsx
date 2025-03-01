import DynamicTable from '@/components/admin-panel/UI-components/DynamicTable';
import HeaderSection from '@/components/admin-panel/UI-components/HeaderSection';
import { Contract, FilterOption, TenantBill } from '@/types/DataProps';
import { Download, Edit, Eye, Printer, RefreshCw, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';
import ContractDialog from './ContractDialogue';
import ContractTenantForm from '../../../forms/ContractTenantForm';
import DeleteContractDialog from './DeleteContract';
// Filter options for the HeaderSection
  const filterOptions: FilterOption[] = [
  
      {
        type: "select",
        label: "Type",
        name: "type",
        options: [
    "CONTRACT",
    "TERMINATION"
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
    tenant_cases ?: Contract[]
    handleReload?: ()=>void
  }
const Documents :React.FC<DocumentProps>= ({tenant_cases,handleReload}) => {

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
       <ContractDialog  contract={tc}/>
       <ContractTenantForm contract={tc} customBtn={ <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
            <Edit size={18} />
          </button>} />
         
          {/* <button className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600">
            <Printer size={18} />
          </button> */}
          {/* <button className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600">
            <Download size={18} />
          </button> */}

          <DeleteContractDialog contractId={tc?.id}/>

        </>
      )
    }
 
  })??[""]

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
      <DynamicTable title="Plan of Auxiliary Accounts" columns={columns} data={data} pageSize={5} AddButton={
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

export default Documents;
