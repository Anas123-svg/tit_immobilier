

import { Edit2, Trash2 } from "lucide-react";
import DynamicTable from "../../UI/DynamicTable";


const ExpenseReports = () => {
  const data:any = []

  const columns = [
    { label: "CODE", accessor: "code" },
    { label: "LABEL", accessor: "label" },
    { label: "PAYS", accessor: "pays" },
    { label: "ACCOUNTING CODE", accessor: "accountingCode" },
    { label: "STATE", accessor: "state" },
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
  
    
    <DynamicTable title='Plan of auxiliary accounts' addButton={false} columns={columns} data={data} pageSize={5} />
      

    </div>
  );
};

export default ExpenseReports;




