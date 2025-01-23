import React, { useState } from 'react';
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import InterventionActions from "./InterventionActions";
import InterventionEmptyState from "./InterventionEmptyState";
import { FilterOption } from "@/types/DataProps";

function Intervention() {
  const [data, setData] = useState<any[]>([]);

  // Actions for the Intervention component
  const actions = [
    { name: "Create an Intervention", onClick: () => console.log("Create an Intervention"), className: "bg-blue-500" },
    { name: "Create a Quote", onClick: () => console.log("Create a Quote"), className: "bg-orange-500" },
    { name: "Create a Purchase Order", onClick: () => console.log("Create a Purchase Order"), className: "bg-yellow-500" },
    { name: "Create an Invoice", onClick: () => console.log("Create an Invoice"), className: "bg-green-500" },
    { name: "Funding", onClick: () => console.log("Funding"), className: "bg-green-500" },
    { name: "Realization", onClick: () => console.log("Realization"), className: "bg-orange-700" }
  ];
  

  // Basic and Advanced Filters for the Intervention component
  const filters: FilterOption[] = [
    {
      type: "select",
      label: "Kind",
      name: "kind",
      options: ["Please select", "INTERVENTION", "LOCATIVE"],
    },
    {
      type: "select",
      label: "Trustee",
      name: "trustee",
      options: ["Please select", "Trustee 1", "Trustee 2"],
    },
    {
      type: "select",
      label: "State",
      name: "state",
      options: ["Please select", "Active", "Inactive"],
    },
    {
      type: "text",
      label: "Reference No.",
      name: "referenceNumber",
      placeholder: "EX: ZA-0000-0000-00",
    },
    {
      type: "text",
      label: "Label",
      name: "label",
      placeholder: "Enter label",
    },
  ];

  const advancefilters:FilterOption[] = [
    {
      "type": "date",
      "label": "Start Date",
      "name": "startDate"
    },
    {
      "type": "date",
      "label": "End Date",
      "name": "endDate"
    },
    {
      "type": "select",
      "label": "Created By",
      "name": "createdBy",
      "options": ["Select User", "User 1", "User 2"]
    },
    {
      "type": "date",
      "label": "Creation Date",
      "name": "creationDate"
    },
    {
      "type": "number",
      "label": "Min Amount",
      "name": "minAmount",
      "placeholder": "Min Amount"
    },
    {
      "type": "number",
      "label": "Max Amount",
      "name": "maxAmount",
      "placeholder": "Max Amount"
    },
    {
      "type": "select",
      "label": "Order",
      "name": "order",
      "options": ["Ascending", "Descending"]
    },
    {
      "type": "select",
      "label": "Number",
      "name": "number",
      "options": ["10", "20", "50", "100"]
    }
  ]
  // Define the tools available for Supplier and Service Provider
  const tools = [
    { name: "Print", onClick: () => console.log("Print") },
    { name: "Export", onClick: () => console.log("Export") },
    { name: "Import", onClick: () => console.log("Import") },
  ];

  const [filterValues, setFilterValues] = useState<{ [key: string]: any }>({});

  // Handle changes in filters
  const handleFilterChange = (name: string, value: any) => {
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
        title="Intervention"
        advancefilters={advancefilters}
        filters={filters}
        breadcrumbs={[
          { name: "General Means", path: "/general-means" },
          { name: "Intervention", path: "/general-means/intervention" },
        ]}
      />
      <InterventionActions actions={actions} tools={tools} />

      {/* Data Display */}
      {data.length === 0 ? (
        <InterventionEmptyState message="No interventions found" />
      ) : (
        <div>{/* Table/List Component */}</div>
      )}
    </div>
  );
}

export default Intervention;
