import React from "react";
import { Eye, Edit, Trash } from "lucide-react"; // Using Lucide for consistent icons
import { TreasuryItem } from "@/types/DataProps";

interface TreasuryItemCardProps {
  item: TreasuryItem;
  onView: (id: string) => void; // Callback for view action
  onEdit: (id: string) => void; // Callback for edit action
  onDelete: (id: string) => void; // Callback for delete action
}

const TreasuryItemCard: React.FC<TreasuryItemCardProps> = ({
  item,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="shadow-lg border rounded-md p-4 flex flex-col">
      {/* Item Type Badge */}
      <span
        className={`text-xs font-semibold px-2 py-1 rounded-md ${
          item.type === "BANK" ? "bg-gray-600 text-white" : "bg-teal-500 text-white"
        }`}
      >
        {item.type}
      </span>

      {/* Title */}
      <h3 className="text-lg font-bold mt-2">{item.title}</h3>

      {/* Manager and Company */}
      <p className="text-sm text-gray-600 mt-1">
        <span className="font-medium">Manager:</span> {item.manager}
      </p>
      <p className="text-sm text-orange-500 mt-1">{item.company}</p>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          className="text-gray-500 hover:text-black flex items-center gap-1"
          onClick={() => onView(item.id)}
        >
          <Eye size={16} />
          View
        </button>
        <button
          className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
          onClick={() => onEdit(item.id)}
        >
          <Edit size={16} />
          Edit
        </button>
        <button
          className="text-red-500 hover:text-red-700 flex items-center gap-1"
          onClick={() => onDelete(item.id)}
        >
          <Trash size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TreasuryItemCard;
