
import { Trash2 } from "lucide-react";
import DynamicTable from "../../../../../UI-components/DynamicTable";


const AuxiliaryAccountPlans = () => {
  const data:any = []

  const columns = [
    { label: "Account Number", accessor: "accountNumber" },
    { label: "Dragonfly", accessor: "dragonfly" },
    { label: "Libellé Court", accessor: "shortLabel" }, // Assuming 'Libellé Court' means 'Short Label'
    {
      label: "Actions",
      accessor: "", // accessor is empty because actions are not directly related to data fields
      render: () => (
        <>
          <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
            <Trash2 size={18} />
          </button>
        </>
      )
    }
  ];

  return (
    <div className="space-y-5">
  
    
    <DynamicTable title='Plan of auxiliary accounts' columns={columns} data={data} pageSize={5} />
      

    </div>
  );
};

export default AuxiliaryAccountPlans;




