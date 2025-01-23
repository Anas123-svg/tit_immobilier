import React, { useState } from "react";
import TicketHeader from "./TicketHeader";
import TicketTabs from "./TicketTabs";
import TicketEmptyState from "./TicketEmptyState";
import TicketActions from "./TicketActions";

const TicketList: React.FC = () => {
  const [activeTab, setActiveTab] = useState("TO DO");

  const tabs = [
    { name: "TO DO", count: 0 },
    { name: "IN PROGRESS", count: 0 },
    { name: "CLOSE", count: 0 },
  ];

  const breadcrumbs = [
    { name: "Ticket", path: "/ticket" },
    { name: "Ticket", path: "/ticket/ticket" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <TicketHeader title="Ticket" breadcrumbs={breadcrumbs} />

      {/* Actions Section */}
      <TicketActions />

      {/* Tabs Section */}
      <TicketTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content Section */}
      <div className="mt-4">
        {tabs.find((tab) => tab.name === activeTab)?.count === 0 ? (
          <TicketEmptyState />
        ) : (
          <div>{/* Render ticket data here */}</div>
        )}
      </div>
    </div>
  );
};

export default TicketList;
