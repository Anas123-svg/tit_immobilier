import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import AddTreasuryForm from "./forms/AddTreasuryForm";
import SupplyTreasuryForm from "./forms/SupplyTreasuryForm";

interface TreasuryActionsProps {
 
  tools: { name: string; onClick: () => void }[];
}

const TreasuryActions: React.FC<TreasuryActionsProps> = ({  tools }) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const toggleToolsDropdown = () => {
    setIsToolsOpen(!isToolsOpen);
  };
 const actions = [
  
  
    { name: "Account Statement", onClick: () => console.log("Account Statement"), className: "bg-yellow-500" },
  ];
  return (
    <div className="flex flex-col gap-5 sm:flex-row  justify-between lg:items-center ">
    {/* Main Actions */}
    <div className="flex gap-5 flex-wrap">
      <AddTreasuryForm/>
      <SupplyTreasuryForm/>
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
