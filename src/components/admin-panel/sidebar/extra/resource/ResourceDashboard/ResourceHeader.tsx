import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Breadcrumb {
  name: string;
  path: string;
}

interface ResourceHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

const ResourceHeader: React.FC<ResourceHeaderProps> = ({ title, breadcrumbs }) => {
  return (
    <div className="p-6 bg-primary text-white rounded-md mb-6">
      {/* Breadcrumb Section */}
      <div className="mb-4">
        <p className="text-sm flex items-center">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center">
              <a href={crumb.path} className="hover:underline">
                {crumb.name}
              </a>
              {index < breadcrumbs.length - 1 && (
                <ChevronRight size={16} className="mx-2" />
              )}
            </span>
          ))}
        </p>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold">{title}</h1>

      {/* Filters Section */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium">Kind</label>
          <select className="w-full p-2 border rounded-md">
            <option>ALL</option>
            <option>Type A</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Resource</label>
          <input type="text" className="w-full p-2 border rounded-md" placeholder="Resource" />
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
      <div className="flex justify-end mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Filter</button>
      </div>
    </div>
  );
};

export default ResourceHeader;
