import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ProspectSalesForm } from "./forms/ProspectSalesForm";
import { NeedSalesForm } from "./forms/NeedSalesForm";
import { OfferSalesForm } from "./forms/OfferSalesForm";
import { PaymentSalesForm } from "./forms/PaymentSalesForm";
import { CommercialActionSalesForm } from "./forms/CommercialActionSalesForm";


  const tools = [
    { name: "Print", onClick: () => console.log("Print") },
    { name: "Export", onClick: () => console.log("Export") },
    { name: "Import", onClick: () => console.log("Import") },
    { name: "Generate", onClick: () => console.log("Generate") },
  ];
const SalesProspectActions = () => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const toggleToolsDropdown = () => {
    setIsToolsOpen(!isToolsOpen);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-5">
    
<ProspectSalesForm/>
<NeedSalesForm/>
<CommercialActionSalesForm/>
<PaymentSalesForm/>

<OfferSalesForm/>
</div>
      {/* Tools Dropdown */}
      <div className="relative">
        <button
          onClick={toggleToolsDropdown}
          className="px-4 py-2 bg-primary text-white rounded-md flex items-center"
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

export default SalesProspectActions;
