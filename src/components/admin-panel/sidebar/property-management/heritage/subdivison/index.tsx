import React, { useState } from "react";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import SubdivisionActions from "./SubdivisionActions";
import SubdivisionEmptyState from "./SubdivisionEmptyState";
import { FilterOption } from "@/types/DataProps";

const SubdivisionHeritage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const actions = [
    { name: "Subdivision", onClick: () => console.log("Subdivision"), className: "bg-blue-500" },
    { name: "Island", onClick: () => console.log("Island"), className: "bg-gray-500" },
    { name: "Lot", onClick: () => console.log("Lot"), className: "bg-teal-500" },
  ];

  const tools = [
    { name: "Print", onClick: () => console.log("Print") },
    { name: "Export", onClick: () => console.log("Export") },
    { name: "Import", onClick: () => console.log("Import") },
  ];

  // Basic Filters
  const filters: FilterOption[] = [
    {
      type: "select",
      label: "Type",
      name: "type",
      options: ["SUBDIVISION"],
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

  // Advanced Filters
  const advancedFilters: FilterOption[] = [
    {
      type: "select",
      label: "Type of Subdivision",
      name: "subdivisionType",
      options: ["Please select", "Type 1", "Type 2", "Type 3"],
    },
    {
      type: "select",
      label: "Availability?",
      name: "availability",
      options: ["Please select", "Available", "Unavailable"],
    },
    {
      type: "select",
      label: "Created By",
      name: "createdBy",
      options: ["Select User", "User 1", "User 2"],
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
  ];

  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});

  // Handle changes in filters
  const handleFilterChange = (name: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle filter submission
  const handleFilterSubmit = () => {
    console.log("Filter values:", filterValues);
  };

  return (
    <div className="p-2 sm:p-6 space-y-10 bg-gray-100 min-h-screen">
      {/* Header Section with Filters */}
      <HeaderSection
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
        title="Subdivision"
        filters={filters}
        advancefilters={advancedFilters}
        breadcrumbs={[
          { name: "Heritage", path: "/heritage" },
          { name: "Subdivision", path: "/heritage/subdivision" },
        ]}
      />

      {/* Subdivision Actions */}
      <SubdivisionActions actions={actions} tools={tools} />

      {/* Data Display */}
      {data.length === 0 ? (
        <SubdivisionEmptyState message="No subdivision found" />
      ) : (
        <div>{/* Table/List Component */}</div>
      )}
    </div>
  );
};

export default SubdivisionHeritage;
