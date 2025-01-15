import React from "react";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import StatsCardsSection from "@/components/admin-panel/UI-components/StatisticCardsSection";
import ChartSection from "./ChartSection";
import TransactionHistory from "./TransactionHistory";
import { statCardsData } from "@/data/dummyData";

const ManagementPortfolio: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <HeaderSection
        title="Management Portfolio"
        breadcrumbs={[{ name: "Dashboard", path: "/dashboard" }, { name: "Management Portfolio", path: "/portfolio" }]}
      />

      {/* Stats Cards Section */}
      <StatsCardsSection stats={statCardsData} />

      {/* Chart Section */}
      <ChartSection />

      {/* Transaction History Section */}
      <TransactionHistory />
    </div>
  );
};

export default ManagementPortfolio;
