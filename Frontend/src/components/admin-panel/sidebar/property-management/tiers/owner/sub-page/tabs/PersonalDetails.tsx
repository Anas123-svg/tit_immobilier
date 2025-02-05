import React, { useRef } from "react";

// Define the Owner Interface based on the provided model
interface Owner {
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
  is_business_owner: boolean;
  status: string;
  payment_status: string;
}

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
          <p className="font-semibold">Name and First Name:</p>
          {owner?.is_business_owner ? owner?.business_company_name : owner?.private_name}
        </div>

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
          {owner?.is_business_owner ? owner?.business_mail_box : owner?.private_mail_box}
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
      <div className="flex justify-end space-x-4 mt-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Modify</button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md">Print</button>
      </div>
    </div>
  );
};

export default PersonalDetails;
