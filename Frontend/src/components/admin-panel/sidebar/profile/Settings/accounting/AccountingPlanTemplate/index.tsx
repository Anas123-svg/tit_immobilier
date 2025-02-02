
import DynamicTable from "../../../../../UI-components/DynamicTable";


const AccountingPlanTemplate = () => {
  const data:any = []

  const columns:any = [];

  return (
    <div className="space-y-5">
  
    
    <DynamicTable title='Account Plan Template' columns={columns} data={data} pageSize={5} />
      

    </div>
  );
};

export default AccountingPlanTemplate;




