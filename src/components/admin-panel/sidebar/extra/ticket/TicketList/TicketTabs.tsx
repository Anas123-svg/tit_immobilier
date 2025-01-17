import React from "react";

interface TicketTabsProps {
  tabs: { name: string; count: number }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TicketTabs: React.FC<TicketTabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-300">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(tab.name)}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === tab.name ? "text-primary-light border-b-2 border-primary-light" : "text-gray-500"
          }`}
        >
          {tab.name} ({tab.count})
        </button>
      ))}
    </div>
  );
};

export default TicketTabs;
