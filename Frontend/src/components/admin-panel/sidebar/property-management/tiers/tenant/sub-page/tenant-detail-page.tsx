import React, { useState } from 'react';
import PersonalDetails from './PersonalDetails';
import Documents from './Contract';
import EmergencyContact from './StateofPlay';
import OtherInformation from './OtherInformation';
import StateofPlay from './StateofPlay';

interface TenantDetailPageProps {
  referenceNo?: string;
  fullName?: string;
  type?: string;
  email?: string;
  phone?: string;
  residence?: string;
  postalCode?: string;
  profession?: string;
  birthDate?: string;
  sharedAffinity?: string;
  documentType?: string;
  gender?: string;
  maritalStatus?: string;
  children?: number;
  emergencyContactPerson?: string;
  emergencyContactNumber?: string;
  fileNotes?: string;
}

const TenantDetailPage = ({
  referenceNo = "ZA-6972-6414-01",
  fullName = "Mr. Assemian N'Guessan Adolphe",
  type = "INDIVIDUAL",
  email = "someone@example.com",
  phone = "0707787973",
  residence = "1234 Residence St, City",
  postalCode = "AB12345",
  profession = "Engineer",
  birthDate = "1985-06-15",
  sharedAffinity = "Parents",
  documentType = "CNI",
  gender = "Male",
  maritalStatus = "Single",
  children = 0,
  emergencyContactPerson = "John Doe",
  emergencyContactNumber = "0701234567",
  fileNotes = "Accepted formats and sizes: JPEG, JPG, PNG, PDF, DOCS, DOCX, etc.",
}: TenantDetailPageProps) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // You can also process the file here (e.g., upload it)
    }
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <PersonalDetails
            referenceNo={referenceNo}
            fullName={fullName}
            type={type}
            email={email}
            phone={phone}
            residence={residence}
            postalCode={postalCode}
            profession={profession}
            birthDate={birthDate}
            sharedAffinity={sharedAffinity}
            documentType={documentType}
            gender={gender}
            maritalStatus={maritalStatus}
            children={children}
            emergencyContactPerson={emergencyContactPerson}
            emergencyContactNumber={emergencyContactNumber}
            fileNotes="Accepted formats and sizes: JPEG, JPG, PNG, PDF, DOCS, DOCX, etc."
      onFileChange={handleFileChange}
          />
        );
      case "documents":
        return <Documents />;
      case "emergency":
        return (
          <StateofPlay
        
          />
        );
      case "other":
        return <OtherInformation />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg ">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-6 ">
        <img
          src="https://example.com/jane-doe.jpg"
          alt="User Profile"
          className="w-24 h-24 rounded-full border-2 border-white"
        />
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">{fullName}</h2>
          <p className="text-gray-500">{gender}</p>
          <p className="text-gray-500">DOB: {birthDate}</p>
        </div>
      </div>

      {/* Tabs for Personal Info, Documents, Emergency Contact */}
      <div className="mb-4">
        <div className="flex space-x-4 mb-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("personal")}
            className={`py-2 px-4 text-sm font-semibold ${activeTab === "personal" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600 hover:text-gray-800"}`}
          >
            Personal Details
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`py-2 px-4 text-sm font-semibold ${activeTab === "documents" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600 hover:text-gray-800"}`}
          >
           Contract
          </button>
          <button
            onClick={() => setActiveTab("emergency")}
            className={`py-2 px-4 text-sm font-semibold ${activeTab === "emergency" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600 hover:text-gray-800"}`}
          >
        State of Play
          </button>
          <button
            onClick={() => setActiveTab("other")}
            className={`py-2 px-4 text-sm font-semibold ${activeTab === "other" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600 hover:text-gray-800"}`}
          >
            Other Information
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {renderTabContent()}
        </div>
      </div>

 
   
    </div>
  );
};

export default TenantDetailPage;
