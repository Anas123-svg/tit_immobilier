import React from "react";
import OwnerHeaderSection from "./OwnerHeaderSection";
import OwnerNotificationSection from "./OwnerNotificationSection";
import OwnerActionsSection from "./OwnerActionsSection";
import ListOfOwnersSection from "./ListOfOwnersSection";
import { dummyOwners } from "@/data/dummyData"; // Dummy data import

const OwnerTier: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <OwnerHeaderSection
        title="Owner"
        breadcrumbs={[
          { name: "Tiers", path: "/tiers" },
          { name: "Owner", path: "/tiers/owner" },
        ]}
      />
      <OwnerNotificationSection />
      <OwnerActionsSection />
      <ListOfOwnersSection owners={dummyOwners} />
    </div>
  );
};

export default OwnerTier;
