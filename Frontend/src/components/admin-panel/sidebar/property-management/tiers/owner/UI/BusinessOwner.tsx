import { Owner } from "@/types/DataProps";
import { Edit, Eye, Printer, Trash } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import BusinessOwnerForm from "../forms/BusinessOwnerForm";
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
import ReactPDF from "@react-pdf/renderer";
import { OwnerPdfComponent } from "@/components/common/assessmentPDF/OwnerPdf";

interface BusinessOwnerFormProps {
  owner: Owner;
}

const BusinessOwnerCard: React.FC<BusinessOwnerFormProps> = ({ owner }) => {
  const [openDialog, setOpenDialog] = useState(false); // For confirmation dialog
  const { onDelete, loading } = useDeleteData(); // Access both the onDelete function and loading state

  // Handle delete confirmation
  const handleDeleteClick = () => {
    setOpenDialog(true); // Show the confirmation dialog
  };
  const apiUrl = import.meta.env.VITE_API_URL + "/api/owners";
  const handleConfirmDelete = async () => {
    await onDelete(apiUrl, owner.id); // Call the delete function
  };

  const handleCancelDelete = () => {
    setOpenDialog(false); // Close the dialog without deleting
  };
  return (
    <div
      key={owner.business_company_name}
      className="relative p-6 bg-white border rounded-lg shadow-md"
    >
      <div className="absolute top-2 left-2 bg-green-300 text-xs px-2 py-1 rounded-full uppercase font-semibold">
        Business
      </div>
      <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
        {owner.status}
      </div>

      <div className="text-center mb-4">
        <div className="w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden">
          <img
            src={owner.business_photo || "/default-avatar.png"}
            alt={owner.business_company_name}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="text-xl font-bold">{owner.business_company_name}</h4>
        <p className="text-sm text-gray-500">
          TIN: {owner.business_business_registration_number}
        </p>
        <p className="text-sm text-gray-500">
          Industry: {owner.business_industry_sector}
        </p>
        <p className="text-sm text-blue-600">
          Head Office: {owner.business_head_office}
        </p>
        <p className="text-sm text-green-600">
          Capital: ${owner.business_capital}
        </p>
      </div>

      <div className="border-t pt-3 mt-3">
        <p className="text-sm font-semibold text-gray-600">Manager:</p>
        <p className="text-sm text-gray-700">
          {owner.business_manager_name} ({owner.business_manager_gender})
        </p>
        <p className="text-sm text-gray-500">
          Contact: {owner.business_manager_contact}
        </p>
        <p className="text-sm text-gray-500">
          Job: {owner.business_manager_job_position}
        </p>
        <p className="text-sm text-gray-500">
          Address: {owner.business_manager_address}
        </p>
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        <button className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200">
          <Link to={`/tier/owners/detail-page/${owner.id}`}>
            {" "}
            <Eye size={25} className="text-gray-700" />
          </Link>
        </button>
        <BusinessOwnerForm owner={owner} />
        <ReactPDF.PDFDownloadLink
          document={<OwnerPdfComponent owner={owner} />}
          fileName={`${owner.business_manager_name}.pdf`}
          className="p-2 bg-yellow-100 rounded-full shadow hover:bg-yellow-200"
        >
          {({ loading }) =>
          (
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
                  {owner.business_company_name}
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

export default BusinessOwnerCard;
