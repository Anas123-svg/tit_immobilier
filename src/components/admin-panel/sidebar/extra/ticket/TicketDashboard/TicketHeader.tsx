import React from "react";

interface TicketHeaderProps {
  title: string;
}

const TicketHeader: React.FC<TicketHeaderProps> = ({ title }) => {
  return (
    <div className="bg-primary text-white p-6 rounded-md mb-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select className="w-full p-2 border rounded-md">
            <option>ALL</option>
            <option>COMMERCIAL</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Commercial</label>
          <select className="w-full p-2 border rounded-md">
            <option>Select an item</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input type="date" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input type="date" className="w-full p-2 border rounded-md" />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Filter
        </button>
      </div>
    </div>
  );
};

export default TicketHeader;
