

import { Edit2, Trash2, DollarSign } from 'lucide-react';

import DynamicTable from "../../UI/DynamicTable";


const Treasury = () => {
  const data:any = []

  const columns = [
    { label: "Label", accessor: "label" },
    { label: "Type", accessor: "type" },
    { label: "Number", accessor: "number" },
    { label: "Accounting Account", accessor: "accountingAccount" },
    { label: "Accounting Journal Code", accessor: "accountingJournalCode" },
    { label: "State", accessor: "state" },
    { label: "Pay", accessor: "", 
      render: () => (
        <>
          <button className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600">
            <DollarSign size={18} />
          </button>
        </>
      )
    },
    {
      label: "Actions",
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
  
    
    <DynamicTable title='Cash accounts' columns={columns} data={data} pageSize={5} />
      

    </div>
  );
};

export default Treasury;




