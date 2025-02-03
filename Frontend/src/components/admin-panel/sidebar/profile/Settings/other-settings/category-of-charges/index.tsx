
import DynamicTable from '../../../../../UI-components/DynamicTable'; // Importing the refactored table

 

const CategorySettings = () => {
  const data:any = []

  const columns:any = [];

  return (
    <div className="space-y-5">
  
    
    <DynamicTable title='Category of Charges' columns={columns} data={data} pageSize={5} />
      

    </div>
  );
};

export default CategorySettings;




