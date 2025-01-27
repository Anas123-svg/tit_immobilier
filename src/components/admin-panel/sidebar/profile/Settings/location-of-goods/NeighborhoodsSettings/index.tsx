

import React, { useState } from 'react';
import DynamicTable from '../../UI/DynamicTable'; // Ensure DynamicTable is imported correctly
import { Eye, Pen, Trash2 } from 'lucide-react';

// Initial data with more relevant country details
const initialData = [
  { label: 'BINGERVILLE', createdAt: 'December 28, 2021 at 2:38:15 AM' },
  { label: 'BINGERVILLE', createdAt: 'December 28, 2021 at 2:38:15 AM' },
  { label: 'COCODY', createdAt: 'December 28, 2021 at 2:38:15 AM' },
  { label: 'Algeria', createdAt: 'December 28, 2021 at 2:38:15 AM' },
  { label: 'Germany', createdAt: 'December 28, 2021 at 2:38:15 AM' },
  { label: 'Andorra', createdAt: 'December 28, 2021 at 2:38:15 AM' },
  { label: 'Angola', createdAt: 'December 28, 2021 at 2:38:15 AM' }
];

const NeighborhoodsSettings = () => {
  const [data, setData] = useState(initialData);

  const columns = [
    { label: "LABEL", accessor: "label" }, // Matches "LABEL"
    { label: "CREATED ON", accessor: "createdAt" }, // Matches "CREATED ON"
    {
      label: "ACTION",
      accessor: "",
      render: () => ( // Modify render to use item if needed, currently just static
        <>
          <button className="p-2 mr-2 rounded-full bg-gray-500 text-white hover:bg-gray-600">
            <Eye size={18} />
          </button>
          <button className="p-2  mr-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
            <Pen size={18} />
          </button>
          <button className="p-2  mr-2 rounded-full bg-red-500 text-white hover:bg-red-600">
            <Trash2 size={18} />
          </button>
        </>
      )
    }
  ];

  return (
    <DynamicTable title='Neighborhood'  columns={columns} data={data} pageSize={5} />
  );
};

export default NeighborhoodsSettings;
