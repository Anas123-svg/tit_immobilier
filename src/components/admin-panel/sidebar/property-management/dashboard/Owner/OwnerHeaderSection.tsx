import React from "react";

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

      {/* Filter Section */}
      <div className="flex space-x-4 mt-4">
        <div className="flex-1">
          <label className="block text-sm">Type</label>
          <select className="w-full p-2 border rounded">
            <option>ALL</option>
            <option>Type 1</option>
            <option>Type 2</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm">Owner</label>
          <select className="w-full p-2 border rounded">
            <option>Select an item</option>
            <option>Owner 1</option>
            <option>Owner 2</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm">Start Date</label>
          <input type="date" className="w-full p-2 border rounded" />
        </div>
        <div className="flex-1">
          <label className="block text-sm">End Date</label>
          <input type="date" className="w-full p-2 border rounded" />
        </div>
        <div className="flex items-end">
          <button className="bg-secondary text-white px-4 py-2 rounded">
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerHeaderSection;
