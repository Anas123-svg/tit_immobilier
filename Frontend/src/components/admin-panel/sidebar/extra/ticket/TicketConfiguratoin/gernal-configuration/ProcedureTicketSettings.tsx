import React, { useState } from 'react';

export default function ProcedureTicketSettings() {
  const [procedures, setProcedures] = useState<string[]>([]); // Array to hold ticket processing procedures
  const [newProcedure, setNewProcedure] = useState<string>(''); // State for the new procedure input

  const handleAddProcedure = () => {
    if (newProcedure && !procedures.includes(newProcedure)) {
      setProcedures([...procedures, newProcedure]); // Add new procedure to the list
      setNewProcedure(''); // Clear input field after adding
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Ticket processing procedure</h2>

      <div className="bg-gray-50 p-6 rounded-xl shadow-md">
        {/* Add procedure input */}
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            value={newProcedure}
            onChange={(e) => setNewProcedure(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter procedure name"
          />
          <button
            onClick={handleAddProcedure}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            Add+
          </button>
        </div>

        {/* List of added procedures */}
        <div>
          <h3 className="font-medium text-gray-700">Existing Procedures</h3>
          <ul className="list-disc pl-5 mt-2">
            {procedures.map((procedure, index) => (
              <li key={index} className="text-sm text-gray-600">
                {procedure}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
