import { Eye, Printer, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assuming Button component is used

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"; 
import { useState } from "react";
import { useDeleteData } from "@/hooks/useDeleteData"; // Adjust path as needed
import BusinessClientForm from "../forms/BusinessClientForm";
import ReactPDF from '@react-pdf/renderer';
import { AssessmentPDF } from '@/components/common/assessmentPDF'; // Assuming you have this component
import { Assessment } from "@/types/DataProps";

const BusinessClientCard = ({ client }: { client: any }) => {
  const [openDialog, setOpenDialog] = useState(false); // For confirmation dialog
  const [clientId, setClientId] = useState<number>(0); // To store the client ID for deletion
  const { onDelete, loading: deleteLoading } = useDeleteData();
  const apiUrl = import.meta.env.VITE_API_URL + '/api/clients';
  const sampleAssessment: Assessment = {
    id: 1,
    user_id: 123,
    assessment: {
      id: 1,
      name: "Building Inspection",
      Reference: "INS-001",
      fields: [
        {
          id: 1,
          template_id: 1,
          label: "Client Name",
          type: "text",
          options: [],
          value: "John Doe",
          isFlagged: false,
          attributes: {
            placeholder: "Enter client name",
            required: true,
          },
          created_at: "2025-02-06T12:00:00Z",
          updated_at: "2025-02-06T12:00:00Z",
        },
        {
          id: 2,
          template_id: 1,
          label: "Inspection Date",
          type: "date",
          options: [],
          value: "2025-02-06",
          isFlagged: false,
          attributes: {
            placeholder: "Enter inspection date",
            required: true,
          },
          created_at: "2025-02-06T12:00:00Z",
          updated_at: "2025-02-06T12:00:00Z",
        },
      ],
      tables: [
        {
          id: 1,
          template_id: 1,
          table_name: "Inspection Results",
          table_data: {
            table_name: "Inspection Results",
            columns: ["Item", "Condition", "Remarks"],
            rows: {
              "1": { "Item": "Roof", "Condition": "Good", "Remarks": "No issues" },
              "2": { "Item": "Walls", "Condition": "Needs Repair", "Remarks": "Cracks found" },
            },
          },
          created_at: "2025-02-06T12:00:00Z",
          updated_at: "2025-02-06T12:00:00Z",
        },
      ],
      created_by: "Inspector Smith",
      description: "A detailed inspection report for the building.",
      created_at: "2025-02-06T12:00:00Z",
      updated_at: "2025-02-06T12:00:00Z",
    },
    status: "Completed",
    status_by_admin: "Reviewed",
    submitted_to_admin: true,
    client_i: 1,
    client: {
      id: 1,
      surname: "Doe",
      is_business_client: false,
      private_pronouns: "He/Him",
      private_name: "John",
      private_gender: "Male",
      private_birth_date: "1990-01-01",
      private_place_of_birth: "New York",
      private_address: "123 Main St, New York, NY",
      private_nationality: "American",
      private_document_type: "ID Card",
      private_document_number: "123456789",
      private_date_of_issue: "2015-05-01",
      private_signatory_authority: "None",
      private_expiry_date: "2030-05-01",
      private_taxpayer_identification_number: "987654321",
      private_occupation: "Software Engineer",
      private_contact: "123-456-7890",
      private_whatsapp_contact: "123-456-7890",
      private_email: "johndoe@example.com",
      private_mail_box: "PO Box 1234",
      private_marital_status: "Single",
      private_spouses_name: "",
      private_number_of_children: 0,
      private_emergency_contact_name: "Jane Doe",
      private_emergency_contact: "098-765-4321",
      private_emergency_contact_relation: "Sister",
      private_photo: "https://via.placeholder.com/150",
      private_documents: ["https://via.placeholder.com/150"],
      business_company_name: "",
      business_taxpayer_identification_number: "",
      business_business_registration_number: "",
      business_industry_sector: "",
      business_office_phone_number: "",
      business_whatsapp_contact: "",
      business_email: "",
      business_head_office: "",
      business_mail_box: "",
      business_capital: 0,
      business_manager_pronouns_title: "",
      business_manager_name: "",
      business_manager_gender: "",
      business_manager_contact: "",
      business_manager_date_of_birth: "",
      business_manager_place_of_birth: "",
      business_manager_address: "",
      business_manager_job_position: "",
      business_manager_type_of_document: "",
      business_manager_document_number: "",
      business_manager_date_of_issue: "",
      business_manager_signatory_authority: "",
      business_manager_expiry_date: "",
      business_photo: "",
      business_documents: [],
     
      status: "Active",
    },
    template_id: 1,
    site_images: [
      {
        site_image: "https://via.placeholder.com/300",
      },
    ],
    feedback_by_admin: null,
    complete_by_user: true,
    created_at: "2025-02-06T12:00:00Z",
    updated_at: "2025-02-06T12:00:00Z",
  };
  
 
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
 // Function to trigger the print dialog after generating the PDF
 const handlePrint = () => {
  ReactPDF.render(<AssessmentPDF assessment={sampleAssessment} />, '/tmp/assessment.pdf');
 
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
        <ReactPDF.PDFDownloadLink
        document={<AssessmentPDF assessment={sampleAssessment} />}
        fileName="assessment_report.pdf"
      >
        {({ loading }) =>
          loading ? "Preparing PDF..." : (
            <button
              className="p-2 bg-yellow-100 rounded-full shadow hover:bg-yellow-200"
              onClick={handlePrint} // Prints the PDF after download
            >
              <Printer size={25} className="text-yellow-700" />
            </button>
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
