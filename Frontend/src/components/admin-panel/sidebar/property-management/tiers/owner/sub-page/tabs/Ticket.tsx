import DynamicTable from '@/components/admin-panel/UI-components/DynamicTable';

    const data:any = [

  ];
  // Define the columns for the table
  const columns:any = [
 
  ];
const TicketComponent = () => {

  return (
    <div className='space-y-5'>
  
        <div className="space-y-5 overflow-x-auto">
      {/* Render the DynamicTable with the provided data and columns */}
      <DynamicTable title="List of Ticket" columns={columns} data={data} pageSize={5} addButton={false} />
    </div>
    </div>
  );
};

export default TicketComponent;
