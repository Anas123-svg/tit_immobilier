import React, { useState } from 'react';
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection"; // Import HeaderSection component
// Assuming you have a FilterOption type defined
import { FilterOption } from "@/types/DataProps";
import CalendarStatusSection from './CalendarStatusSection';

const CalendarSettings: React.FC = () => {
  // Breadcrumbs for Header Section
  const breadcrumbs = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Extra", path: "/extra" },
    { name: "Calendar", path: "/extra/calendar" },
  ];

  // Filter options state
  const [kind, setKind] = useState('CONTRACT');
  const [referenceNo, setReferenceNo] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filter options
  const filters: FilterOption[] = [
    {
      type: "select",
      label: "Kind",
      name: "kind",
      options: ["CONTRACT", "LEASE"],
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
    if (name === 'kind') setKind(value);
    if (name === 'referenceNo') setReferenceNo(value);
    if (name === 'propertyName') setPropertyName(value);
    if (name === 'startDate') setStartDate(value);
    if (name === 'endDate') setEndDate(value);
  };

  const handleFilterSubmit = () => {
    console.log('Filters submitted:', { kind, referenceNo, propertyName, startDate, endDate });
  };

  return (
    <div className="p-2 sm:p-6 space-y-10 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <HeaderSection
        title="Calendar"
        filters={filters}
        breadcrumbs={breadcrumbs}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />

      {/* Status Section */}
      <CalendarStatusSection />
    </div>
  );
};

export default CalendarSettings;
