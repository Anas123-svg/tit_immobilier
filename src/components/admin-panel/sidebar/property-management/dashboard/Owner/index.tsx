// Owner.tsx
import React from "react";
import HeaderSection from "./OwnerHeaderSection";
import ActiveOwnersList from "./ActiveOwnersList";
import ValidatedMandatesList from "./ValidatedMandatesList";
import OwnerStatsCardSection from "./OwnerStatsCardsSection";
import CircularDiagramSection from "./CircularDiagramSection";
import {
  activeOwners,
  validatedMandates,
  statsData,
  circularDiagramData,
} from "@/data/dummyData";

const Owner: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <HeaderSection
        title="Owner"
        breadcrumbs={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Owner", path: "/dashboard/owner" },
        ]}
      />

      {/* Owner Stats Cards Section */}
      <OwnerStatsCardSection stats={statsData} />

      {/* Circular Diagram Section */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <CircularDiagramSection data={circularDiagramData} />
      </div>

      {/* Active Owners List and Validated Mandates List */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <ActiveOwnersList owners={activeOwners} />
        <ValidatedMandatesList mandates={validatedMandates} />
      </div>
    </div>
  );
};

export default Owner;
