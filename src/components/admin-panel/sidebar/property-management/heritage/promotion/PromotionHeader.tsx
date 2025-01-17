import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Breadcrumb {
  name: string;
  path: string;
}

interface PromotionHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

const PromotionHeader: React.FC<PromotionHeaderProps> = ({ title, breadcrumbs }) => {
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

  const toggleAdvancedFilter = () => setIsAdvancedFilterOpen(!isAdvancedFilterOpen);

  return (
    <div className="bg-primary text-white p-6 rounded-md mb-6">
      <div className="mb-2">
        <p className="text-sm">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              <a href={crumb.path} className="hover:underline">
                {crumb.name}
              </a>
              {index < breadcrumbs.length - 1 && " > "}
            </span>
          ))}
        </p>
      </div>
      <h1 className="text-2xl font-semibold">{title}</h1>

      {/* Filters */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select className="w-full p-2 border rounded-md">
            <option>PROMOTION</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Reference No.</label>
          <input type="text" className="w-full p-2 border rounded-md" placeholder="EX: ZA-0000-0000-00" />
        </div>
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input type="date" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input type="date" className="w-full p-2 border rounded-md" />
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="flex justify-end mt-4">
        <button onClick={toggleAdvancedFilter} className="flex items-center text-sm font-medium text-white">
          {isAdvancedFilterOpen ? "Hide Advanced Filters" : "Show Advanced Filters"}
          {isAdvancedFilterOpen ? <ChevronUp className="ml-2" size={16} /> : <ChevronDown className="ml-2" size={16} />}
        </button>
      </div>

      {isAdvancedFilterOpen && (
        <div className="grid grid-cols-4 gap-4 mt-4 bg-white text-black p-4 rounded-md">
          <div>
            <label className="block text-sm font-medium">Availability</label>
            <select className="w-full p-2 border rounded-md">
              <option>Please Select</option>
              <option>Available</option>
              <option>Unavailable</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Created By</label>
            <select className="w-full p-2 border rounded-md">
              <option>Select User</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Creation Date</label>
            <input type="date" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium">Order</label>
            <select className="w-full p-2 border rounded-md">
              <option>Ascending</option>
              <option>Descending</option>
            </select>
          </div>
        </div>
      )}

      {/* Filter Button */}
      <div className="flex justify-end mt-4">
        <button className="bg-secondary text-white px-4 py-2 rounded-md shadow-md">Filter</button>
      </div>
    </div>
  );
};

export default PromotionHeader;
