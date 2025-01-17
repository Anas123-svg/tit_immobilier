import React from "react";
import ResourceHeader from "./ResourceHeader";
import ResourceStatsSection from "./ResourceStatsSection";
import ResourceCircularDiagrams from "./ResourceCircularDiagrams";
import ResourceHistory from "./ResourceHistory";
import { Wrench, Check, XCircle } from "lucide-react";

const stats = [
  { name: "Total Resources", value: 0, color: "bg-yellow-500", icon: Wrench },
 
  { name: "In Stock", value: 0, color: "bg-green-500", icon: Check },
  { name: "In Use", value: 0, color: "bg-blue-500", icon: Wrench },
  { name: "Out of Order", value: 0, color: "bg-red-500", icon: XCircle },
];

const ResourceDashboard: React.FC = () => {
  const history :any = [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ResourceHeader
        title="Dashboard"
        breadcrumbs={[{ name: "Resource", path: "/resource" }, { name: "Dashboard", path: "#" }]}
      />
      <ResourceStatsSection stats={stats} />
      <ResourceCircularDiagrams />
      <ResourceHistory history={history} />
    </div>
  );
};

export default ResourceDashboard;
