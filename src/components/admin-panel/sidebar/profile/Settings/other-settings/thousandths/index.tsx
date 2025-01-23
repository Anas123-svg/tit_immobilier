import React, { useState } from 'react';
import DynamicTable from '../../UI/DynamicTable'; // Ensure DynamicTable is imported correctly
import { Trash2 } from 'lucide-react';

const initialData = new Array(10).fill(null).map((_, index) => ({
  code: `ZA-9960-8969-0${index + 1}`,
  dragonfly: 'GENERALS',
  status: 'General',
  createdAt: 'March 2, 2024 at 6:51:31 AM'
}));

const ThousandthsSettings = () => {
  const [data, setData] = useState(initialData);

  const columns = [
    { label: "CODE", accessor: "code" },
    { label: "DRAGONFLY", accessor: "dragonfly" },
    { label: "STATUS", accessor: "status" },
    { label: "CREATE IT", accessor: "createdAt" },
    {
      label: "ACTIONS",
      accessor: "",
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
 
     <DynamicTable title='Types of Thousandths' columns={columns} data={data} pageSize={5} />


  );
};

export default ThousandthsSettings;
