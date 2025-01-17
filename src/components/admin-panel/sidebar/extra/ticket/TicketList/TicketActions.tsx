import React from "react";
import { Plus, Filter } from "lucide-react";

const TicketActions: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Add Ticket Button */}
      <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center">
        <span className="mr-2">Add a ticket</span>
        <Plus size={16} />
      </button>

      {/* List/Grid Toggle */}
      <div className="flex gap-2">
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">🔲</button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">🔳</button>
      </div>
    </div>
  );
};

export default TicketActions;
