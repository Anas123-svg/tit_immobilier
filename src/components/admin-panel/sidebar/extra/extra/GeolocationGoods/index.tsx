import React, { useState } from 'react';
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection"; // Import HeaderSection component
import { FilterOption } from "@/types/DataProps"; // Assuming your filter options are typed
import MapComponent from "./MapComponent"; // Assuming you have a MapComponent for rendering the map

const GeolocationGoods: React.FC = () => {
  const breadcrumbs = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Extra", path: "/extra" },
    { name: "Geolocation of goods", path: "/extra/geolocation" },
  ];

  // Advanced filter options
  const filters: FilterOption[] = [
    {
      type: "select",
      label: "Kind",
      name: "kind",
      options: ["PROPERTY OWNER", "TENANT", "LEASING AGENT"],
    },
    {
      type: "text",
      label: "Reference No.",
      name: "referenceNo",
      placeholder: "EX: ZA-0000-0000-00",
    },
    {
      type: "text",
      label: "Name of the property",
      name: "propertyName",
      placeholder: "Name of the property",
    },
 
  ];
const advancefilters : FilterOption[] = [   {
  type: "select",
  label: "State",
  name: "state",
  options: ["Available", "Sold", "Reserve"],
},]
  const handleFilterChange = (name: string, value: string) => {
    console.log(`${name}: ${value}`);
  };

  const handleFilterSubmit = () => {
    console.log("Filters submitted");
  };

  return (
    <div className="p-2 sm:p-6 space-y-10 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <HeaderSection
        title="Geolocation of Goods"
        filters={filters}
        advancefilters={advancefilters}
        breadcrumbs={breadcrumbs}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />



      {/* Map Section */}
      <div className="w-full mt-6">
        <MapComponent /> {/* This is where the map will be rendered */}
      </div>
    </div>
  );
};

export default GeolocationGoods;
