import { Eye, Printer, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assuming Button component is used

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"; 
import { useState } from "react";
import { useDeleteData } from "@/hooks/useDeleteData"; // Adjust path as needed
import BusinessClientForm from "../forms/BusinessClientForm";

const BusinessClientCard = ({ client }: { client: any }) => {
  const [openDialog, setOpenDialog] = useState(false); // For confirmation dialog
  const [clientId, setClientId] = useState<number>(0); // To store the client ID for deletion
  const { onDelete, loading: deleteLoading } = useDeleteData();
  const apiUrl = import.meta.env.VITE_API_URL + '/api/clients';

  const handleDeleteClick = () => {
    setOpenDialog(true);
    setClientId(client.id);
  };

  const handleConfirmDelete = async () => {
    await onDelete(apiUrl, clientId);
    setOpenDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  return (
    <div className="relative p-6 bg-white border rounded-lg shadow-md">
      {/* Client Info */}
      <div className="text-center mb-4">
      <div className="absolute top-2 left-2 bg-green-300 text-xs px-2 py-1 rounded-full uppercase font-semibold">
        Business
      </div>
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mx-auto mb-2">
          <img
            src={client.business_photo || "/default-avatar.png"} // Fallback image
            alt={client.business_company_name}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="text-xl font-bold">{client.business_company_name}</h4>
        <p className="text-sm text-gray-500">TIN: {client.business_taxpayer_identification_number}</p>
        <p className="text-sm text-gray-500">Reg. No: {client.business_business_registration_number}</p>
        <p className="text-sm text-gray-500">Industry: {client.business_industry_sector}</p>
        <p className="text-sm text-blue-600">Head Office: {client.business_head_office}</p>
        <p className="text-sm text-green-600">Capital: {client.business_capital}</p>
      </div>

      {/* Manager Details */}
      <div className="border-t pt-3 mt-3">
        <p className="text-sm font-semibold text-gray-600">Manager</p>
        <p className="text-sm text-gray-700">{client.business_manager_name} ({client.business_manager_gender})</p>
        <p className="text-sm text-gray-500">Contact: {client.business_manager_contact}</p>
        <p className="text-sm text-gray-500">Job: {client.business_manager_job_position}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-4">
        <button className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200">
          <Link to={`/tier/clients/detail-page/${client.id}`}>
            <Eye size={25} className="text-gray-700" />
          </Link>
        </button>

        <BusinessClientForm client={client} />

        <button className="p-2 bg-yellow-100 rounded-full shadow hover:bg-yellow-200" onClick={() => window.print()}>
          <Printer size={25} className="text-yellow-700" />
        </button>

        <button className="p-2 bg-red-100 rounded-full shadow hover:bg-red-200" onClick={handleDeleteClick}>
          <Trash size={25} className="text-red-700" />
        </button>
      </div>

      {/* ShadCN AlertDialog for Delete Confirmation */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary">Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="text-red-500">{client.business_company_name}</span> ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-900" onClick={handleConfirmDelete}  disabled={deleteLoading}>
          
              {deleteLoading ? "Deleting..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BusinessClientCard;
