import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useDeleteData } from "@/hooks/useDeleteData";  // Assuming useDeleteData is a custom hook for API requests
import { useState } from 'react';
import { Trash2 } from "lucide-react";

interface DeleteBillsDialogProps {
  BillsId: number;  // Pass Bills ID to identify which Bills to delete
}

const DeleteBillsDialog: React.FC<DeleteBillsDialogProps> = ({ BillsId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { onDelete, loading: deleteLoading } = useDeleteData();

  const handleDelete = () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/tenant-bill`;
    onDelete(apiUrl,BillsId)  // Call the onDelete function from the custom hook to delete the Bills
      .then(() => {
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("Failed to delete Bills", error);
        // Handle error appropriately
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger asChild>
        <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
          <Trash2 size={18} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">Do you really want to delete this Bills?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete the Bills with ID: {BillsId}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseDialog}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-500 text-white" disabled={deleteLoading}>
            {deleteLoading ? "Deleting..." : "DELETE"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBillsDialog;
