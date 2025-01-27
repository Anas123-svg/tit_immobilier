import React from "react";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Tag,
  User,
  Home,
  Star,
  Building,
  House,
} from "lucide-react";

interface Breadcrumb {
  name: string;
  path: string;
}

interface TicketHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

const TicketHeader: React.FC<TicketHeaderProps> = ({ title, breadcrumbs }) => {
  const filters = [
    { name: "Reference", icon: <FileText size={16} /> },
    { name: "Category", icon: <Tag size={16} /> },
    { name: "Assigner", icon: <User size={16} /> },
    { name: "Tenant", icon: <Home size={16} /> },
    { name: "Owner", icon: <User size={16} /> },
    { name: "GOOD", icon: <Building size={16} /> },
    { name: "Rental", icon: <House size={16} /> },
    { name: "State", icon: <Star size={16} /> },
  ];

  return (
    <div className="p-6 bg-primary text-white rounded-md mb-6">
      {/* Breadcrumb Section */}
      <div className="mb-4">
        <p className="text-sm">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className=" items-center inline">
              <a href={crumb.path} className="hover:underline">
                {crumb.name}
              </a>
              {index < breadcrumbs.length - 1 && (
                <ChevronRight size={12} className="mx-2 inline" />
              )}
            </span>
          ))}
        </p>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold">{title}</h1>

      {/* Filters Section */}
      <div className="mt-4 flex  justify-between items-center bg-white text-black p-4 rounded-md shadow">
        {/* Filter Options */}
        <div className="flex gap-1 flex-wrap">
          {filters.map((filter, index) => (
            <div key={index} className="relative">
              <button className="bg-gray-100 text-sm px-4 py-2 rounded-md flex items-center text-gray-600 hover:bg-gray-200">
                <span className="mr-2">{filter.icon}</span>
                {filter.name}
                <ChevronDown size={16} className="ml-2" />
              </button>
            </div>
          ))}
        </div>

        {/* Filter and Add a Filter Actions */}
        <div className="flex gap-5 ">
          <button className="text-blue-500 hover:text-blue-700 text-sm flex items-center">
            + Add a filter
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
            <ChevronDown size={16} className="mr-2" />
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketHeader;
