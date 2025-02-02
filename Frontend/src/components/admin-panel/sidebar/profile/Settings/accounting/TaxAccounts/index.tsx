
import DynamicTable from "../../../../../UI-components/DynamicTable";


const TaxAccounts = () => {
  const data:any = []

  const columns:any = [];

  return (
    <div className="space-y-5">
  
    
    <DynamicTable title='Tax accounts' columns={columns} data={data} pageSize={5} />
      

    </div>
  );
};

export default TaxAccounts;




