import React from "react";

const LocationProspectEmptyState: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-32 bg-gray-200 rounded-md mt-6">
      <div className="text-center">
        <div className="text-5xl text-yellow-500">😞</div>
        <p className="text-lg text-gray-700 mt-2">
          You have not defined a process for rental prospects
        </p>
      </div>
    </div>
  );
};

export default LocationProspectEmptyState;
