import React, { useState } from "react";
import TreasuryHeader from "./TreasuryHeader";
import TreasuryActions from "./TreasuryActions";
import TreasuryList from "./TreasuryList";

const TreasuryComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const actions = [
    { name: "Treasury", onClick: () => console.log("Treasury"), className: "bg-blue-500" },
    { name: "Supply", onClick: () => console.log("Supply"), className: "bg-green-500" },
    { name: "Account Statement", onClick: () => console.log("Account Statement"), className: "bg-yellow-500" },
  ];

  const tools = [
    { name: "Print", onClick: () => console.log("Print") },
    { name: "Export", onClick: () => console.log("Export") },
    { name: "Import", onClick: () => console.log("Import") },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <TreasuryHeader
        title="Treasury"
        breadcrumbs={[
          { name: "Treasury", path: "/treasury" },
          { name: "Treasury", path: "/treasury/treasury" },
        ]}
      />

      <TreasuryActions actions={actions} tools={tools} />

      {data.length === 0 ? (
        <TreasuryList />
      ) : (
        <div>{/* List or Cards go here */}</div>
      )}
    </div>
  );
};

export default TreasuryComponent;
