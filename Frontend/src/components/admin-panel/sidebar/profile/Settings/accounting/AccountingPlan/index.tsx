
import DynamicTable from "../../../../../UI-components/DynamicTable";


const AccountingPlan = () => {
  const data:any = []

  const columns:any = [];

  return (
    <div className="space-y-5">
  
    
    <DynamicTable title='Accounting accounts' columns={columns} data={data} pageSize={5} />
      

    </div>
  );
};

export default AccountingPlan;




