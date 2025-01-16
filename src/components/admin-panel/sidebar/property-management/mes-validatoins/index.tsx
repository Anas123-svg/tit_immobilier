import React from "react";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import StatsCardsSection from "./StatsCardsSection";

import NoContractsSection from "./NoContractsSection";
import { validationStats } from "@/data/dummyData";

const MesValidation: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <HeaderSection
        title="Mes Validations"
        breadcrumbs={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Mes Validations", path: "/dashboard/validations" },
        ]}
      />

      {/* Statistics Cards Section */}
      <StatsCardsSection stats={validationStats} />



      {/* No Contracts Section */}
      <NoContractsSection message="Oupss!! No contracts found" />
    </div>
  );
};

export default MesValidation;
