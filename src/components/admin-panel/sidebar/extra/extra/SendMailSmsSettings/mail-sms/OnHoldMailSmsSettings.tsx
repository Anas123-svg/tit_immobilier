import React from 'react';
import { Clock } from 'lucide-react'; // Importing Clock icon for "On Hold"

export default function OnHoldMailSmsSettings() {
  return (
    <div className="p-6 space-y-6 ">
      {/* Warning Message */}
      <div className="bg-red-100 text-red-800 p-4 rounded-md">
        Attention! You have no SMS. Please contact your provider to get credit!
      </div>

      {/* On Hold Section */}
      <div className="mt-6 p-4 bg-white rounded-md shadow-lg border">
        <h2 className="text-xl font-semibold">
          <Clock className="inline mr-2 text-red-500" /> On Hold
        </h2>
        <div className="flex flex-col  items-center gap-5 mt-4">
          <div className="h-1 w-full bg-red-500"></div>
          <span className="text-lg font-medium">No messages waiting.</span>
        </div>
      </div>
    </div>
  );
}
