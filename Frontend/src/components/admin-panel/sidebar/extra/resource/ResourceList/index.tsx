import React, { useState } from "react";
import { Home, Wrench, CheckCircle, AlertCircle } from "lucide-react";
import ResourceHistory from "./ResourceHistory";
import ActionSection from "./ActionSection";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection"; // Importing HeaderSection
import { FilterOption } from "@/types/DataProps";
import StatisticCardsSection from "@/components/admin-panel/UI-components/StatisticCardsSection";

const stats = [
  { name: "Total resources", value: 0, color: "bg-yellow-500", icon: Home },
  { name: "In stock", value: 0, color: "bg-green-500", icon: CheckCircle },
  { name: "In use", value: "0", color: "bg-blue-500", icon: Wrench },
  { name: "Out of order", value: 0, color: "bg-red-500", icon: AlertCircle },
];

const ResourceDashboard: React.FC = () => {
  const history = {
    resources: [],
  };

  const breadcrumbs = [
    { name: "Resource", path: "/resource" },
    { name: "Resource", path: "/resource/resource" },
  ];

  // Filters Configuration
  const filters:FilterOption[] = [
    {
      type: "select",
      label: "Kind",
      name: "kind",
      options: ["RESOURCE"],
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

  // Advanced Filters Configuration
  const advancedFilters:FilterOption[] = [
    {
      type: "select",
      label: "Resource Type",
      name: "resourceType",
      options: ["Please Select", "Type A", "Type B"],
    },
    {
      type: "select",
      label: "State",
      name: "state",
      options: ["Please Select", "Active", "Inactive"],
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
      label: "Number",
      name: "number",
      options: ["10", "20", "50", "100"],
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
        title="Resource"
        filters={filters}
        advancefilters={advancedFilters}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
        breadcrumbs={breadcrumbs}
      />

      {/* Stats Section */}
      <StatisticCardsSection stats={stats} />
      
      {/* Action Section */}
      <ActionSection />
      
      {/* History Section */}
      <ResourceHistory history={history} />
    </div>
  );
};

export default ResourceDashboard;
