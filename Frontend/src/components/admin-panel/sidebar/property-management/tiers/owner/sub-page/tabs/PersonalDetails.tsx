import { Owner } from "@/types/DataProps";
import React, { useRef, useState } from "react";
import BusinessOwnerForm from "../../forms/BusinessOwnerForm";

import ReactPDF from "@react-pdf/renderer";
import { OwnerPdfComponent } from "@/components/common/assessmentPDF/OwnerPdf";
import { Eye, Printer, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeleteData } from "@/hooks/useDeleteData";
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
import PrivateOwnerForm from "../../forms/PrivateOwnerForm";

interface PersonalDetailsProps {
  owner?: Owner;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalDetails = ({ owner, onFileChange }: PersonalDetailsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle the click event for the file input
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

   const [openDialog, setOpenDialog] = useState(false); // For confirmation dialog
    const { onDelete, loading } = useDeleteData(); // Access both the onDelete function and loading state
  
    // Handle delete confirmation
    const handleDeleteClick = () => {
      setOpenDialog(true); // Show the confirmation dialog
    };
    const apiUrl = import.meta.env.VITE_API_URL + "/api/owners";
    const handleConfirmDelete = async () => {
      await onDelete(apiUrl, owner?.id ||0); // Call the delete function
    };
  
    const handleCancelDelete = () => {
      setOpenDialog(false); // Close the dialog without deleting
    };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* Title and Reference Info */}
      <div className="flex items-center sm:flex-row flex-col justify-between">
        <h2 className="text-xl font-semibold">Personal Details</h2>
        <div className="text-sm text-gray-500">REFERENCE: {owner?.id}</div>
      </div>

      <div className="grid grid-cols-1 sm:text-start text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {/* Conditional rendering based on owner type */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Name:</p>
          {owner?.is_business_owner ? owner?.business_company_name :owner?.private_name} 
        </div>
    {/* Conditional rendering based on owner type */}
    {owner?.is_business_owner  &&
     <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Surname:</p>
           owner?.surname??''
        </div>
    }
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Type:</p>
          {owner?.is_business_owner ? "Business" : "Individual"}
        </div>

        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Email:</p>
          {owner?.is_business_owner ? owner?.business_email : owner?.private_email}
        </div>

        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Phone:</p>
          {owner?.is_business_owner ? owner?.business_office_phone_number : owner?.private_contact}
        </div>

        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Residence:</p>
          {owner?.is_business_owner ? owner?.business_head_office : owner?.private_address}
        </div>

        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Postal Code:</p>
          {owner?.is_business_owner ? owner?.business_po_box : owner?.private_po_box}
        </div>

        {/* Profession */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Profession:</p>
          {owner?.is_business_owner ? owner?.business_industry_sector : owner?.private_occupation}
        </div>

        {/* Date of Birth */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Date of Birth:</p>
          {owner?.is_business_owner ? "N/A" : owner?.private_birth_date}
        </div>

        {/* Shared Affinity */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Shared Affinity:</p>
          {owner?.is_business_owner ? "N/A" : owner?.private_nationality}
        </div>

        {/* Type of Document */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Type of Document:</p>
          {owner?.is_business_owner ? owner?.business_manager_type_of_document : owner?.private_document_type}
        </div>

        {/* Gender */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Gender:</p>
          {owner?.is_business_owner ? owner?.business_manager_gender : owner?.private_gender}
        </div>

        {/* Marital Status */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Marital Status:</p>
          {owner?.is_business_owner ? "N/A" : owner?.private_marital_status}
        </div>

        {/* Number of Children */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Number of Children:</p>
          {owner?.is_business_owner ? "N/A" : owner?.private_number_of_children}
        </div>

        {/* Emergency Contact Person */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Emergency Contact Person:</p>
          {owner?.is_business_owner ? "N/A" : owner?.private_emergency_contact_name}
        </div>

        {/* Emergency Contact Number */}
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Emergency Contact Number:</p>
          {owner?.is_business_owner ? "N/A" : owner?.private_emergency_contact}
        </div>
      </div>

      {/* File Notes Section */}
      <div className="">
        <div
          className="font-semibold text-center bg-primary text-white p-2 mb-5 cursor-pointer"
          onClick={handleFileClick}
        >
          File Notes:
        </div>
        <p className="text-center p-10 border-gray-400 border border-dotted" onClick={handleFileClick}>
          {owner?.is_business_owner ? "Business Documents" : "Private Documents"}
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

      {/* Buttons */}
      <div className="flex justify-end space-x-4 mt-4">
    
      {
        owner?.is_business_owner?<BusinessOwnerForm owner={owner} />:<PrivateOwnerForm owner={owner} />
      }  
        <ReactPDF.PDFDownloadLink
          document={<OwnerPdfComponent owner={owner} />}
          fileName={`${ owner?.is_business_owner?owner?.business_manager_name:owner?.private_name}.pdf`}
          className="p-2 bg-yellow-100 rounded-full shadow hover:bg-yellow-200"
        >
          {({ loading }) =>
            loading ? (
              "Preparing PDF..."
            ) : (
              <Printer size={25} className="text-yellow-700" />
            )
          }
        </ReactPDF.PDFDownloadLink>
        <button
          className="p-2 bg-red-100 rounded-full shadow hover:bg-red-200"
          onClick={handleDeleteClick}
        >
          <Trash size={25} className="text-red-700" />
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
                  {owner?.is_business_owner? owner?.business_company_name:owner?.private_name}
                </span>{" "}
                this owner? This action cannot be undone.
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

export default PersonalDetails;
