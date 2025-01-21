import React,{useState} from "react";
import OwnerNotificationSection from "./OwnerNotificationSection";
import OwnerActionsSection from "./OwnerActionsSection";
import ListOfOwnersSection from "./ListOfOwnersSection";
import { dummyOwners } from "@/data/dummyData"; // Dummy data import
import { FilterOption } from "@/types/DataProps";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
const filters : FilterOption[] = [
  {
    type: "select",
    label: "Type",
    name: "type",
    options: ["OWNER", "GOOD", "LOCATIVE", "MANDATE", "REVERSAL", "RENEWAL", "TERMINATION"],
  },
  {
    type: "text",
    label: "Reference No.",
    name: "referenceNumber",
    placeholder: "EX: ZA-0000-0000-00",
  },
  {
    type: "text",
    label: "Name / Company name",
    name: "name",
    placeholder: "Name / Company name",
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

const advancefilters :FilterOption[] = [
  {
    type: "select",
    label: "Owner Type",
    name: "ownerType",
    options: ["Please select", "Type 1", "Type 2", "Type 3"],
  },
  
  {
    type: "select",
    label: "Mandates",
    name: "mandates",
    options: ["Please select", "Mandate 1", "Mandate 2", "Mandate 3"],
  },
  {
    type: "select",
    label: "Created by",
    name: "createdBy",
    options: ["Select user", "User 1", "User 2", "User 3"],
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
]
const OwnerTier: React.FC = () => {
  
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
      <HeaderSection
        title="Owner"
        breadcrumbs={[
          { name: "Tiers", path: "/tiers" },
          { name: "Owner", path: "/tiers/owner" },
        ]}
        filters={filters}
        advancefilters={advancefilters}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />
      <OwnerNotificationSection />
      <OwnerActionsSection />
      <ListOfOwnersSection owners={dummyOwners} />
    </div>
  );
};

export default OwnerTier;
