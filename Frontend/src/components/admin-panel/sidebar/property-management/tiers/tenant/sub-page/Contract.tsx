import HeaderSection from '@/components/admin-panel/UI-components/HeaderSection';
import { FilterOption } from '@/types/DataProps';
import React, { useState } from 'react';
// Filter options for the HeaderSection
  const filterOptions: FilterOption[] = [
    {
      type: "select",
      label: "Type",
      name: "type",
      options: ["ALL", "OWNER", "LOCATION", "REAL ESTATE PROGRAM", "SUBDIVISION PROJECT", "CRM"],
    },
    {
      type: "date",
      label: "Start Date",
      name: "startDate",
    },
    {
      type: "date",
      label: "End Date",
      name: "endDate",
    },
  ];
  
const Documents = () => {
  // State to manage filters
    const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({
      type: "",
      startDate: "",
      endDate: "",
    });
  // Handle filter value changes
  const handleFilterChange = (name: string, value: string) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle filter submission
  const handleFilterSubmit = () => {
    console.log("Filters submitted:", filterValues);
    // Add logic to filter data or make API calls based on filterValues
  };
  return (
    <div>
       <HeaderSection
        title="Principal"
        breadcrumbs={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Principal", path: "/dashboard/principal" },
        ]}
        filters={filterOptions}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />
    </div>
  );
};

export default Documents;
