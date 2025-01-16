import React from "react";

interface Breadcrumb {
  name: string;
  path: string;
  
}

interface HeaderSectionProps {
  
    title: string;
  breadcrumbs: Breadcrumb[];
}

const TenantDashboardHeader: React.FC<HeaderSectionProps> = ({ title, breadcrumbs }) => {
  return (
    <div className="bg-primary text-white p-6 rounded-md mb-6 shadow">
      {/* Breadcrumbs */}
      <div className="mb-2">
        <p className="text-sm flex items-center">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center">
              <a href={crumb.path} className="hover:underline">
                {crumb.name}
              </a>
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2">{" > "}</span>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold">{title}</h1>

      {/* Filter Section */}
      <div className="grid grid-cols-5 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select className="w-full p-2 border rounded shadow">
            <option>ALL</option>
            <option>Type 1</option>
            <option>Type 2</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Owner</label>
          <select className="w-full p-2 border rounded shadow">
            <option>Select an item</option>
            <option>Owner 1</option>
            <option>Owner 2</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded shadow"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded shadow"
          />
        </div>

        <div className="flex items-end">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow">
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboardHeader;
