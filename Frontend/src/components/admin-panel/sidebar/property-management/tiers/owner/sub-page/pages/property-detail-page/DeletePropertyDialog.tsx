import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";import { useDeleteData } from "@/hooks/useDeleteData";
import { Trash2 } from "lucide-react";
import { useState } from 'react';


interface DeletePropertyDialogProps {
  propertyId: number;

}

const DeletePropertyDialog: React.FC<DeletePropertyDialogProps> = ({ propertyId }) => {
  const [openDialog, setOpenDialog] = useState(false);
 const { onDelete,loading:deleteLoading } = useDeleteData(); 
  const handleDelete = () => {
    const apiUrl = import.meta.env.VITE_API_URL + '/api/owner-rent-properties';
 
     onDelete(apiUrl,propertyId);
   

    setOpenDialog(false);
      // Navigate back to the previous page
  window.history.back();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger asChild>
      <button className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600">
        To Deletes
      </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">Do you really want to delete this Property?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete the Property with ID: {propertyId}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseDialog}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-500 text-white">
            DELETE
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePropertyDialog;
