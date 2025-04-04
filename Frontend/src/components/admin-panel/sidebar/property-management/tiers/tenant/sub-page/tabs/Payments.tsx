import DynamicTable from '@/components/admin-panel/UI-components/DynamicTable';
import HeaderSection from '@/components/admin-panel/UI-components/HeaderSection';
import useFetchData from '@/hooks/useFetchData';
import { Contract, FilterOption, TenantPayment } from '@/types/DataProps';
import { Download, Edit, Edit2, Eye, Trash2, Upload } from 'lucide-react';
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

  const columns = [
    { label: "Locative", accessor: "locative" },
    { label: "Invoice Number", accessor: "invoice_number" },
    { label: "State", accessor: "state" },
    { label: "Invoice Concerned", accessor: "invoice_concerned" },
    { label: "Date", accessor: "date" },
    { label: "Amount", accessor: "amount" },
    { label: "Action", accessor: "action" },
  ];
 
  
  
      interface PaymentsProps{
        tenant_payments ?: TenantPayment[]
      }






const Payments : React.FC<PaymentsProps> =({tenant_payments}) => {

 
   
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






  const data = tenant_payments?.map((item) => {
    const { data:contract,loading } = useFetchData<Contract>(`${import.meta.env.VITE_API_URL}/api/tenant-contract/${item.contract_id}`)
      
 return loading? {}:  {
  locative: <div>
   
  <h2 id="property-name" className="text-md font-bold text-gray-800">
    {contract?.rent_property.property_name} - {contract?.rent_locative.rental_type} N°{contract?.rent_locative.door_number}
  </h2>
 
  <p className="text-gray-600">
    Surface area: 
    <span id="surface-area" className="font-medium">{contract?.rent_locative.area}m²</span> — 
    <span id="room-count" className="font-medium">{contract?.rent_locative.room}</span> room(s)
  </p>

  <p className="text-gray-600">
    Owner: 
    <span id="owner-name" className="font-medium">{contract?.rent_property.owner}</span>
  </p>
 
</div>, 
  invoice_number: item.invoice_number,
      state: item.state,
      invoice_concerned:item.payment_date+ " rent invoice",
      date: item.payment_date,
      amount: item.amount+ " XOF",
      action: (
        <>
          <button className="p-2 rounded-full bg-gray-300 text-white hover:bg-gray-400">
            <Eye size={18} />
          </button>
          <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
            <Trash2 size={18} />
          </button>
          <button className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600">
            <Edit size={18} />
          </button>
        </>
      ),
    }

}) ?? [];





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
      <DynamicTable title="List of Payments" columns={columns} data={data} pageSize={5} addButton={false} />
    </div>
    </div>
  );
};

export default Payments;
