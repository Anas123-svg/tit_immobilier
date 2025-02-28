import { Client } from "@/types/DataProps";
import React, { useRef } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"; 
import { useState } from "react";
import { useDeleteData } from "@/hooks/useDeleteData"; // Adjust path as needed
import { ClientPdfComponent } from "@/components/common/assessmentPDF/ClientPdf";
import BusinessClientForm from "../../forms/BusinessClientForm";
import { Printer, Trash } from "lucide-react";
import ReactPDF from '@react-pdf/renderer';
import PrivateClientForm from "../../forms/PrivateClientForm";
interface ClientDetailsProps {
  client?: Client;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Handler for file change
}

const PersonalDetails = ({ client, onFileChange }: ClientDetailsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle the click event for the file input
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };
  const [openDialog, setOpenDialog] = useState(false); // For confirmation dialog
  const [clientId, setClientId] = useState<number>(0); // To store the client ID for deletion
  const { onDelete, loading: deleteLoading } = useDeleteData();
  const apiUrl = import.meta.env.VITE_API_URL + '/api/clients';
  
  
 
  const handleDeleteClick = () => {
    setOpenDialog(true);
    setClientId(client?.id || -1);
  };

  const handleConfirmDelete = async () => {
    await onDelete(apiUrl, clientId);
    setOpenDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* Title and Reference Info */}
      <div className="flex items-center sm:flex-row flex-col justify-between">
        <h2 className="text-xl font-semibold">Client Details</h2>
        <div className="text-sm text-gray-500">REFERENCE: {client?.id}</div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:text-start text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {/* Name and Type */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Name:</p>
          {client?.is_business_client ? client?.business_company_name : client?.private_name }
        </div>
        {!client?.is_business_client &&   <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Surname:</p>
          { client?.surname}
        </div>}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Type:</p>
          {client?.is_business_client ? "Business" : "Individual"}
        </div>

        {/* Email */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Email:</p>
          {client?.is_business_client ? client?.business_email : client?.private_email}
        </div>

        {/* Phone */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Phone:</p>
          {client?.is_business_client ? client?.business_office_phone_number : client?.private_contact}
        </div>

        {/* Residence */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Residence:</p>
          {client?.is_business_client ? client?.business_head_office : client?.private_address}
        </div>

        {/* Postal Code */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Postal Code:</p>
          {client?.is_business_client ? client?.business_mail_box : client?.private_mail_box}
        </div>

        {/* Profession */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Profession:</p>
          {client?.is_business_client ? client?.business_industry_sector : client?.private_occupation}
        </div>

        {/* Date of Birth */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Date of Birth:</p>
          {client?.is_business_client ? "N/A" : client?.private_birth_date}
        </div>

        {/* Shared Affinity */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Shared Affinity:</p>
          {client?.is_business_client ? "N/A" : client?.private_nationality}
        </div>

        {/* Document Type */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Type of Document:</p>
          {client?.is_business_client ? client?.business_manager_type_of_document : client?.private_document_type}
        </div>

        {/* Gender */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Gender:</p>
          {client?.is_business_client ? client?.business_manager_gender : client?.private_gender}
        </div>

        {/* Marital Status */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Marital Status:</p>
          {client?.is_business_client ? "N/A" : client?.private_marital_status}
        </div>

        {/* Number of Children */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Number of Children:</p>
          {client?.is_business_client ? "N/A" : client?.private_number_of_children}
        </div>

        {/* Emergency Contact Person */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Emergency Contact Person:</p>
          {client?.is_business_client ? "N/A" : client?.private_emergency_contact_name}
        </div>

        {/* Emergency Contact Number */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Emergency Contact Number:</p>
          {client?.is_business_client ? "N/A" : client?.private_emergency_contact}
        </div>
      </div>

      {/* File Notes Section */}
      <div>
        <div
          className="font-semibold text-center bg-primary text-white p-2 mb-5 cursor-pointer"
          onClick={handleFileClick}
        >
          File Notes:
        </div>
        <p className="text-center p-10 border-gray-400 border border-dotted" onClick={handleFileClick}>
          {client?.is_business_client ? "Business Documents" : "Private Documents"}
        </p>
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/jpeg, image/png, application/pdf, .doc, .docx"
          onChange={onFileChange}
        />
      </div>

       {/* Action Buttons */}
       <div className="flex justify-end space-x-4 mt-4">
      
{client?.is_business_client?    <BusinessClientForm client={client} />:

<PrivateClientForm client={client}/>
}
{/*     
        <ReactPDF.PDFDownloadLink
                              document={<ClientPdfComponent client={client} />}
                              fileName={`${client?.is_business_client? client?.business_company_name:client?.private_name}.pdf`}
                              className="p-2 bg-yellow-100 rounded-full shadow hover:bg-yellow-200"
                            >
                              {({ loading }) =>
                                loading ? (
                                  "Preparing PDF..."
                                ) : (
                                  <Printer size={25} className="text-yellow-700" />
                                )
                              }
                            </ReactPDF.PDFDownloadLink> */}

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
              Are you sure you want to delete <span className="text-red-500">{client?.is_business_client? client?.business_company_name:client?.private_name}</span> ? This action cannot be undone.
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

export default PersonalDetails;
