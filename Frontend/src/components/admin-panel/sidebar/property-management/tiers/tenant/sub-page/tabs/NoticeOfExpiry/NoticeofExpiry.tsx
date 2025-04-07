import DynamicTable from '@/components/admin-panel/UI-components/DynamicTable';
import HeaderSection from '@/components/admin-panel/UI-components/HeaderSection';
import { FilterOption, NoticeOfExpiry } from '@/types/DataProps';
import { Download, Edit, Eye, RefreshCw, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';
import NoticeOfExpiryDialog from './NoticeOfExpiryDialog';
// Filter options for the HeaderSection
  const filterOptions: FilterOption[] = [
  
      {
        type: "select",
        label: "Type",
        name: "type",
        options: [
        "Notice"
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
    { label: "Dragonfly", accessor: "dragonfly" },
    { label: "Rent", accessor: "rent" },
    { label: "Amount", accessor: "amount" },
    { label: "Pay", accessor: "pay" },
    { label: "I Am Fine", accessor: "i_am_fine" },
    { label: "Action", accessor: "action" }, // Action buttons (view, delete, etc.)
  ];
 
   interface NoticeofExpiryProps{
    notice_of_expirey ?: NoticeOfExpiry[]
     handleReload?: ()=>void
      }
const NoticeofExpiry: React.FC<NoticeofExpiryProps> = ({notice_of_expirey,handleReload}) => {
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




  const data =  notice_of_expirey?.map((item) => {

   return {
      dragonfly: `Contract No. ${item.contract_id}`,
      rent: `Rent for ${item.month}`,
      amount: `${item.total} XOF`,
      pay: "0 XOF",
      i_am_fine: `${item.total} XOF`,
      action: (
        <>
       <NoticeOfExpiryDialog notice={item}/>
          <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
            <Edit size={18} />
          </button>
          <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
            <Trash2 size={18} />
          </button>
        </>
      ),
    };
   
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
      <DynamicTable title="List of Notice of Expiry" columns={columns} data={data} pageSize={5}  AddButton={
 <button
        onClick={handleReload}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
      >
        <RefreshCw/>
      </button>} />
    </div>
    </div>
  );
};

export default NoticeofExpiry;
