import React, { useState } from "react";
import LocationProspectActions from "./LocationProspectActions";
import LocationProspectEmptyState from "./LocationProspectEmptyState";
import { FilterOption } from "@/types/DataProps";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";

const LocationProspect: React.FC = () => {
  const [data, setData] = useState<any[]>([]);


  
const filters:FilterOption[] = [
  {
    type: "select",
    label: "Type",
    name: "type",
    options: ["PROSPECT"],
  },
  {
    type: "text",
    label: "Reference No.",
    name: "referenceNumber",
    placeholder: "EX: ZA-0000-0000-00",
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
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});

const advancedFilters: FilterOption[] = [
  {
    type: "number",
    label: "MIN Amount",
    name: "minAmount",
    placeholder: "MIN Amount",
  },
  {
    type: "number",
    label: "MAX Amount",
    name: "maxAmount",
    placeholder: "MAX Amount",
  },
  {
    type: "select",
    label: "Created By",
    name: "createdBy",
    options: ["Selector"],
  },
  {
    type: "date",
    label: "Creation Date",
    name: "creationDate",
  },
  {
    type: "select",
    label: "Order",
    name: "order",
    options: ["Ascending", "Descending"],
  },
  {
    type: "select",
    label: "Results Per Page",
    name: "resultsPerPage",
    options: ["10", "25", "50"],
  },
];// Handle changes in filters
const handleFilterChange = (name: string, value: string) => {
  setFilterValues((prev) => ({ ...prev, [name]: value }));
};

// Handle filter submission
const handleFilterSubmit = () => {
  console.log("Filter values:", filterValues);
};

  return (
    <div className="p-2 sm:p-6 space-y-10 bg-gray-100 min-h-screen">
      <HeaderSection
      onFilterChange={handleFilterChange}
      onFilterSubmit={handleFilterSubmit}
        title="Prospect Location"
        filters={filters}
        advancefilters={advancedFilters}
        breadcrumbs={[
          { name: "CRM", path: "/crm" },
          { name: "Prospect Location", path: "/crm/prospect-location" },
        ]}
      />

      <LocationProspectActions />

      {data.length === 0 ? (
        <LocationProspectEmptyState message="You have not defined a process for rental prospects" />
      ) : (
        <div>{/* Table or list for data goes here */}</div>
      )}
    </div>
  );
};

export default LocationProspect;
