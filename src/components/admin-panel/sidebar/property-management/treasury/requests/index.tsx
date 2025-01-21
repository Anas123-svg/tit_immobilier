import React, { useState } from "react";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import TreasuryRequestsActions from "./TreasuryRequestsActions";
import TreasuryRequestsEmptyState from "./TreasuryRequestsEmptyState";
import { FilterOption } from "@/types/DataProps";

const TreasuryRequests: React.FC = () => {
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
      options: ["REQUEST FOR FUNDS", "REQUEST FOR PAYMENT"],
    },
    {
      type: "text",
      label: "Reference No.",
      name: "referenceNumber",
      placeholder: "EX: ZA-0000-0000-00",
    },
    {
      type: "text",
      label: "Motif",
      name: "motif",
      placeholder: "Motif",
    },
    {
      type: "date",
      label: "Start Date",
      name: "startDate",
    },
  ];

  // Advanced Filters
  const advancedFilters: FilterOption[] = [
    {
      type: "select",
      label: "State",
      name: "state",
      options: ["Please select", "Approved", "Pending"],
    },
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
        title="Requests"
        filters={filters}
        advancefilters={advancedFilters}
        breadcrumbs={[
          { name: "Treasury", path: "/treasury" },
          { name: "Requests", path: "/treasury/requests" },
        ]}
      />

      {/* Treasury Requests Actions */}
      <TreasuryRequestsActions tools={tools} />

      {/* Data Display */}
      {data.length === 0 ? (
        <TreasuryRequestsEmptyState message="No fund requests found" />
      ) : (
        <div>{/* Render data table here */}</div>
      )}
    </div>
  );
};

export default TreasuryRequests;
