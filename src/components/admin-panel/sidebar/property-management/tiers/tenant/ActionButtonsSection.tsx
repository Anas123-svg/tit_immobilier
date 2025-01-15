// ActionButtonsSection.tsx
import React from "react";
import { PlusCircle, PenTool, RefreshCw } from "lucide-react";

const ActionButtonsSection: React.FC = () => {
  return (
    <div className="flex justify-end space-x-4 mt-4">
      <button className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600">
        <RefreshCw size={16} />
        <span>Generation</span>
      </button>
      <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
        <PlusCircle size={16} />
        <span>Add</span>
      </button>
      <button className="flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600">
        <PenTool size={16} />
        <span>Tools</span>
      </button>
    </div>
  );
};

export default ActionButtonsSection;