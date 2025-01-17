import React, { useState } from "react";
import SubdivisionHeader from "./SubdivisionHeader";
import SubdivisionActions from "./SubdivisionActions";
import SubdivisionEmptyState from "./SubdivisionEmptyState";

const SubdivisionHeritage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const actions = [
    { name: "Subdivision", onClick: () => console.log("Subdivision"), className: "bg-blue-500" },
    { name: "Island", onClick: () => console.log("Island"), className: "bg-gray-500" },
    { name: "Lot", onClick: () => console.log("Lot"), className: "bg-teal-500" },
  ];

  const tools = [
    { name: "Print", onClick: () => console.log("Print") },
    { name: "Export", onClick: () => console.log("Export") },
    { name: "Import", onClick: () => console.log("Import") },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <SubdivisionHeader
        title="Subdivision"
        breadcrumbs={[
          { name: "Heritage", path: "/heritage" },
          { name: "Subdivision", path: "/heritage/subdivision" },
        ]}
      />

      <SubdivisionActions actions={actions} tools={tools} />

      {data.length === 0 ? (
        <SubdivisionEmptyState message="No subdivision found" />
      ) : (
        <div>{/* Table or list for data goes here */}</div>
      )}
    </div>
  );
};

export default SubdivisionHeritage;
