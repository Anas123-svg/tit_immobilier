import React from "react";
import TenantHeaderSection from "./TenantHeaderSection";
import InformationBannerSection from "./InfoMessageSection";
import ListOfTenantsSection from "./ListOfTenantsSection";
import { dummyTenants } from "@/data/dummyData"; // Importing dummy data
import ActionButtonsSection from "./ActionButtonsSection";

const TenantTier: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <TenantHeaderSection
        title="Tenant"
        breadcrumbs={[
          { name: "Tiers", path: "/tiers" },
          { name: "Tenant", path: "/tiers/tenant" },
        ]}
      />

      {/* Information Banner Section */}
      <InformationBannerSection />
<ActionButtonsSection/>
      {/* List of Tenants Section */}
      <ListOfTenantsSection tenants={dummyTenants} />
    </div>
  );
};

export default TenantTier;
