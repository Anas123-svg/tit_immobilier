import React, { useState } from 'react';
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import SupplierActions from "./SupplierActions";
import SupplierEmptyState from "./SupplierEmptyState";
import { FilterOption } from "@/types/DataProps";

function SupplierServiceProvider() {
  const [data, setData] = useState<any[]>([]);

  // Define the actions for the Supplier and Service Provider
  const actions = [
    { name: "Create a Third Party", onClick: () => console.log("Create a Third Party"), className: "bg-blue-500" },
    { name: "Create a Contract", onClick: () => console.log("Create a Contract"), className: "bg-blue-500" },
    { name: "Resource", onClick: () => console.log("Resource"), className: "bg-teal-500" },
  ];
  // Define the tools available for Supplier and Service Provider
  const tools = [
    { name: "Print", onClick: () => console.log("Print") },
    { name: "Export", onClick: () => console.log("Export") },
    { name: "Import", onClick: () => console.log("Import") },
  ];

  // Define basic filters for the Supplier and Service Provider
  const filters: FilterOption[] = [
    {
      type: "select",
      label: "Kind",
      name: "kind",
      options: ["Please select", "Provider", "Service"],
    },
    {
      type: "text",
      label: "Reference No.",
      name: "referenceNumber",
      placeholder: "EX: ZA-0000-0000-00",
    },
    {
      type: "text",
      label: "First Name / Company Name",
      name: "companyName",
      placeholder: "Enter name",
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

// Define advanced filters for the Supplier and Service Provider
const advancedFilters: FilterOption[] = [
  {
    type: "select",
    label: "Type of provider",
    name: "typeOfProvider",
    options: ["Please select", "Provider Type 1", "Provider Type 2"],
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
    options: ["Select", "User 1", "User 2"],
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
    type: "number",
    label: "Number",
    name: "number",
    options: ["10", "20", "50", "100"],  // Add actual options based on your application needs
  }
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
        title="Supplier and Service Provider"
        filters={filters}
        advancefilters={advancedFilters}
        breadcrumbs={[
          { name: "General Means", path: "/general-means" },
          { name: "Supplier and Service Provider", path: "/general-means/supplier-service-provider" },
        ]}
      />
      <SupplierActions actions={actions} tools={tools} />
    <div className=""> <div className="text-center p-5 bg-secondary-light text-xl text-white">List of Service Provider</div> {data.length === 0 ? (
        <SupplierEmptyState message="No providers found" />
      ) : (
        <div>{/* Table/List Component */}</div>
      )}
    </div></div>
  );
}

export default SupplierServiceProvider;
