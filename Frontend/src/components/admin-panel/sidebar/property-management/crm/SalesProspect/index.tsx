import React, { useState } from "react";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import SalesProspectActions from "./SalesProspectActions";
import SalesProspectEmptyState from "./SalesProspectEmptyState";
import { FilterOption } from "@/types/DataProps";

const SalesProspect: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

 


  // Basic Filters
  const filters: FilterOption[] = [
    {
      type: "select",
      label: "Type",
      name: "type",
      options: ["PROSPECT", "CUSTOMER"],
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
        title="Sales Prospect"
        filters={filters}
        advancefilters={advancedFilters}
        breadcrumbs={[
          { name: "CRM", path: "/crm" },
          { name: "Sales Prospect", path: "/crm/sales-prospect" },
        ]}
      />

      {/* Sales Prospect Actions */}
      <SalesProspectActions  />

      {/* Data Display */}
      {data.length === 0 ? (
        <SalesProspectEmptyState message="You have not defined a process for sales leads" />
      ) : (
        <div>{/* Table or list for data goes here */}</div>
      )}
    </div>
  );
};

export default SalesProspect;
