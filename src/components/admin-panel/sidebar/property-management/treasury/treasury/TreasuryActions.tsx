import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface TreasuryActionsProps {
  actions: { name: string; onClick: () => void; className: string }[];
  tools: { name: string; onClick: () => void }[];
}

const TreasuryActions: React.FC<TreasuryActionsProps> = ({ actions, tools }) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const toggleToolsDropdown = () => {
    setIsToolsOpen(!isToolsOpen);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      {/* Main Actions */}
      <div className="flex gap-4">
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

      {/* Tools Dropdown */}
      <div className="relative">
        <button
          onClick={toggleToolsDropdown}
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

export default TreasuryActions;
