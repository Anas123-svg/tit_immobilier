import React from "react";
import ContractsList from "./ContractsList";
import CircularDiagram from "./CircularDiagram";
import { renewals } from "@/data/dummyData";
import ChartSection from "./ChartSection";
import TenantStatsCurrencyCards from "./TenantStatsCurrencyCards";
import { tenantStats } from "@/data/dummyData";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import { FilterOption } from "@/types/DataProps";
import { User, FileText, Briefcase, DollarSign } from "lucide-react";

import StatisticCardsSection2 from "@/components/admin-panel/UI-components/StatisticCardsSection2";
 const stats = [
    { name: "Tenant", value: 12, icon: User, color: "bg-red-500" },
    { name: "Contract", value: 12, icon: FileText, color: "bg-blue-500" },
    { name: "Bill", value: 96, icon: Briefcase, color: "bg-green-500" },
    { name: "Payment", value: 18, icon: DollarSign, color: "bg-yellow-500" },
  ];

const TenantDashboard: React.FC = () => {
  const breadcrumbs = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Tenant", path: "/dashboard/tenant" },
  ];
  const filters: FilterOption[] = [
    {
      type: "select",
      label: "Type",
      name: "type",
      options: [
        "ALL",
        "RENT",
        "ENTRY INVOICE",
        "PENALTY",
        "OTHER INVOICES",
        "RENEWAL",
        "TERMINATION"
      ]
    },
    {
      type: "text",
      label: "Tenant",
      name: "tenant",
      placeholder: "Tenant"
    },
    {
      type: "date",
      label: "Start date",
      name: "startDate",
      placeholder: "mm/dd/yyyy"
    },
    {
      type: "date",
      label: "End date",
      name: "endDate",
      placeholder: "mm/dd/yyyy"
    }
  ];

  const handleFilterChange = (name: string, value: string) => {
    console.log(`Filter changed: ${name} = ${value}`);
  };

  const handleFilterSubmit = () => {
    console.log("Filters submitted");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-10">
      {/* Header Section */}
      <HeaderSection
      title="Tenant"
      breadcrumbs={breadcrumbs}
      filters={filters}
      onFilterChange={handleFilterChange}
      onFilterSubmit={handleFilterSubmit}
    />
      {/* Statistics Cards Section */}
      <StatisticCardsSection2 stats={stats} />

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
