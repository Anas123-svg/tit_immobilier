import React, { useState } from "react";
import SalesProspectHeader from "./SalesProspectHeader";
import SalesProspectActions from "./SalesProspectActions";
import SalesProspectEmptyState from "./SalesProspectEmptyState";

const SalesProspect: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const actions = [
    { name: "Prospect", onClick: () => console.log("Prospect"), className: "bg-blue-500" },
    { name: "Pre-booking", onClick: () => console.log("Pre-booking"), className: "bg-green-500" },
    { name: "Action Commercial", onClick: () => console.log("Action Commercial"), className: "bg-gray-700" },
    { name: "Payment", onClick: () => console.log("Payment"), className: "bg-teal-500" },
    { name: "Offer", onClick: () => console.log("Offer"), className: "bg-yellow-500" },
  ];

  const tools = [
    { name: "Print", onClick: () => console.log("Print") },
    { name: "Export", onClick: () => console.log("Export") },
    { name: "Import", onClick: () => console.log("Import") },
    { name: "Generate", onClick: () => console.log("Generate") },
  ];


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <SalesProspectHeader
        title="Sales Prospect"
        breadcrumbs={[
          { name: "CRM", path: "/crm" },
          { name: "Sales Prospect", path: "/crm/sales-prospect" },
        ]}
      />

      <SalesProspectActions actions={actions} tools={tools}/>

      {data.length === 0 ? (
        <SalesProspectEmptyState message="You have not defined a process for sales leads" />
      ) : (
        <div>{/* Table or list for data goes here */}</div>
      )}
    </div>
  );
};

export default SalesProspect;
