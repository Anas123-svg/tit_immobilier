import React from "react";
import ResourceHeader from "./ResourceHeader";
import ResourceStatsCardsSection from "./ResourceStatsCardsSection";

import ResourceHistory from "./ResourceHistory";
import ActionSection from "./ActionSection";

const ResourceDashboard: React.FC = () => {
  const history = {
    resources: [],
  };

  const breadcrumbs = [
    { name: "Resource", path: "/resource" },
    { name: "Dashboard", path: "/resource/dashboard" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ResourceHeader title="Resource Dashboard" breadcrumbs={breadcrumbs} />
      <ActionSection />
      <ResourceStatsCardsSection />
   
      <ResourceHistory history={history} />
    </div>
  );
};

export default ResourceDashboard;
