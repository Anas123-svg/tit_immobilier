import React from "react";

interface Breadcrumb {
  name: string;
  path: string;
}

interface SubdivisionDashboardHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

const SubdivisionDashboardHeader: React.FC<SubdivisionDashboardHeaderProps> = ({
  title,
  breadcrumbs,
}) => {
  return (
    <div className="bg-primary text-white p-6 rounded-md mb-6">
      {/* Breadcrumb Navigation */}
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

      {/* Filters Section */}
      <div className="flex space-x-4 mt-4">
        {/* Type Filter */}
        <select className="p-2 border rounded w-1/4">
          <option>ALL</option>
          <option>Residential</option>
          <option>Commercial</option>
        </select>

        {/* Subdivision Input */}
        <input
          type="text"
          placeholder="Subdivision"
          className="p-2 border rounded w-1/4"
        />

        {/* Start Date Filter */}
        <input type="date" className="p-2 border rounded w-1/4" />

        {/* End Date Filter */}
        <input type="date" className="p-2 border rounded w-1/4" />

        {/* Filter Button */}
        <button className="bg-secondary text-white px-4 py-2 rounded">
          Filter
        </button>
      </div>
    </div>
  );
};

export default SubdivisionDashboardHeader;
