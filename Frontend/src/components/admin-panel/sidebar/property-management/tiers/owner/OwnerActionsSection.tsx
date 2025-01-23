import React from "react";
import { Plus, PenTool } from "lucide-react";

const OwnerActionsSection: React.FC = () => {
  return (
    <div className="flex justify-end space-x-4 mb-6">
      <button className="bg-secondary text-white px-4 py-2 rounded flex items-center">
        <Plus size={16} className="mr-2" />
        Add
      </button>
      <button className="bg-primary text-white px-4 py-2 rounded flex items-center">
        <PenTool size={16} className="mr-2" />
        Tools
      </button>
    </div>
  );
};

export default OwnerActionsSection;
