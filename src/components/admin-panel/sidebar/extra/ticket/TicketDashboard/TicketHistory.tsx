import React from "react";

interface TicketHistoryProps {
  history: {
    interventions: any[];
    constructions: any[];
  };
}

const TicketHistory: React.FC<TicketHistoryProps> = ({ history }) => {
  return (
    <div className="mt-6">
      {/* Interventions History */}
      <div className="bg-gray-100 shadow rounded-md mb-6">
        <h3 className="bg-primary text-white p-4 rounded-t-md text-lg font-semibold">
          History of Interventions
        </h3>
        {history.interventions.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-orange-500 text-6xl mb-4">😞</div>
            <p>No tickets found</p>
          </div>
        ) : (
          <div>{/* Table or data rendering here */}</div>
        )}
      </div>

      {/* Constructions History */}
      <div className="bg-gray-100 shadow rounded-md">
        <h3 className="bg-red-500 text-white p-4 rounded-t-md text-lg font-semibold">
          History of Constructions
        </h3>
        {history.constructions.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-orange-500 text-6xl mb-4">😞</div>
            <p>No construction found</p>
          </div>
        ) : (
          <div>{/* Table or data rendering here */}</div>
        )}
      </div>
    </div>
  );
};

export default TicketHistory;
