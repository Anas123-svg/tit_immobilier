import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ProspectLocationForm } from "./forms/ProspectLocationForm";
import { OfferLocationForm } from "./forms/OfferLocationForm";
import { NeedLocationForm } from "./forms/NeedLocationForm";
import { OfficialResponseLocationForm } from "./forms/OfficialResponseLocationForm";


const tools = [
    { name: "Print", onClick: () => console.log("Print") },
    { name: "Export", onClick: () => console.log("Export") },
    { name: "Import", onClick: () => console.log("Import") },
  ];
const LocationProspectActions = () => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const toggleToolsDropdown = () => {
    
    setIsToolsOpen(!isToolsOpen);
  };

  return (
    <div className="flex flex-col gap-5 md:flex-row  justify-between sm:items-center gpa-">
      {/* Main Actions */}
      <div className="flex gap-5 flex-wrap">
     <ProspectLocationForm/>
     <OfferLocationForm/>
     <NeedLocationForm/>
     <OfficialResponseLocationForm/>
      </div>
     
       {/* Tools Dropdown */}
      <div className="relative">
        <button
          onClick={toggleToolsDropdown}
          className="px-4 py-2 bg-orange-500 text-white rounded-md flex items-center"
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

export default LocationProspectActions;
