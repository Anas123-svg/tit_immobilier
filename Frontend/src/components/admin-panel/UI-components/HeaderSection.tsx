import React, { useState } from "react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react"; // Icons for the buttons
import { FilterOption } from "@/types/DataProps";

interface Breadcrumb {
  name: string;
  path: string;
}

interface HeaderSectionProps {
  title?: string;
  breadcrumbs?: Breadcrumb[];
  filters?: FilterOption[];
  advancefilters?: FilterOption[];
  onFilterChange: (name: string, value: string) => void;
  onFilterSubmit: () => void;
  additionclassName?:string
  gridSize?:string
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  title,
  breadcrumbs,
  filters = [], // Default filters
  advancefilters = [], // Default advanced filters
  onFilterChange,
  onFilterSubmit,
  additionclassName="p-6",
  gridSize="5"
}) => {
  const [isAdvancedFiltersVisible, setIsAdvancedFiltersVisible] = useState(false);

  const toggleAdvancedFilters = () => {
    setIsAdvancedFiltersVisible((prev) => !prev);
  };

  return (
    <div className={`${additionclassName} bg-primary text-white  rounded-md space-y-5 relative  `}>
      {/* Breadcrumbs */}
      <div>
        <p className="text-sm">
          {breadcrumbs?.map((crumb, index) => (
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

      {/* Filters */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${gridSize} gap-4 text-black`}>
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
      </div>

     
      {/* Advanced Filters Section */}
      {isAdvancedFiltersVisible && (
     <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${gridSize} gap-4 text-black`}>
          {advancefilters.map((filter, index) => (
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
        </div>
      )}
       {/* Advanced Filters Toggle */}
      
    {/* Filter Submit Button */}
    <div className="flex flex-wrap gap-2 items-center  justify-end">  
      
    {advancefilters.length > 0 && (
        <div className="flex justify-between">
          {/* Advanced Filters Button */}
          <button
            className="flex items-center bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={toggleAdvancedFilters}
          >
            {isAdvancedFiltersVisible ? (
              <>
                <ChevronUp className="mr-2" /> Hide Advanced Filters
              </>
            ) : (
              <>
                <ChevronDown className="mr-2" /> Show Advanced Filters
              </>
            )}
          </button>

      
        </div>
      )}   <button
            className="flex items-center px-4 py-2  h-fit bg-secondary text-white  rounded hover:bg-secondary-dark"
            onClick={onFilterSubmit}
          >
            <Filter  /> Filter
          </button></div> 
    </div>
  );
};

export default HeaderSection;
