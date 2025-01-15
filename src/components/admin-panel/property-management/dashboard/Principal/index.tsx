import React from "react";

import StatisticCardsSection from "@/components/admin-panel/UI-components/StatisticCardsSection";
import ChartSection from "./ChartSection";
import SummaryCardsSection from "./SummaryCard";
import { principalStats, summaryCardsData,tenantData,ownerData } from "@/data/dummyData";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import TenantList from "./TenantList";
import OwnerList from "./OwnerList";
import TopListSection from "./TopListSection";

const Principal: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    
    <HeaderSection
        title="Principal"
        breadcrumbs={[{ name: "Dashboard", path: "/dashboard" }, { name: "Principal", path: "/dashboard/principal" }]}
      />
      {/* Statistics Cards Section */}
      <StatisticCardsSection stats={principalStats} />

      {/* Chart Section */}
      <ChartSection  />

      {/* Summary Cards Section */}
      <SummaryCardsSection cards={summaryCardsData} />

      <div className="my-6 p-5  bg-white min-h-screen rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Top 10 Lists</h1>


    <div className="flex justify-between gap-5 flex-wrap ">  {/* Tenant List Section */}
      <TopListSection title="List of the Last 10 Tenants" data={tenantData} itemsPerPage={5} />

      {/* Owner List Section */}
      <TopListSection title="List of the Last 10 Owners" data={ownerData} itemsPerPage={5} />
      <TopListSection title="List of the Last 10 Tenants" data={tenantData} itemsPerPage={5} />

{/* Owner List Section */}
<TopListSection title="List of the Last 10 Owners" data={ownerData} itemsPerPage={5} />
    </div>
    </div>
    </div>
  );
};

export default Principal;
