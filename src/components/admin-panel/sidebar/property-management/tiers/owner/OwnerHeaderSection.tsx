import React from "react";
import { Search, Calendar, ChevronRight } from "lucide-react"; // Importing relevant Lucide icons

interface Breadcrumb {
  name: string;
  path: string;
}

interface OwnerHeaderSectionProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

const OwnerHeaderSection: React.FC<OwnerHeaderSectionProps> = ({
  title,
  breadcrumbs,
}) => {
  return (
    <div className="bg-primary text-white p-6 rounded-md mb-6">
      {/* Breadcrumbs */}
      <p className="text-sm mb-2 flex items-center">
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
      <div className="grid grid-cols-5 gap-4 mt-4 text-black">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-white">Type</label>
          <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
            <option>OWNER</option>
            <option>COMPANY</option>
          </select>
        </div>

        {/* Reference Filter */}
        <div>
          <label className="block text-sm font-medium text-white">Reference No.</label>
          <input
            type="text"
            placeholder="EX: ZA-0000-0000-00"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Name/Company Filter */}
        <div>
          <label className="block text-sm font-medium text-white">Name / Company Name</label>
          <input
            type="text"
            placeholder="Name / Company Name"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Start Date Filter */}
        <div>
          <label className="block text-sm font-medium text-white">Start Date</label>
          <div className="relative">
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
            <Calendar size={16} className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* End Date Filter */}
        <div>
          <label className="block text-sm font-medium text-white">End Date</label>
          <div className="relative">
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
            <Calendar size={16} className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Filter Button */}
        <div className="flex items-end">
          <button className="bg-secondary text-white px-4 py-2 rounded-md flex items-center shadow hover:bg-secondary-dark transition">
            <Search size={16} className="mr-2" />
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerHeaderSection;
