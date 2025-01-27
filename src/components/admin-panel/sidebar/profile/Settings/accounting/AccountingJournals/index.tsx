import DynamicTable from "../../UI/DynamicTable";


const AccountingJournals = () => {
  const data:any = []

  const columns:any = [];

  return (
    <div className="space-y-5">
  
    
    <DynamicTable title='Dictionaries - Accounting journals' columns={columns} data={data} pageSize={5} />
      

    </div>
  );
};

export default AccountingJournals;




