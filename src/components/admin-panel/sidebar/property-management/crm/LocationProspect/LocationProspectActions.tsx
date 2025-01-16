import React from "react";

const LocationProspectActions: React.FC = () => {
  return (
    <div className="flex gap-4 mt-6">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Prospect
      </button>
      <button className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500">
        Offer
      </button>
      <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        Need
      </button>
      <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
        Wanted Notice
      </button>
      <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
        Official Response
      </button>
      <div className="relative">
        <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
          Tools
        </button>
        <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Print</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Export</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Import</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocationProspectActions;
