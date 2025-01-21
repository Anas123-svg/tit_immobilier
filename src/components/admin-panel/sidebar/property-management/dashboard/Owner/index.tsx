// Owner.tsx
import React from "react";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import ActiveOwnersList from "./ActiveOwnersList";
import ValidatedMandatesList from "./ValidatedMandatesList";
import CircularDiagram from "@/components/admin-panel/UI-components/CircularDiagram";
import {
  activeOwners,
  validatedMandates,
  statsData,
  circularDiagramData,
} from "@/data/dummyData";

import StatisticCardsSection from "@/components/admin-panel/UI-components/StatisticCardsSection";
import { FilterOption } from "@/types/DataProps";
import StatisticCard6 from "@/components/admin-panel/UI-components/StatisticCard6";
import StatisticCardsSection2 from "@/components/admin-panel/UI-components/StatisticCardsSection2";

const Owner: React.FC = () => {
    const breadcrumbs = [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Owner", path: "/dashboard/Owner" },
    ];
  
    const filters : FilterOption[] = [
      {
        type: "select",
        label: "Type",
        name: "type",
        options: ["ALL", "Promotion", "Reserved", "Occupied"],
      },
      {
        type: "text",
        label: "Owner",
        name: "Owner",
        placeholder: "owner",
      },
      {
        type: "date",
        label: "Start Date",
        name: "startDate",
      },
      {
        type: "date",
        label: "End Date",
        name: "endDate",
      },
    ];
  
    const handleFilterChange = (name: string, value: string) => {
      console.log(`${name}: ${value}`);
    };
  
    const handleFilterSubmit = () => {
      console.log("Filters submitted");
    };

  const cardData = [
      {
        "title": "Sale",
        "value": 0,
        "stats": ["Sold", "Reserved", "Available"],
        "color": "red-500"
      },
      {
        "title": "Location",
        "value": 47,
        "stats": ["Busy", "Reserved", "Available"],
        "color": "orange-500"
      }
    ]
  return (
    <div className="p-2 sm:p-6 bg-gray-100 space-y-10 min-h-screen">
      {/* Header Section */}
      <HeaderSection
        title="Owner"
        filters={filters}
        breadcrumbs={breadcrumbs}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />

      {/* Owner Stats Cards Section */}
      <StatisticCardsSection2 stats={statsData} />

      {/* Circular Diagram Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 space-x-0 lg:space-y-0 space-y-5 lg:space-x-5 ">
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-5">
        {cardData.map((item, index) => (
        <StatisticCard6
          key={index}
          title={item.title}
          value={item.value}
          stats={item.stats}
          color={item.color}
        />
      ))}
        </div>
      <div className="w-full"> <CircularDiagram title="Circular Diagram of Availability" data={circularDiagramData} /></div> 
      </div>

      {/* Active Owners List and Validated Mandates List */}
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-5">
        <ActiveOwnersList owners={activeOwners} />
        <ValidatedMandatesList mandates={validatedMandates} />
      </div>
    </div>
  );
};

export default Owner;
