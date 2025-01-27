import React, { useState } from "react";

import ActionSection from "./ActionSection";
import TableSection from "./UserTable";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import { FilterOption } from "@/types/DataProps";
const filters: FilterOption[] = [
  {
    type: "select",
    label: "Type",
    name: "type",
    options: ["USER"],
  },
  {
    type: "text",
    label: "Reference No.",
    name: "referenceNumber",
    placeholder: "EX: ZA-0000-0000-00",
  },
  {
    type: "text",
    label: "First name / Company name",
    name: "name",
    placeholder: "First name / Company name",
  },
  {
    type: "date",
    label: "Start date",
    name: "startDate",
  },
  {
    type: "date",
    label: "End date",
    name: "endDate",
  },
];

const advancefilters: FilterOption[] = [
  {
    type: "text",
    label: "MIN Amount",
    name: "minAmount",
    placeholder: "MIN Amount",
  },
  {
    type: "text",
    label: "MAX amount",
    name: "maxAmount",
    placeholder: "MAX amount",
  },
  {
    type: "date",
    label: "Creation date",
    name: "creationDate",
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
// Example Data
const userList = [
  { name: "John Doe", email: "john@example.com", status: "Active" },
  { name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
];

const UserManagement: React.FC = () => {
  // Example actions and tools
  const actions = [
    {
      name: "Add User",
      onClick: () => alert("Add User Clicked"),
      className: "bg-teal-500",
    },
    {
      name: "Permissions",
      onClick: () => alert("Permissions Clicked"),
      className: "bg-blue-500",
    },
  ];

  const tools = [
    { name: "Tool 1", onClick: () => alert("Tool 1 Clicked") },
    { name: "Tool 2", onClick: () => alert("Tool 2 Clicked") },
  ];

  const handleEdit = (email: string) => {
    alert(`Edit User: ${email}`);
  };

  const handleView = (email: string) => {
    alert(`View User: ${email}`);
  };

  return (
    <div className="p-2 sm:p-6 bg-gray-100 space-y-10 min-h-screen">
      {/* Header Section */}
      <HeaderSection
        title="User Management"
        breadcrumbs={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "User Management", path: "/user-management" },
        ]}
        filters={filters}
        advancefilters={advancefilters}
        onFilterChange={(name, value) => console.log(`${name}: ${value}`)}
        onFilterSubmit={() => console.log("Filters submitted")}
      />

      {/* Action Section */}
      <ActionSection actions={actions} tools={tools} />

      {/* Table Section */}
      <TableSection />
    </div>
  );
};

export default UserManagement;
