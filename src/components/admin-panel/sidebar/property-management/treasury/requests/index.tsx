import React, { useState } from "react";
import TreasuryRequestsHeader from "./TreasuryRequestsHeader";
import TreasuryRequestsActions from "./TreasuryRequestsActions";
import TreasuryRequestsEmptyState from "./TreasuryRequestsEmptyState";

const TreasuryRequests: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const tools = [
    { name: "Print", onClick: () => console.log("Print") },
    { name: "Export", onClick: () => console.log("Export") },
    { name: "Import", onClick: () => console.log("Import") },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <TreasuryRequestsHeader
        title="Requests"
        breadcrumbs={[
          { name: "Treasury", path: "/treasury" },
          { name: "Requests", path: "/treasury/requests" },
        ]}
      />

      <TreasuryRequestsActions tools={tools} />

      {data.length === 0 ? (
        <TreasuryRequestsEmptyState message="No fund requests found" />
      ) : (
        <div>{/* Render data table here */}</div>
      )}
    </div>
  );
};

export default TreasuryRequests;
