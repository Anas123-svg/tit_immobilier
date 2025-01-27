
// InfoMessageSection.tsx
import React from "react";
import { Info } from "lucide-react";

const InfoMessageSection: React.FC = () => {
  return (
    <div className="p-4 bg-warning-100 text-warning-700 rounded-md flex shadow mb-6 bg-yellow-100">
   <Info size={20} className="text-yellow-600 mr-4" />   <p className="text-sm text-yellow-700">
        Hello dear users, <br />
        We inform you that an update has been made. From now on, all actions are
        grouped under the "Add" button. Please click on this button to make all
        your creations.
      </p>
    </div>
  );
};

export default InfoMessageSection;
