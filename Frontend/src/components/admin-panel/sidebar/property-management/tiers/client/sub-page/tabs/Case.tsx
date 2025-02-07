import DynamicTable from '@/components/admin-panel/UI-components/DynamicTable';
import HeaderSection from '@/components/admin-panel/UI-components/HeaderSection';
import { Case, FilterOption } from '@/types/DataProps';
import { Download, Edit, Eye, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';
// Filter options for the HeaderSection
  const filterOptions: FilterOption[] = [
  
      {
        type: "select",
        label: "Type",
        name: "type",
        options: [
         "Case"
        ]
      },
      {
        type: "text",
        label: "Reference No.",
        name: "referenceNo",
        placeholder: "EX: ZA-0000-0000-00"
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
  const caseColumns = [
    { label: "Customer Name", accessor: "customer_name" },
    { label: "Legal Status", accessor: "legal_status" },
    { label: "Contact", accessor: "contact" },
    { label: "Email", accessor: "email" },
    { label: "Opening Date", accessor: "opening_date" },
    { label: "Opening Reason", accessor: "opening_reason" },
    { label: "Business Manager", accessor: "business_manager" },
  
    {
      label: "Follow-Up Date",
      accessor: "additional_options.follow_up_date",
      render: (follow_up_date: string) => (
        <div style={{ color: "#34495e" }}>
          <strong>Follow-Up:</strong> {new Date(follow_up_date).toLocaleDateString()}
        </div>
      ),
    },
    {
      label: "Documents",
      accessor: "documents",
      render: (documents: { type: string; url: string }[]) => (
        <div>
          {documents.map((doc, index) => (
            <div key={index}>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#3498db", textDecoration: "underline" }}
              >
                {doc.type}
              </a>
            </div>
          ))}
        </div>
      ),
    },
    { label: "Opening Fee", accessor: "opening_fee" },
    { label: "Advance Amount", accessor: "advance_amount" },
    { label: "Created At", accessor: "created_at" },
    { label: "Updated At", accessor: "updated_at" },
  ];
  
  
  
  interface CaseProp{
    clientcase?:Case[]
  }
  const Documents: React.FC<CaseProp> = ({ clientcase }) => {
    const caseData:any = clientcase?.map((cc)=>{
      return {
        id: cc.id,
        client_id: cc.client_id,
        customer_name: cc.customer_name,
        legal_status: cc.legal_status,
        contact: cc.contact,
        email: cc.email,  // Assuming `cc.email` exists, otherwise leave static or modify as needed
        opening_date: cc.opening_date,
        opening_reason: cc.opening_reason,
        business_manager: cc.business_manager,
        digital_signature_of_file: cc.digital_signature_of_file,
        details: {
          industry: cc.details?.industry,  // Assuming `cc.details` exists, otherwise handle accordingly
          company_size: cc.details?.company_size,  // Assuming `cc.details` exists, otherwise handle accordingly
        },
        additional_options: {
          priority: cc.additional_options?.priority,  // Assuming `cc.additional_options` exists
          follow_up_date: cc.additional_options?.follow_up_date,  // Assuming `cc.additional_options` exists
        },
        documents: cc.documents?.map((doc) => ({
          type: doc.type,
          url: doc.url,
        })) || [],
        created_at: cc.created_at,
        updated_at: cc.updated_at,
        modality: cc.modality,
        opening_fee: cc.opening_fee,
        advance_amount: cc.advance_amount,
      };

    })
     
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
        gridSize={"4"}
        filters={filterOptions}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />
        <div className="space-y-5 overflow-x-auto">
      {/* Render the DynamicTable with the provided data and columns */}
      <DynamicTable columns={caseColumns} data={caseData} pageSize={5} addButton={false} />;
    </div>
    </div>
  );
};

export default Documents;
