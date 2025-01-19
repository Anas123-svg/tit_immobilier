import React from "react";
import { FilterOption } from "@/types/DataProps";

interface Breadcrumb {
  name: string;
  path: string;
}

interface HeaderSectionProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  filters?: FilterOption[]; // Optional filters with default value
  onFilterChange: (name: string, value: string) => void;
  onFilterSubmit: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  title,
  breadcrumbs,
  filters = [], // Default value
  onFilterChange,
  onFilterSubmit,
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

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 sm:space-y-0 mt-4 text-black">
        {filters.map((filter, index) => (
          <div className="flex-1" key={index}>
            <label className="block text-sm text-white">{filter.label}</label>
            {filter.type === "select" && filter.options && (
              <select
                className="w-full p-2 border rounded"
                name={filter.name}
                onChange={(e) => onFilterChange(filter.name, e.target.value)}
              >
                {filter.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {(filter.type === "date" || filter.type === "text" || filter.type === "number") && (
              <input
                className="w-full p-2 border rounded"
                type={filter.type}
                name={filter.name}
                placeholder={filter.placeholder || ""}
                onChange={(e) => onFilterChange(filter.name, e.target.value)}
              />
            )}
          </div>
        ))}
        <div className="flex items-end">
          <button
            className="bg-secondary text-white px-4 py-2 rounded"
            onClick={onFilterSubmit}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
