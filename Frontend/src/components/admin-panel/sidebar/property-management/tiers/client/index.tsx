import React, { useState } from "react";

import ClientNotificationSection from "./ClientNotificationSection";
import ClientActionsSection from "./ClientActionsSection";
import ListOfClientsSection from "./ListOfClientsSection";
import { FilterOption } from "@/types/DataProps"; // Assuming you have this type defined
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";

// Define the filters for ClientTier
const filters: FilterOption[] = [
  {
    type: "select",
    label: "Type",
    name: "type",
    options: ["Please select", "CLIENT", "COMPANY"],
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
    type: "text",
    label: "Promotion",
    name: "promotion",
    placeholder: "Select an item",
  },
  {
    type: "text",
    label: "Subdivision",
    name: "subdivision",
    placeholder: "Select an item",
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
    label: "Availability ?",
    name: "availability",
    options: ["Please select", "Available", "Not Available"],
  },
  {
    type: "text",
    label: "MIN Amount",
    name: "minAmount",
    placeholder: "MIN Amount",
  },
  {
    type: "text",
    label: "MAX Amount",
    name: "maxAmount",
    placeholder: "MAX Amount",
  },
  {
    type: "select",
    label: "Created by",
    name: "createdBy",
    options: ["Please select", "User1", "User2", "User3"],
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

const ClientTier: React.FC = () => {
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
        title="Client"
        breadcrumbs={[
          { name: "Tiers", path: "/tiers" },
          { name: "Client", path: "/tiers/client" },
        ]}
        filters={filters}
        advancefilters={advancefilters} // Passing the filters to the header
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />
      <ClientNotificationSection />
      <ClientActionsSection />
      <ListOfClientsSection />
    </div>
  );
};

export default ClientTier;
