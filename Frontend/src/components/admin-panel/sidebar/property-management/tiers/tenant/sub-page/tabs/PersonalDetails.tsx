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
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Handler for file change
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
      <div className="grid grid-cols-1 sm:text-start text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
 
      {/* Name and Type */}

      <div className=''>
          <p className="font-semibold ">Name and First Name:</p>
          <p>{fullName}</p>
        </div>
        <div>
          <p className="font-semibold">Type:</p>
          <p>{type}</p>
        </div>
    
      <div>
          <p className="font-semibold">Email:</p>
          <p>{email}</p>
        </div>
        <div>
          <p className="font-semibold">Phone:</p>
          <p>{phone}</p>
        </div>
      <div>
          <p className="font-semibold">Residence:</p>
          <p>{residence}</p>
        </div>
        <div>
          <p className="font-semibold">Postal Code:</p>
          <p>{postalCode}</p>
        </div>
      {/* Profession */}
      <div>
        <p className="font-semibold">Profession:</p>
        <p>{profession}</p>
      </div>

    
      <div>
          <p className="font-semibold">Date of Birth:</p>
          <p>{birthDate}</p>
        </div>
        <div>
          <p className="font-semibold">Shared Affinity:</p>
          <p>{sharedAffinity}</p>
        </div>
      <div>
          <p className="font-semibold">Type of Document:</p>
          <p>{documentType}</p>
        </div>
        <div>
          <p className="font-semibold">Gender:</p>
          <p>{gender}</p>
        </div>
      <div>
          <p className="font-semibold">Marital Status:</p>
          <p>{maritalStatus}</p>
        </div>
        <div>
          <p className="font-semibold">Number of Children:</p>
          <p>{children}</p>
        </div>

      <div>
          <p className="font-semibold">Emergency Contact Person:</p>
          <p>{emergencyContactPerson}</p>
        </div>
      <div>
          <p className="font-semibold">Emergency Contact Number:</p>
          <p>{emergencyContactNumber}</p>
        </div>
     
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* File Notes Section */}
      <div className="">
        <div
          className="font-semibold text-center bg-primary text-white p-2 mb-5 cursor-pointer"
          onClick={handleFileClick} // Trigger file input on click
        >
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
      {/* Buttons 
      */}
      <div className="flex justify-end space-x-4 mt-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Modify</button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md">Print</button>
      </div>
    </div>  </div>
  );
};

export default PersonalDetails;
