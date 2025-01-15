import React from "react";

const FilterSection: React.FC = () => {
  return (
    <div className="p-4 bg-white shadow rounded-md mb-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            <option>RENTAL CONTRACT</option>
            <option>PAYMENTS SALE</option>
            <option>RENTAL PAYMENTS</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Start date</label>
          <input
            type="date"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End date</label>
          <input
            type="date"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="flex items-end">
          <button className="w-full bg-secondary text-white py-2 px-4 rounded-md">
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
