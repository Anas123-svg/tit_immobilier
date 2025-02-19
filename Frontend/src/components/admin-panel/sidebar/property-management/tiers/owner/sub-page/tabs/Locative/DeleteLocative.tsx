import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";import { useDeleteData } from "@/hooks/useDeleteData";
import { Trash2 } from "lucide-react";
import { useState } from 'react';


interface DeleteMandateDialogProps {
  locativeId: number;

}

const DeleteMandateDialog: React.FC<DeleteMandateDialogProps> = ({ locativeId }) => {
  const [openDialog, setOpenDialog] = useState(false);
 const { onDelete,loading:deleteLoading } = useDeleteData(); 
  const handleDelete = () => {
    const apiUrl = import.meta.env.VITE_API_URL + '/api/owner-mandate';
 
     onDelete(apiUrl,locativeId);
   

    setOpenDialog(false);
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
          <AlertDialogTitle className="text-red-500">Do you really want to delete this mandate?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete the mandate with ID: {locativeId}.
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

export default DeleteMandateDialog;
