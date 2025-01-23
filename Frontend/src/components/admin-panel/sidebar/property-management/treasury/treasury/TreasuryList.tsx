import React from "react";
import TreasuryItemCard from "./TreasuryItemCard";
import { dummyTreasuryData } from "@/data/dummyData";


const TreasuryList: React.FC = () => {
  const handleView = (id: string) => {
    console.log(`View item with ID: ${id}`);
  };

  const handleEdit = (id: string) => {
    console.log(`Edit item with ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete item with ID: ${id}`);
  };

  return (

    <div className="p-6 bg-white rounded-xl ">
    <h2 className="text-2xl font-bold mb-4 text-center">LIST OF THE TREASURE</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6">
      {dummyTreasuryData.map((item) => (
        <TreasuryItemCard
          key={item.id}
          item={item}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
    </div>
  );
};

export default TreasuryList;
