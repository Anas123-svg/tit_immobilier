import React, { useState } from "react";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import StatsCardsSection from "./StatsCardsSection";
import NoContractsSection from "./NoContractsSection";
import { validationStats } from "@/data/dummyData";
import { FilterOption } from "@/types/DataProps";

const MesValidation: React.FC = () => {
  // Filter options for dropdown and date inputs
  const filterOptions: FilterOption[] = [
    {
      type: "select",
      label: "Type",
      name: "type",
      options: [
        "RENTAL PAYMENT",
        "PAYMENT SALE",
        "RENTAL CONTRACT",
        "SALES FILE",
        "MANDATE",
        "REVERSAL",
        "STATE OF PLAY",
        "TERMINATION OF CONTRACT",
        "TERMINATION OF FILE",
        "CONTRACT RENEWAL",
        "CONTRACT TRANSFER",
      ],
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

  // State to track filter values
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({
    type: "",
    startDate: "",
    endDate: "",
  });

  // Handle changes in filters
  const handleFilterChange = (name: string, value: string) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle filter submission
  const handleFilterSubmit = () => {
    console.log("Filters submitted:", filterValues);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <HeaderSection
        title="Mes Validations"
        breadcrumbs={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Mes Validations", path: "/dashboard/validations" },
        ]}
        filters={filterOptions}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />

      {/* Statistics Cards Section */}
      <StatsCardsSection stats={validationStats} />

      {/* No Contracts Section */}
      <NoContractsSection message="Oupss!! No contracts found" />
    </div>
  );
};

export default MesValidation;
