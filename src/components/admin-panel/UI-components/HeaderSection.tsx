import React from "react";
import { filterOptions } from "@/data/dummyData";

interface Breadcrumb {
  name: string;
  path: string;
}

interface HeaderSectionProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ title, breadcrumbs }) => {
  return (
    <div className="bg-primary text-white p-6 rounded-md mb-6">
      <div className="mb-2">
        {/* Breadcrumbs */}
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

      {/* Filter Section */}
      <div className="flex space-x-4 mt-4 text-black">
        <div className="flex-1">
          <label className="block text-sm text-white">Type</label>
          <select className="w-full p-2 border rounded">
  {filterOptions.type.map((option: string, index: number) => (
    <option key={index} value={option}>
      {option}
    </option>
  ))}
</select>

        </div>
        <div className="flex-1 ">
          <label className="block text-sm text-white">Start Date</label>
          <input type="date" className="w-full p-2 border rounded" />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-white">End Date</label>
          <input type="date" className="w-full p-2 border rounded" />
        </div>
        <div className="flex items-end">
          <button className="bg-secondary text-white px-4 py-2 rounded">Filter</button>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
