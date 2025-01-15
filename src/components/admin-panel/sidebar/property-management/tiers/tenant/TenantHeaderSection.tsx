// TenantHeaderSection.tsx
import React from "react";
import { Search, Calendar, ChevronRight } from "lucide-react";

interface Breadcrumb {
  name: string;
  path: string;
}

interface TenantHeaderSectionProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

const TenantHeaderSection: React.FC<TenantHeaderSectionProps> = ({
  title,
  breadcrumbs,
}) => {
  return (
    <div className="bg-primary text-white p-6 rounded-md mb-6">
      {/* Breadcrumbs */}
      <p className="text-sm mb-2 flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="flex items-center">
            <a href={crumb.path} className="hover:underline">
              {crumb.name}
            </a>
            {index < breadcrumbs.length - 1 && (
              <ChevronRight size={12} className="mx-1" />
            )}
          </span>
        ))}
      </p>

      {/* Title */}
      <h1 className="text-2xl font-semibold">{title}</h1>

      {/* Filter Section */}
      <div className="grid grid-cols-6 gap-4 mt-4">
        <div>
          <label className="block text-sm">Type</label>
          <select className="w-full p-2 border rounded text-black">
            <option>TENANT</option>
            <option>CONTRACT</option>
            <option>SHORT TERM CONTRACT</option>
            <option>PAYMENT</option>
            <option>RENT</option>
            <option>ENTRY INVOICE</option>
            <option>WARNING ECHEANCE</option>
            <option>PENALTY</option>
            <option>OTHER INVOICES</option>
            <option>STATE OF PLAY</option>
            <option>RENEWAL</option>
            <option>EXTENSION</option>
            <option>TERMINATION</option>
          </select>
        </div>

        <div>
          <label className="block text-sm">Reference No.</label>
          <input
            type="text"
            placeholder="EX: ZA-0000-0000-00"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Name / Company Name</label>
          <input
            type="text"
            placeholder="Name / Company Name"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Owner</label>
          <select className="w-full p-2 border rounded text-black">
            <option>Select an item</option>
          </select>
        </div>

        <div>
          <label className="block text-sm">Name of the property</label>
          <select className="w-full p-2 border rounded text-black">
            <option>Select an item</option>
          </select>
        </div>

        <div>
          <label className="block text-sm">Start Date</label>
          <div className="relative">
            <input type="date" className="w-full p-2 border rounded text-black" />
            <Calendar size={16} className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm">End Date</label>
          <div className="relative">
            <input type="date" className="w-full p-2 border rounded text-black" />
            <Calendar size={16} className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>

        <div className="flex items-end">
          <button className="bg-secondary text-white px-4 py-2 rounded flex items-center">
            <Search size={16} className="mr-2" />
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantHeaderSection;
