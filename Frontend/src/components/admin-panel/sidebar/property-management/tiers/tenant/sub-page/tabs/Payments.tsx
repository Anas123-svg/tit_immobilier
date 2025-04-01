import DynamicTable from '@/components/admin-panel/UI-components/DynamicTable';
import HeaderSection from '@/components/admin-panel/UI-components/HeaderSection';
import { FilterOption, TenantPayment } from '@/types/DataProps';
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
  const data = [
    {
      locative: "YAO FERNAND BUILDING - STUDIO N°A5",
      invoice_number: "ZA-6972-2162-01",
      state: "AWAITING CONFIRMATION",
      invoice_concerned: "November 2019 rent invoice",
      date: "February 28, 2025",
      amount: "150,000 XOF",
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
    },
    {
      locative: "YAO FERNAND BUILDING - STUDIO N°A5",
      invoice_number: "ZA-6972-8894-01",
      state: "AWAITING CONFIRMATION",
      invoice_concerned: "September 2019 rent invoice",
      date: "February 28, 2025",
      amount: "150,000 XOF",
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
    },
    {
      locative: "YAO FERNAND BUILDING - STUDIO N°A5",
      invoice_number: "ZA-6972-5052-01",
      state: "AWAITING CONFIRMATION",
      invoice_concerned: "October 2019 rent invoice",
      date: "February 28, 2025",
      amount: "150,000 XOF",
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
    },
    {
      locative: "YAO FERNAND BUILDING - STUDIO N°A5",
      invoice_number: "ZA-6972-0808-01",
      state: "AWAITING CONFIRMATION",
      invoice_concerned: "August 2019 rent invoice",
      date: "February 28, 2025",
      amount: "150,000 XOF",
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
    },
    {
      locative: "YAO FERNAND BUILDING - STUDIO N°A5",
      invoice_number: "ZA-6972-7594-01",
      state: "CONFIRMED",
      invoice_concerned: "Entrance invoice for the YAO FERNAND BUILDING Door No. A5",
      date: "August 5, 2019",
      amount: "240,000 XOF",
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
    },
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
