

import { Edit2, Trash2 } from "lucide-react";
import DynamicTable from "../../../../../UI-components/DynamicTable";


const Products = () => {
  const data:any = []

  const columns = [
    { label: "REF", accessor: "ref" },
    { label: "LABEL", accessor: "label" },
    { label: "VAT RATE", accessor: "vatRate" },
    { label: "DEDICATED CURRENT ACCOUNT", accessor: "dedicatedAccount" },
    { label: "NEW ACCOUNT TO ASSIGN", accessor: "newAccount" },
    {
      label: "ACTIONS",
      accessor: "",
      render: () => (
        <>
          <button className="p-2 mr-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
            <Edit2 size={18} />
          </button>
          <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
            <Trash2 size={18} />
          </button>
        </>
      )
    }
  ];
  

  return (
    <div className="space-y-5">
  
    
    <DynamicTable title='Products' addButton={false} columns={columns} data={data} pageSize={5} />
      

    </div>
  );
};

export default Products;




