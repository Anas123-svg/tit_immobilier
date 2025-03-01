import DynamicTable from '@/components/admin-panel/UI-components/DynamicTable';
import HeaderSection from '@/components/admin-panel/UI-components/HeaderSection';
import { FilterOption, TenantBill } from '@/types/DataProps';
import { Download, Edit, Eye, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';
// Filter options for the HeaderSection
  const filterOptions: FilterOption[] = [
  
      {
        type: "select",
        label: "Type",
        name: "type",
        options: [
          "RENT",
          "ENTREE",
          "PENALTY",
          "OTHER",
          "TERMINATION",
          "SHORT TERM INVOICE"
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
  // Define the columns for the table
  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Tenant ID", accessor: "tenant_id" },
    { label: "Contract ID", accessor: "contract_id" },
    { label: "Month", accessor: "month" },
    { label: "Rent", accessor: "rent" },
    { label: "Charge", accessor: "charge" },
    { label: "Total", accessor: "total" },
    { label: "Created At", accessor: "created_at" },
    { label: "Updated At", accessor: "updated_at" },
  ];
  
    interface BillsProps{
      tenant_bills ?: TenantBill[]
    }
const Bills: React.FC<BillsProps> = ({tenant_bills}) => {

  const data = tenant_bills?.map((tb)=>{
   return {
      id: tb.id,
      tenant_id: tb.tenant_id,
      contract_id:  tb.contract_id,
      month:  tb.month,
      rent:  tb.rent,
      charge:  tb.charge,
      total: tb.total,
      created_at: tb.created_at,
      updated_at:  tb.updated_at,
    }

  })??[]
    
  
    // Add more rows as needed
 
  
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
      <DynamicTable title="List of Bills" columns={columns} data={data} pageSize={5} addButton={false} />
    </div>
    </div>
  );
};

export default Bills;
