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
import AddTreasuryForm from "../../forms/AddTreasuryForm";
interface DetailSectionProps {
  item?: Treasury;

}

const DetailSection: React.FC<DetailSectionProps> = ({ item }) => {

    
        const [openDialog, setOpenDialog] = useState(false); // For confirmation dialog
         // Handle delete confirmation
           const { onDelete, loading } = useDeleteData(); // Access both the onDelete function and loading state
         
      const handleDeleteClick = () => {
        setOpenDialog(true); // Show the confirmation dialog
      };
      const apiUrl = import.meta.env.VITE_API_URL + `/api/treasury/add`;
      const handleConfirmDelete = async () => {
        await onDelete(apiUrl, item?.id??1); // Call the delete function
      };
    
      const handleCancelDelete = () => {
        setOpenDialog(false); // Close the dialog without deleting
      };
  return (
    <div className="p-6 bg-white rounded-md shadow-lg space-y-6">
      <div className="flex gap-2 items-center justify-center mb-4 bg-teal-500">
        <h2 className="text-2xl font-bold  text-white bg-teal-500">TREASURY DETAILS</h2>
      
      </div>
     
      <div className="grid grid-cols-3 gap-5">
        <div className="flex gap-2">
          <span className="font-semibold text-sm">REFERENCE:</span>
          <span className="text-sm">{item?.id}</span>
        </div>
        <div className="flex gap-2 mt-2">
          <span className="font-semibold text-sm">DESCRIPTION:</span>
          <span className="text-sm">{item?.comment}</span>
        </div>
        <div className="flex gap-2 mt-2">
          <span className="font-semibold text-sm">TYPE:</span>
          <span className="text-sm">{item?.cash_type}</span>
        </div>
        <div className="flex gap-2 mt-2">
          <span className="font-semibold text-sm">ACCOUNT NO.:</span>
          <span className="text-sm">{item?.account_no}</span>
        </div>
        <div className="flex gap-2 mt-2">
          <span className="font-semibold text-sm">MANAGER:</span>
          <span className="text-sm">{item?.manager_id}</span>
        </div>
        <div className="flex gap-2 mt-2">
          <span className="font-semibold text-sm">VALIDATOR:</span>
          <span className="text-sm">
            {item?.validator_assignment.join(", ")}
          </span>
        </div>
        <div className="flex gap-2 mt-2">
          <span className="font-semibold text-sm">MINIMUM THRESHOLD:</span>
          <span className="text-sm">{item?.minimum_threshold}</span>
        </div>
        <div className="flex gap-2 mt-2">
          <span className="font-semibold text-sm">MAXIMUM THRESHOLD:</span>
          <span className="text-sm">{item?.maximum_threshold}</span>
        </div>
      </div>
      <div className="flex gap-5 justify-end">     <AddTreasuryForm treasury={item}/>
          <button
            className="text-red-500  rounded-lg hover:text-red-700 flex items-center gap-1"
            onClick={handleDeleteClick}
          >
            <Trash size={16} />
            Delete
          </button></div>


            {/* ShadCN AlertDialog for Delete Confirmation */}
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogTrigger asChild />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete{" "}
                <span className="text-red-600">
                  {item?.label}
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
  );
};

export default DetailSection;
