import React from 'react';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import DynamicTable from '@/components/admin-panel/UI-components/DynamicTable';
import { AddStepForm } from './form/AddStepForm';

const ProspectingStage = () => {

  // Sample data for the table
  const data = [
    {
      label: "asd",
      createIt: "February 3, 2025 at 3:28:04 AM",
      action: (
        <>
          <button className="p-2 rounded-full bg-gray-300 text-white hover:bg-gray-400">
            <Eye size={18} />
          </button>
          <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
            <Edit2 size={18} />
          </button>
          <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
            <Trash2 size={18} />
          </button>
        </>
      ),
    },
    {
      label: "xyz",
      createIt: "February 1, 2025 at 6:02:49 AM",
      action: (
        <>
          <button className="p-2 rounded-full bg-gray-300 text-white hover:bg-gray-400">
            <Eye size={18} />
          </button>
          <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
            <Edit2 size={18} />
          </button>
          <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
            <Trash2 size={18} />
          </button>
        </>
      ),
    },
  ];

  // Define columns for the table
  const columns = [
    { label: "LABEL", accessor: "label" },
    { label: "CREATE IT", accessor: "createIt" },
    { label: "ACTION", accessor: "action" },  // Action buttons column
  ];

  return (
    <div className="p-4">

      {/* Dynamic Table Component */}
      <DynamicTable
        columns={columns}
        data={data}
        pageSize={5}
        title="Prospecting Stage"
        addButton={true}
        addBorder={true}
        AddButton={<AddStepForm/>}
      />
    </div>
  );
};

export default ProspectingStage;
