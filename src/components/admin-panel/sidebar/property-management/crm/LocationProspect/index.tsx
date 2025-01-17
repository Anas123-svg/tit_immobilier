import React, { useState } from "react";
import LocationProspectHeader from "./LocationProspectHeader";
import LocationProspectActions from "./LocationProspectActions";
import LocationProspectEmptyState from "./LocationProspectEmptyState";

const LocationProspect: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const actions = [
    { name: "Prospect", onClick: () => console.log("Prospect"), className: "bg-blue-500" },
    { name: "Offer", onClick: () => console.log("Offer"), className: "bg-orange-500" },
    { name: "Need", onClick: () => console.log("Need"), className: "bg-green-500" },
    { name: "Wanted Notice", onClick: () => console.log("Wanted Notice"), className: "bg-gray-700" },
    { name: "Official Response", onClick: () => console.log("Official Response"), className: "bg-yellow-500" },
  ];

  const tools = [
    { name: "Print", onClick: () => console.log("Print") },
    { name: "Export", onClick: () => console.log("Export") },
    { name: "Import", onClick: () => console.log("Import") },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <LocationProspectHeader
        title="Prospect Location"
        breadcrumbs={[
          { name: "CRM", path: "/crm" },
          { name: "Prospect Location", path: "/crm/prospect-location" },
        ]}
      />

      <LocationProspectActions actions={actions} tools={tools} />

      {data.length === 0 ? (
        <LocationProspectEmptyState message="You have not defined a process for rental prospects" />
      ) : (
        <div>{/* Table or list for data goes here */}</div>
      )}
    </div>
  );
};

export default LocationProspect;
