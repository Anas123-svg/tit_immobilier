import React from "react";

interface Breadcrumb {
  name: string;
  path: string;
}

interface PromotionDashboardHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

const PromotionDashboardHeader: React.FC<PromotionDashboardHeaderProps> = ({
  title,
  breadcrumbs,
}) => {
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
      <div className="flex space-x-4 mt-4">
        <select className="p-2 border rounded w-1/4">
          <option>ALL</option>
          <option>Type 1</option>
          <option>Type 2</option>
        </select>
        <input type="text" placeholder="Promotion" className="p-2 border rounded w-1/4" />
        <input type="date" className="p-2 border rounded w-1/4" />
        <input type="date" className="p-2 border rounded w-1/4" />
        <button className="bg-secondary text-white px-4 py-2 rounded">Filter</button>
      </div>
    </div>
  );
};

export default PromotionDashboardHeader;
