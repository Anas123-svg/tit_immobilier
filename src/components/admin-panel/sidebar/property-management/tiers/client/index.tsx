// ClientTier.tsx
import React from "react";
import ClientHeaderSection from "./ClientHeaderSection";
import ClientNotificationSection from "./ClientNotificationSection";
import ClientActionsSection from "./ClientActionsSection";
import ListOfClientsSection from "./ListOfClientsSection";

const ClientTier: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ClientHeaderSection
        title="Client"
        breadcrumbs={[
          { name: "Tiers", path: "/tiers" },
          { name: "Client", path: "/tiers/client" },
        ]}
      />
      <ClientNotificationSection />
      <ClientActionsSection />
      <ListOfClientsSection  />
    </div>
  );
};

export default ClientTier;
