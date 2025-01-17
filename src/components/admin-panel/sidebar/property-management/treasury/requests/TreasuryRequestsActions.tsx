import React from "react";
import { ChevronDown } from "lucide-react";

interface TreasuryRequestsActionsProps {
  tools: { name: string; onClick: () => void }[];
}

const TreasuryRequestsActions: React.FC<TreasuryRequestsActionsProps> = ({
  tools,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Requests
      </button>

      {/* Tools Dropdown */}
      <div className="relative">
        <button className="px-4 py-2 bg-yellow-500 text-white rounded-md flex items-center">
          Tools
          <ChevronDown className="ml-2" size={16} />
        </button>
      </div>
    </div>
  );
};

export default TreasuryRequestsActions;
