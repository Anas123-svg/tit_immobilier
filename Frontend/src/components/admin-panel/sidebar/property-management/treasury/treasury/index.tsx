import React, { useState } from "react";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import TreasuryActions from "./TreasuryActions";
import TreasuryList from "./TreasuryList";
import { FilterOption } from "@/types/DataProps";

const TreasuryComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);


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
      options: ["Treasury","Supply","Transaction"],
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
      type: "text",
      label: "Name / Company Name",
      name: "companyName",
      placeholder: "Name / Company Name",
    },
    {
      type: "select",
      label: "Created By",
      name: "createdBy",
      options: ["Select User", "User 1", "User 2"],
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
        title="Treasury"
        filters={filters}
        advancefilters={advancedFilters}
        breadcrumbs={[
          { name: "Treasury", path: "/treasury" },
          { name: "Treasury", path: "/treasury/treasury" },
        ]}
      />

      {/* Treasury Actions */}
      <TreasuryActions tools={tools} />

      {/* Data Display */}
      {data.length === 0 ? (
        <TreasuryList />
      ) : (
        <div>{/* List or Cards for data */}</div>
      )}
    </div>
  );
};

export default TreasuryComponent;
