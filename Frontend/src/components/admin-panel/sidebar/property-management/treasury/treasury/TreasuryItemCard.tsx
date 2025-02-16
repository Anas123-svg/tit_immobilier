import React, { useState } from "react";
import { Eye, Edit, Trash } from "lucide-react"; // Using Lucide for consistent icons
import { Treasury } from "@/types/DataProps";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteData } from "@/hooks/useDeleteData";
import AddTreasuryForm from "./forms/AddTreasuryForm";
import { Link } from "react-router-dom";
interface TreasuryItemCardProps {
  item: Treasury;

}

const TreasuryItemCard: React.FC<TreasuryItemCardProps> = ({
  item,

}) => {

    const [openDialog, setOpenDialog] = useState(false); // For confirmation dialog
     // Handle delete confirmation
       const { onDelete, loading } = useDeleteData(); // Access both the onDelete function and loading state
     
  const handleDeleteClick = () => {
    setOpenDialog(true); // Show the confirmation dialog
  };
  const apiUrl = import.meta.env.VITE_API_URL + `/api/treasury/add`;
  const handleConfirmDelete = async () => {
    await onDelete(apiUrl, item.id); // Call the delete function
  };

  const handleCancelDelete = () => {
    setOpenDialog(false); // Close the dialog without deleting
  };
  return (
    <div className="shadow-lg border rounded-md p-4 flex flex-col">
      {/* Cash Type Badge */}
      <span
        className={`text-xs font-semibold px-2 py-1 rounded-md ${
          item.cash_type === "BANK" ? "bg-gray-600 text-white" : "bg-teal-500 text-white"
        }`}
      >
        {item.cash_type}
      </span>

      {/* Title */}
      <h3 className="text-lg font-bold mt-2">{item.label}</h3>

      {/* Manager and Company (Assuming these are added to the Treasury type or replacing them) */}
      <p className="text-sm text-gray-600 mt-1">
        <span className="font-medium">Manager ID:</span> {item.manager_id}
      </p>
      <p className="text-sm text-orange-500 mt-1">{item.account_no}</p>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4 items-center">
       <Link to={"/treasury/treasury/"+item.id} className=""> <div
          className="text-gray-500 hover:text-black flex items-center gap-1"
      
        >
          <Eye size={16} />
          View
        </div></Link>
       <AddTreasuryForm treasury={item}/>
        <button
          className="text-red-500 hover:text-red-700 flex items-center gap-1"
          onClick={handleDeleteClick}
        >
          <Trash size={16} />
          Delete
        </button>

             {/* ShadCN AlertDialog for Delete Confirmation */}
             <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogTrigger asChild />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete{" "}
                <span className="text-red-600">
                  {item.label}
                </span>{" "}
                this treassury? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelDelete}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-900"
                onClick={handleConfirmDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Confirm"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default TreasuryItemCard;
