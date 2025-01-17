import React from "react";

interface ResourceHistoryProps {
  history: {
    resources: any[];
  };
}

const ResourceHistory: React.FC<ResourceHistoryProps> = ({ history }) => {
  return (
    <div className="mt-6">
      <div className="bg-gray-100 shadow rounded-md">
        <h3 className="bg-primary text-white p-4 rounded-t-md text-lg font-semibold">
          List of Resources
        </h3>
        {history.resources.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-orange-500 text-6xl mb-4">😞</div>
            <p>No resources found</p>
          </div>
        ) : (
          <div>{/* Render resource table or data */}</div>
        )}
      </div>
    </div>
  );
};

export default ResourceHistory;
