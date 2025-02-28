import { Eye, Printer, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assuming Button component is used

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"; 
import { useState } from "react";
import { useDeleteData } from "@/hooks/useDeleteData"; // Adjust path as needed
import PrivateClientForm from "../forms/PrivateClientForm";
import { ClientPdfComponent } from "@/components/common/assessmentPDF/ClientPdf";
import { Client } from "@/types/DataProps";
import ReactPDF from '@react-pdf/renderer';
const PrivateClientCard = ({ client }: { client: Client }) => {
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
      <div className="absolute top-2 left-2 bg-yellow-300 text-xs px-2 py-1 rounded-full uppercase font-semibold">
     Individual
      </div>
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mx-auto mb-2">
          <img
            src={client.private_photo || "/default-avatar.png"} // Fallback image
            alt={`${client.private_name} ${client.surname}`}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="text-xl font-bold">{`${client.private_name} ${client.surname}`}</h4>
        <p className="text-sm text-gray-500">TIN: {client.private_taxpayer_identification_number}</p>
        <p className="text-sm text-gray-500">Occupation: {client.private_occupation}</p>
        <p className="text-sm text-gray-500">Marital Status: {client.private_marital_status}</p>
        <p className="text-sm text-blue-600">Home Address: {client.private_address}</p>
        <p className="text-sm text-green-600">Contact: {client.private_contact}</p>
      </div>

      {/* Manager or Emergency Contact */}
      <div className="border-t pt-3 mt-3">
        <p className="text-sm font-semibold text-gray-600">Emergency Contact</p>
        <p className="text-sm text-gray-700">{`${client.private_emergency_contact_name} (${client.private_emergency_contact_relation})`}</p>
        <p className="text-sm text-gray-500">Contact: {client.private_emergency_contact}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-4">
        <button className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200">
          <Link to={`/tier/clients/detail-page/${client.id}`}>
            <Eye size={25} className="text-gray-700" />
          </Link>
        </button>

        <PrivateClientForm client={client} />

      <ReactPDF.PDFDownloadLink
                                   document={<ClientPdfComponent client={client} />}
                                   fileName={`${client.private_name}.pdf`}
                                   className="p-2 bg-yellow-100 rounded-full shadow hover:bg-yellow-200"
                                 >
                                   {({ loading }) =>
                                      (
                                       <Printer size={25} className="text-yellow-700" />
                                     )
                                   }
                                 </ReactPDF.PDFDownloadLink>
     

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
              Are you sure you want to delete<span className="text-red-500"> {client.private_name} {client.surname}</span>? This action cannot be undone.
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

export default PrivateClientCard;
