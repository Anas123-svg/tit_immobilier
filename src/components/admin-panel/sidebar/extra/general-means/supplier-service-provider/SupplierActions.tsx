import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SupplierActionsProps {
  actions: { name: string; onClick: () => void; className: string }[];
  tools: { name: string; onClick: () => void }[];
}

const SupplierActions: React.FC<SupplierActionsProps> = ({ actions, tools }) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5 md:flex-row  justify-between sm:items-center ">
    {/* Main Actions */}
    <div className="flex gap-5 flex-wrap">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`px-4 py-2 text-white rounded-md ${action.className}`}
          >
            {action.name}
          </button>
        ))}
      </div>
      <div className="relative">
        <button
          onClick={() => setIsToolsOpen(!isToolsOpen)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md flex items-center"
        >
          Tools
          <ChevronDown className="ml-2" size={16} />
        </button>
        {isToolsOpen && (
          <div className="absolute right-0 mt-2 bg-white border shadow-md rounded-md w-40">
            {tools.map((tool, index) => (
              <button
                key={index}
                onClick={tool.onClick}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {tool.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierActions;
