import React from "react";
import { Plus, Wrench } from "lucide-react";

const ActionSection: React.FC = () => {
  return (
    <div className="flex justify-end gap-4 p-4 rounded-md mb-6">
      {/* Add Resource Button */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600">
        <Plus size={16} className="mr-2" />
        Add a resource
      </button>

      {/* Tools Dropdown */}
      <div className="relative">
        <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center hover:bg-primary-dark">
          <Wrench size={16} className="mr-2" />
          Tools
          <span className="ml-2">▼</span>
        </button>
        {/* Dropdown Menu */}
        <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg hidden group-hover:block">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Tool Option 1</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Tool Option 2</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Tool Option 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActionSection;
