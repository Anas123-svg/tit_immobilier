import React from "react";
import TenantDashboardHeader from "./TenantDashboardHeader";
import TenantStatsCards from "./TenantStatsCards";
import ContractsList from "./ContractsList";
import CircularDiagram from "./CircularDiagram";
import { renewals } from "@/data/dummyData";
import ChartSection from "./ChartSection";
import TenantStatsCurrencyCards from "./TenantStatsCurrencyCards";
import { tenantStats } from "@/data/dummyData";

const TenantDashboard: React.FC = () => {
  const breadcrumbs = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Tenant", path: "/dashboard/tenant" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <TenantDashboardHeader
        title="Tenant Dashboard"
        breadcrumbs={breadcrumbs}
      />

      {/* Statistics Cards Section */}
      <TenantStatsCards />

      {/* Contracts Lists */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <ContractsList title="Active Contracts" data={renewals} headerColor="bg-red-500"   itemsPerPage={5} />
        <ContractsList title="Renewals" data={renewals} headerColor="bg-yellow-500"  itemsPerPage={5} />
      </div>

      {/* Circular Diagram */}
      <div className="flex mt-6 ">
      <TenantStatsCurrencyCards stats={tenantStats} />
        <CircularDiagram />
      </div>
      <div className="mt-6">
        
        <ChartSection />

      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <ContractsList title="Active Contracts" data={renewals} headerColor="bg-red-500"   itemsPerPage={5} />
        <ContractsList title="Renewals" data={renewals} headerColor="bg-yellow-500"  itemsPerPage={5} />
      </div>
    </div>
  );
};

export default TenantDashboard;
