import React, { useRef } from "react";

// Define Tenant Interface matching the model
interface Tenant {
  id: number;
  business_company_name: string;
  business_taxpayer_account_number: string;
  business_business_registration_number: string;
  business_industry_sector: string;
  business_office_phone_number: string;
  business_whatsapp_contact: string;
  business_email: string;
  business_head_office: string;
  business_mail_box: string;
  business_capital: number;
  business_manager_name: string;
  business_manager_gender: string;
  business_manager_contact: string;
  business_manager_job_position: string;
  business_manager_address: string;
  business_manager_type_of_document: string;
  business_manager_document_number: string;
  business_manager_date_of_issue: string;
  business_manager_expiry_date: string;
  business_photo: string | null;
  business_documents: string[];
  private_name: string;
  private_gender: string;
  private_birth_date: string;
  private_place_of_birth: string;
  private_address: string;
  private_nationality: string;
  private_document_type: string;
  private_document_number: string;
  private_date_of_issue: string;
  private_signatory_authority: string;
  private_expiry_date: string;
  private_taxpayer_account_number: string;
  private_occupation: string;
  private_contact: string;
  private_whatsapp_contact: string;
  private_email: string;
  private_mail_box: string;
  private_marital_status: string;
  private_number_of_children: number;
  private_emergency_contact_name: string;
  private_emergency_contact: string;
  private_emergency_contact_relation: string;
  private_photo: string | null;
  private_documents: string[];
  is_business_tenant: boolean;
  status: string;
  payment_status: string;
}

interface PersonalDetailsProps {
  tenant?: Tenant;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalDetails = ({ tenant, onFileChange }: PersonalDetailsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle the click event for the file input
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* Title and Reference Info */}
      <div className="flex items-center sm:flex-row flex-col justify-between">
        <h2 className="text-xl font-semibold">Personal Details</h2>
        <div className="text-sm text-gray-500">REFERENCE: {tenant?.id}</div>
      </div>

      <div className="grid grid-cols-1 sm:text-start text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {/* Conditional rendering based on tenant type */}
        <div className="">
          <p className="font-semibold">Name and First Name:</p>
          <p>{tenant?.is_business_tenant ? tenant?.business_company_name : tenant?.private_name}</p>
        </div>

        <div>
          <p className="font-semibold">Type:</p>
          <p>{tenant?.is_business_tenant ? "Business" : "Individual"}</p>
        </div>

        <div>
          <p className="font-semibold">Email:</p>
          <p>{tenant?.is_business_tenant ? tenant?.business_email : tenant?.private_email}</p>
        </div>

        <div>
          <p className="font-semibold">Phone:</p>
          <p>{tenant?.is_business_tenant ? tenant?.business_office_phone_number : tenant?.private_contact}</p>
        </div>

        <div>
          <p className="font-semibold">Residence:</p>
          <p>{tenant?.is_business_tenant ? tenant?.business_head_office : tenant?.private_address}</p>
        </div>

        <div>
          <p className="font-semibold">Postal Code:</p>
          <p>{tenant?.is_business_tenant ? tenant?.business_mail_box : tenant?.private_mail_box}</p>
        </div>

        {/* Profession */}
        <div>
          <p className="font-semibold">Profession:</p>
          <p>{tenant?.is_business_tenant ? tenant?.business_industry_sector : tenant?.private_occupation}</p>
        </div>

        {/* Date of Birth */}
        <div>
          <p className="font-semibold">Date of Birth:</p>
          <p>{tenant?.is_business_tenant ? "N/A" : tenant?.private_birth_date}</p>
        </div>

        {/* Shared Affinity */}
        <div>
          <p className="font-semibold">Shared Affinity:</p>
          <p>{tenant?.is_business_tenant ? "N/A" : tenant?.private_nationality}</p>
        </div>

        {/* Type of Document */}
        <div>
          <p className="font-semibold">Type of Document:</p>
          <p>{tenant?.is_business_tenant ? tenant?.business_manager_type_of_document : tenant?.private_document_type}</p>
        </div>

        {/* Gender */}
        <div>
          <p className="font-semibold">Gender:</p>
          <p>{tenant?.is_business_tenant ? tenant?.business_manager_gender : tenant?.private_gender}</p>
        </div>

        {/* Marital Status */}
        <div>
          <p className="font-semibold">Marital Status:</p>
          <p>{tenant?.is_business_tenant ? "N/A" : tenant?.private_marital_status}</p>
        </div>

        {/* Number of Children */}
        <div>
          <p className="font-semibold">Number of Children:</p>
          <p>{tenant?.is_business_tenant ? "N/A" : tenant?.private_number_of_children}</p>
        </div>

        {/* Emergency Contact Person */}
        <div>
          <p className="font-semibold">Emergency Contact Person:</p>
          <p>{tenant?.is_business_tenant ? "N/A" : tenant?.private_emergency_contact_name}</p>
        </div>

        {/* Emergency Contact Number */}
        <div>
          <p className="font-semibold">Emergency Contact Number:</p>
          <p>{tenant?.is_business_tenant ? "N/A" : tenant?.private_emergency_contact}</p>
        </div>
      </div>

      {/* File Notes Section */}
      <div className="">
        <div
          className="font-semibold text-center bg-primary text-white p-2 mb-5 cursor-pointer"
          onClick={handleFileClick} // Trigger file input on click
        >
          File Notes:
        </div>
        <p className="text-center p-10 border-gray-400 border border-dotted" onClick={handleFileClick}>
          {tenant?.is_business_tenant ? "Business Documents" : "Private Documents"}
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
      <div className="flex justify-end space-x-4 mt-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Modify</button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md">Print</button>
      </div>
    </div>
  );
};

export default PersonalDetails;
