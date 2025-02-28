import React, { useState } from "react";
import { Eye, Edit, Printer, RefreshCw, Trash } from "lucide-react";
import useFetchData from "@/hooks/useFetchData";
import { Link } from "react-router-dom";
import BusinessClientForm from "./forms/BusinessClientForm";
import PrivateClientForm from "./forms/PrivateClientForm";
import { Client } from "@/types/DataProps";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useDeleteData } from "@/hooks/useDeleteData";
import BusinessClientCard from "./UI/BusinessClientCard";
import PrivateClientCard from "./UI/PrivateClientCard";


interface ListOfClientsSectionProps {
  clients?: Client[];
}

const ListOfClientsSection: React.FC<ListOfClientsSectionProps> = () => {

    const [reloadTrigger, setReloadTrigger] = useState<boolean>(false);
    // Function to handle reload button click
    const handleReload = () => {
      setReloadTrigger(prev => !prev); // Toggle the reloadTrigger to trigger re-fetch
    };
  const { data: clients, loading, error } = useFetchData<Client[]>(
    `${import.meta.env.VITE_API_URL}/api/clients`,reloadTrigger
  );
  const [openDialog, setOpenDialog] = useState(false); // For confirmation dialog
        const { onDelete,loading:deleteLoading } = useDeleteData(); // Access both the onDelete function and loading state
        const [clientId, setClient] = useState<number>(0); // For confirmation dialog
     
        // Handle delete confirmation
   
        const apiUrl = import.meta.env.VITE_API_URL + '/api/clients';
        const handleConfirmDelete = async () => {
         await onDelete(apiUrl, clientId); // Call the delete function
         deleteLoading?setOpenDialog(true):   setOpenDialog(false); // Close the dialog after confirming
        };
      
        const handleCancelDelete = () => {
          setOpenDialog(false); // Close the dialog without deleting
        };
  return (
    <div className="p-4 bg-white shadow rounded-md">
       <div className="flex justify-between">   <h3 className="text-3xl text-center font-semibold mb-4">Client List</h3>
      <button
        onClick={handleReload}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
      >
        <RefreshCw/>
      </button></div>
    {/* Loading State */}
    {loading && <p className="text-center text-gray-500">Loading clients...</p>}

{/* Error State */}
{error && <p className="text-center text-red-500">Error fetching data: {error}</p>}

{/* Empty State */}
{!loading && clients?.length === 0 && (
  <p className="text-center text-gray-500">No tenants found.</p>
)}
      {clients === undefined ? (
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="text-6xl text-yellow-500 mb-4">😟</div>
          <h4 className="text-xl font-bold text-gray-700">Oops!!</h4>
          <p className="text-gray-500">No clients found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {clients?.map((client) => (
          client.is_business_client?<BusinessClientCard client={client}/>: <PrivateClientCard client={client}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListOfClientsSection;
