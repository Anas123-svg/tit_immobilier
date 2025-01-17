import React, { useState } from "react";
import PromotionHeader from "./PromotionHeader";
import PromotionActions from "./PromotionActions";
import PromotionEmptyState from "./PromotionEmptyState";

const PromotionHeritage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const actions = [
    { name: "Promotion", onClick: () => console.log("Promotion"), className: "bg-blue-500" },
    { name: "Building", onClick: () => console.log("Building"), className: "bg-teal-500" },
    { name: "House/Apartment", onClick: () => console.log("House/Apartment"), className: "bg-gray-700" },
    { name: "Type", onClick: () => console.log("Type"), className: "bg-yellow-500" },
    { name: "Report", onClick: () => console.log("Report"), className: "bg-green-500" },
  ];

  const tools = [
    { name: "Print", onClick: () => console.log("Print") },
    { name: "Export", onClick: () => console.log("Export") },
    { name: "Import", onClick: () => console.log("Import") },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <PromotionHeader
        title="Promotion"
        breadcrumbs={[
          { name: "Heritage", path: "/heritage" },
          { name: "Promotion", path: "/heritage/promotion" },
        ]}
      />
      <PromotionActions actions={actions} tools={tools} />
      {data.length === 0 ? (
        <PromotionEmptyState message="No promotion found" />
      ) : (
        <div>{/* Table/List Component */}</div>
      )}
    </div>
  );
};

export default PromotionHeritage;
