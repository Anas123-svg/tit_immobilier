import React, { useState } from "react";

import InformationBannerSection from "./InfoMessageSection";
import ListOfTenantsSection from "./ListOfTenantsSection";
import { dummyTenants } from "@/data/dummyData"; // Importing dummy data
import ActionButtonsSection from "./ActionButtonsSection";
import { FilterOption } from "@/types/DataProps"; // Assuming this type is defined in your project
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";

const filters: FilterOption[] = [
  {
    type: "select",
    label: "Type",
    name: "type",
    options: [
      "TENANT",
      "CONTRACT",
      "SHORT TERM CONTRACT",
      "PAYMENT",
      "RENT",
      "ENTRY INVOICE",
      "WARNING ECHEANCE",
      "PENALTY",
      "OTHER INVOICES",
      "STATE OF PLAY",
      "RENEWAL",
      "EXTENSION",
      "TERMINATION",
    ],
  },
  {
    type: "text",
    label: "Reference No.",
    name: "referenceNumber",
    placeholder: "EX: ZA-0000-0000-00",
  },
  {
    type: "text",
    label: "Name / Company Name",
    name: "name",
    placeholder: "Name / Company Name",
  },
  {
    type: "select",
    label: "Owner",
    name: "owner",
    options: ["Select an item"],
  },
  {
    type: "select",
    label: "Property Name",
    name: "propertyName",
    options: ["Select an item"],
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
const advancefilters: FilterOption[] = [
  {
    type: "select",
    label: "Type of tenant",
    name: "tenantType",
    options: ["Please select", "Tenant", "Contract", "Short Term Contract", "Payment", "Rent", "Renewal", "Extension", "Termination"],
  },
  {
    type: "select",
    label: "Periodicity",
    name: "periodicity",
    options: ["Please select", "Monthly", "Quarterly", "Yearly"],
  },
  {
    type: "select",
    label: "Created by",
    name: "createdBy",
    options: ["Please select", "Selector1", "Selector2", "Selector3"],
  },
  {
    type: "date",
    label: "Creation date",
    name: "creationDate",
    placeholder: "mm/dd/yyyy",
  },
  {
    type: "select",
    label: "Order",
    name: "order",
    options: ["Descending", "Ascending"],
  },
  {
    type: "select",
    label: "Name",
    name: "nameEntries",
    options: ["10", "20", "50", "100"],
  },
];

const TenantTier: React.FC = () => {
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
      {/* Header Section */}
      <HeaderSection
        title="Tenant"
        breadcrumbs={[
          { name: "Tiers", path: "/tiers" },
          { name: "Tenant", path: "/tiers/tenant" },
        ]}
        filters={filters} // Passing the filters to the header
        advancefilters={advancefilters}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />

      {/* Information Banner Section */}
      <InformationBannerSection />

      {/* Action Buttons Section */}
      <ActionButtonsSection />

      {/* List of Tenants Section */}
      <ListOfTenantsSection tenants={dummyTenants} />
    </div>
  );
};

export default TenantTier;
