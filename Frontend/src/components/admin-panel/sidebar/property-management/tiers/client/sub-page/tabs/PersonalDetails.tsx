import { Client } from "@/types/DataProps";
import React, { useRef } from "react";

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

      {/* Buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Modify</button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md">Print</button>
      </div>
    </div>
  );
};

export default PersonalDetails;
