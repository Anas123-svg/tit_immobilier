import React, { useState } from "react";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import PromotionActions from "./PromotionActions";
import PromotionEmptyState from "./PromotionEmptyState";
import { FilterOption } from "@/types/DataProps";

const PromotionHeritage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const actions = [
    { name: "Promotion", onClick: () => console.log("Promotion"), className: "bg-blue-500" },
    { name: "Building", onClick: () => console.log("Building"), className: "bg-teal-500" },
    { name: "House/Apartment", onClick: () => console.log("House/Apartment"), className: "bg-gray-700" },
    { name: "Type", onClick: () => console.log("Type"), className: "bg-yellow-500" },
    { name: "Report", onClick: () => console.log("Report"), className: "bg-green-500" },
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
      options: [
        "PROMOTION",
        "BUILDING",
        "HOME",
        "TYPE OF HOUSE",
        "TYPE OF SITE",
        "REPORT",
      ],
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
      label: "Availability",
      name: "availability",
      options: ["Please Select", "Available", "Unavailable"],
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
        title="Promotion"
        filters={filters}
        advancefilters={advancedFilters}
        breadcrumbs={[
          { name: "Heritage", path: "/heritage" },
          { name: "Promotion", path: "/heritage/promotion" },
        ]}
      />

      {/* Promotion Actions */}
      <PromotionActions actions={actions} tools={tools} />

      {/* Data Display */}
      {data.length === 0 ? (
        <PromotionEmptyState message="No promotion found" />
      ) : (
        <div>{/* Table/List Component */}</div>
      )}
    </div>
  );
};

export default PromotionHeritage;
