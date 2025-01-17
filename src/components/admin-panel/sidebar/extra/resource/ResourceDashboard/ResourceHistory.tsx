import React from "react";

interface ResourceHistoryProps {
  history: any[];
}

const ResourceHistory: React.FC<ResourceHistoryProps> = ({ history }) => {
  return (
    <div className="bg-gray-100 shadow rounded-md mt-6">
      <h3 className="bg-primary text-white p-4 rounded-t-md text-lg font-semibold">
        History of Resources
      </h3>
      {history.length === 0 ? (
        <div className="p-8 text-center">
          <div className="text-orange-500 text-6xl mb-4">😞</div>
          <p>No resources found</p>
        </div>
      ) : (
        <div>{/* Render resource history data here */}</div>
      )}
    </div>
  );
};

export default ResourceHistory;
