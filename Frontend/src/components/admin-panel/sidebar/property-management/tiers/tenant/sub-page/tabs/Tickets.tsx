import DynamicTable from '@/components/admin-panel/UI-components/DynamicTable';

import { Download, Edit, Eye, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';

    const data:any = [
 
    // Add more rows as necessary
  ];
  // Define the columns for the table
  const columns :any = [

  ];
const Tickets = () => {
  // State to manage filters
    const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({
      type: "",
      startDate: "",
      endDate: "",
    });

  return (
    <div>
     
        <div className="space-y-5 overflow-x-auto">
      {/* Render the DynamicTable with the provided data and columns */}
      <DynamicTable title="List of Tickets" columns={columns} data={data} pageSize={5} addButton={false} />
    </div>
    </div>
  );
};

export default Tickets;
