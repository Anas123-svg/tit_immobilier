import React from 'react';
import { Trash } from 'lucide-react'; // Importing Trash icon for Basket

export default function BasketMailSmsSettings() {
  return (
    <div className="p-6 space-y-6  ">
      {/* Warning Message */}
      <div className="bg-red-100 text-red-800 p-4 rounded-md">
        Attention! You have no SMS. Please contact your provider to get credit!
      </div>

      {/* Basket Section */}
      <div className="mt-6 p-4 bg-white rounded-md shadow-lg border">
        <h2 className="text-xl font-semibold">
          <Trash className="inline mr-2 text-red-500" /> Basket
        </h2>
        <div className="flex items-center gap-5 mt-4 flex-col">
          <div className="h-1 w-full bg-red-500"></div>
          <span className="text-lg font-medium">No messages in the trash.</span>
        </div>
      </div>
    </div>
  );
}
