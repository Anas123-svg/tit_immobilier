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

  // Define the columns for the table
  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Tenant ID", accessor: "tenant_id" },
    { label: "Contract ID", accessor: "contract_id" },
    { label: "Type of Payment", accessor: "type_payment" },
    { label: "Treasury", accessor: "Treasury" },
    { label: "Payment Method", accessor: "payment_method" },
    { label: "Payment Date", accessor: "payment_date" },
    { label: "Done By", accessor: "done_by" },
    { label: "Other Name", accessor: "other_name" },
    { label: "Phone Number", accessor: "phone_no" },
    { label: "Transaction Details", accessor: "Transaction_details" },
    { label: "Amount", accessor: "amount" },
    { label: "Documents", accessor: "documents" },
    { label: "Created At", accessor: "created_at" },
    { label: "Updated At", accessor: "updated_at" },
    { label: "Action", accessor: "action" },
    
  ];
  
      interface PaymentsProps{
        tenant_payments ?: TenantPayment[]
      }
const Payments : React.FC<PaymentsProps> =({tenant_payments}) => {
  console.log(tenant_payments)
  const data = tenant_payments?.map((tp) => {
    return {
      id: tp?.id,
      tenant_id: tp?.tenant_id,
      contract_id: tp?.contract_id,
      type_payment: tp?.type_payment,
      Treasury: tp?.Treasury,
      payment_method: tp?.payment_method,
      payment_date: tp?.payment_date,
      done_by: tp?.done_by,
      other_name: tp?.other_name,
      phone_no: tp?.phone_no,
      Transaction_details: tp?.Transaction_details,
      amount: tp?.amount,
      documents: tp?.documents ? `Transaction ID: ${tp?.documents[0]??""}, Status: ${tp?.documents[1]}` : 'No documents',
      created_at: tp?.created_at,
      updated_at: tp?.updated_at,
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
      <DynamicTable title="List of Payments" columns={columns} data={data} pageSize={5} addButton={false} />
    </div>
    </div>
  );
};

export default Payments;
