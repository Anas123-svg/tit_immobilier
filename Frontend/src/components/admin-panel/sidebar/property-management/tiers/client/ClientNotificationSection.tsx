
// ClientNotificationSection.tsx
import React from "react";
import { Info } from "lucide-react";

const ClientNotificationSection: React.FC = () => {
  return (
    <div className="p-4 bg-yellow-100 rounded-md shadow-md mb-6 flex items-center">
      <Info size={20} className="text-yellow-600 mr-4" />
      <p className="text-sm text-yellow-700">
        Hello dear users, we inform you that an update has been made. From now
        on, all actions are grouped under the "Add" button. Please click on
        this button to make all your creations.
      </p>
    </div>
  );
};

export default ClientNotificationSection;