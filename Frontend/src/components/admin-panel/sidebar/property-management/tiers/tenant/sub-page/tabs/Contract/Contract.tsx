import DynamicTable from '@/components/admin-panel/UI-components/DynamicTable';
import HeaderSection from '@/components/admin-panel/UI-components/HeaderSection';
import { Contract, FilterOption, Good, Owner, TenantBill, TenantContract } from '@/types/DataProps';
import { Download, Edit, Eye, Printer, RefreshCw, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';
import ContractDialog from './ContractDialogue';
import ContractTenantForm from '../../../forms/ContractTenantForm';
import DeleteContractDialog from './DeleteContract';
import useFetchData from '@/hooks/useFetchData';
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
    tenant_cases ?: TenantContract[]
    handleReload?: ()=>void
  }
const Documents :React.FC<DocumentProps>= ({tenant_cases,handleReload}) => {






  const data = tenant_cases?.map((tc)=>{
    // const {
    //   data: owner,
   
    //   error,
    // } = useFetchData<Owner>(
    //   `${import.meta.env.VITE_API_URL}/api/owners/${tc.owner_id}`
    // );
    // const { data: property   ,loading } = useFetchData<Good>(`${import.meta.env.VITE_API_URL}/api/owner-rent-properties/${tc.concerned}`)
 return    {
      locative: <div>
   
      <h2 id="property-name" className="text-md font-bold text-gray-800">
        {tc.rent_property?.property_name} - {tc.rent_locative.rental_type} N°{tc.rent_locative.door_number}
      </h2>
     
      <p className="text-gray-600">
        Surface area: 
        <span id="surface-area" className="font-medium">{tc.rent_locative.area}m²</span> — 
        <span id="room-count" className="font-medium">{tc.rent_locative.room}</span> room(s)
      </p>
    
      <p className="text-gray-600">
        Owner: 
        <span id="owner-name" className="font-medium">{tc.owner?.is_business_owner ? tc.owner?.business_company_name : tc.owner?.private_name}</span>
      </p>
     
    </div>
    
    ,
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
