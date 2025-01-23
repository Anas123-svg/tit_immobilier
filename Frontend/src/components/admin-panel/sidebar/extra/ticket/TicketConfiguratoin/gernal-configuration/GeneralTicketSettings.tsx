import React, { useState } from 'react';

export default function GeneralTicketSettings() {
  const [ticketManager, setTicketManager] = useState('');

  const handleSave = () => {
    // Save the selected ticket manager
    console.log('Ticket Manager saved:', ticketManager);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">General configuration</h2>

      <div className="bg-gray-50 p-6 rounded-xl shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Ticket Manager
          </label>
          <select
            value={ticketManager}
            onChange={(e) => setTicketManager(e.target.value)}
            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a manager</option>
            <option value="manager1">Manager 1</option>
            <option value="manager2">Manager 2</option>
            <option value="manager3">Manager 3</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}
