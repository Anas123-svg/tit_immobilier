import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react"; // Importing ChevronRight icon from lucide-react

interface SubOption {
    name: string;
    path: string;
    icon: React.ComponentType; // Add the icon type
  }
  
  interface Option {
    name: string;
    subOptions: SubOption[];
  }
  
  interface SidebarProps {
    options: Option[];
  }
  

const SettingsSidebar: React.FC<SidebarProps> = ({ options }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4  ">
      {options.map((option, index) => (
        <div key={index} className="border rounded-lg shadow-lg min-h-[200px] bg-white">
          {/* Header for each section */}
          <h3 className="text-md font-bold p-3 border-b bg-primary rounded-tl-lg  rounded-tr-lg text-white">
            {option.name}
          </h3>

          {/* List of sub-options */}
          <ul className="space-y-2 p-3">
            {option.subOptions.map((subOption, idx) => (
              <li
                key={idx}
                onClick={() => navigate(subOption.path)}
                className="cursor-pointer border p-2 rounded-lg bg-gray-50 text-sm text-gray-700 hover:bg-secondary hover:text-white flex items-center space-x-2"
        
              >
                {/* Lucide Icon */}
              <subOption.icon/>
                <span>{subOption.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SettingsSidebar;
