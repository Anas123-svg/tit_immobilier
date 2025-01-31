import React, { useRef } from 'react';

interface PersonalDetailsProps {
  referenceNo: string;
  fullName: string;
  type: string;
  email: string;
  phone: string;
  residence: string;
  postalCode: string;
  profession: string;
  birthDate: string;
  sharedAffinity: string;
  documentType: string;
  gender: string;
  maritalStatus: string;
  children: number;
  emergencyContactPerson: string;
  emergencyContactNumber: string;
  fileNotes: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalDetails = ({
  referenceNo,
  fullName,
  type,
  email,
  phone,
  residence,
  postalCode,
  profession,
  birthDate,
  sharedAffinity,
  documentType,
  gender,
  maritalStatus,
  children,
  emergencyContactPerson,
  emergencyContactNumber,
  fileNotes,
  onFileChange,
}: PersonalDetailsProps) => {
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
        <div className="text-sm text-gray-500">REFERENCE: {referenceNo}</div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-5">
        {/* Name and Type */}
       <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Name and First Name:</p>
          {fullName}  
        </div>
       <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Type:</p>
          {type}  
        </div>

       <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Email:</p>
          {email}  
        </div>
       <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Phone:</p>
          {phone}  
        </div>
        <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Residence:</p>
          {residence}
        </div>
       <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Postal Code:</p>
          {postalCode}  
        </div>

       <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Profession:</p>
          {profession}  
        </div>
       <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Date of Birth:</p>
          {birthDate}  
        </div>
       <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Shared Affinity:</p>
          {sharedAffinity}  
        </div>
       <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Type of Document:</p>
          {documentType}  
        </div>
       <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Gender:</p>
          {gender}  
        </div>
       <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Marital Status:</p>
          {maritalStatus}  
        </div>
       <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Number of Children:</p>
          {children}  
        </div>

       <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Emergency Contact Person:</p>
          {emergencyContactPerson}  
        </div>
       <div className="space-y-2 flex items-center text-sm gap-3">
          <p className="font-semibold">Emergency Contact Number:</p>
          {emergencyContactNumber}  
        </div>
      </div>

      {/* File Notes Section */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="font-semibold text-center bg-primary text-white p-2 mb-5 cursor-pointer" onClick={handleFileClick}>
          File Notes:
        </div>
        <p className="text-center p-10 border-gray-400 border border-dotted" onClick={handleFileClick}>
          {fileNotes}
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
