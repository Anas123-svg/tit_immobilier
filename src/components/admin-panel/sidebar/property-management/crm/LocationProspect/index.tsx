import React from "react";
import LocationProspectHeader from "./LocationProspectHeader";
import LocationProspectActions from "./LocationProspectActions";
import LocationProspectEmptyState from "./LocationProspectEmptyState";

const LocationProspect: React.FC = () => {
  const breadcrumbs = [
    { name: "CRM", path: "/crm" },
    { name: "Prospect Location", path: "/crm/location-prospect" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <LocationProspectHeader
        title="Prospect Location"
        breadcrumbs={breadcrumbs}
      />
      <LocationProspectActions />
      <LocationProspectEmptyState />
    </div>
  );
};

export default LocationProspect;
