import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Breadcrumb {
  name: string;
  path: string;
}

interface SalesProspectHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

const SalesProspectHeader: React.FC<SalesProspectHeaderProps> = ({
  title,
  breadcrumbs,
}) => {
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

  const toggleAdvancedFilter = () => {
    setIsAdvancedFilterOpen(!isAdvancedFilterOpen);
  };

  return (
    <div className="bg-primary text-white p-6 rounded-md mb-6">
      {/* Breadcrumbs */}
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

      {/* Title */}
      <h1 className="text-2xl font-semibold">{title}</h1>

      {/* Basic Filter Section */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select className="w-full p-2 border rounded-md">
            <option>PROSPECT</option>
            <option>CUSTOMER</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Reference No.</label>
          <input
            type="text"
            placeholder="EX: ZA-0000-0000-00"
            className="w-full p-2 border rounded-md"
          />
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

      {/* Advanced Filter Toggle */}
      <div className="flex justify-end mt-4">
        <button
          onClick={toggleAdvancedFilter}
          className="flex items-center text-sm font-medium text-white hover:underline focus:outline-none"
        >
          {isAdvancedFilterOpen ? "Hide Advanced Filters" : "Show Advanced Filters"}
          {isAdvancedFilterOpen ? (
            <ChevronUp className="ml-2" size={16} />
          ) : (
            <ChevronDown className="ml-2" size={16} />
          )}
        </button>
      </div>

      {/* Advanced Filter Section */}
      {isAdvancedFilterOpen && (
        <div className="grid grid-cols-4 gap-4 mt-4 p-4 bg-white text-black rounded-md shadow-md">
          <div>
            <label className="block text-sm font-medium">MIN Amount</label>
            <input
              type="number"
              placeholder="MIN Amount"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">MAX Amount</label>
            <input
              type="number"
              placeholder="MAX Amount"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Created By</label>
            <select className="w-full p-2 border rounded-md">
              <option>Select User</option>
              <option>User 1</option>
              <option>User 2</option>
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
          <div>
            <label className="block text-sm font-medium">Results Per Page</label>
            <select className="w-full p-2 border rounded-md">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
      )}

      {/* Filter Button */}
      <div className="flex justify-end mt-4">
        <button className="bg-secondary text-white px-4 py-2 rounded-md shadow-md">
          Filter
        </button>
      </div>
    </div>
  );
};

export default SalesProspectHeader;
