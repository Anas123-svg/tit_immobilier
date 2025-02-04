import React, { useState } from "react";
import PersonalDetails from "./tabs/PersonalDetails";
import Documents from "./tabs/Contract";
import EmergencyContact from "./tabs/StateofPlay";
import OtherInformation from "./tabs/OtherInformation";
import StateofPlay from "./tabs/StateofPlay";
import Bills from "./tabs/Bills";
import NoticeofExpiry from "./tabs/NoticeofExpiry";
import Payments from "./tabs/Payments";
import Tickets from "./tabs/Tickets";
import {
  User,
  FileText,
  PlayCircle,
  File,
  Clock,
  CreditCard,
  Ticket,
  MapIcon,
  Phone,
  Mail,
  CaseLowerIcon,
  Badge,
  BadgeCheck,
  BadgeCheckIcon,
  Briefcase,
} from "lucide-react";
import { useParams } from "react-router-dom";
import useFetchData from "@/hooks/useFetchData";

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
  const { id } = useParams();


  const tenant =  useFetchData


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // You can also process the file here (e.g., upload it)
    }
  };
  const personalDetailsProps = {
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
    fileNotes: "Accepted formats and sizes: JPEG, JPG, PNG, PDF, DOCS, DOCX, etc.",
    onFileChange: handleFileChange,
  };

  const tabs = [
    { 
      name: 'personal', 
      label: 'Personal Details', 
      icon: <User className="inline mr-2" />, 
      component: <PersonalDetails {...personalDetailsProps} />
    },
    { 
      name: 'documents', 
      label: 'Contract', 
      icon: <FileText className="inline mr-2" />, 
      component: <Documents />
    },
    { 
      name: 'emergency', 
      label: 'State of Play', 
      icon: <File className="inline mr-2" />, 
      component: <StateofPlay />
    },
    { 
      name: 'bills', 
      label: 'Bills', 
      icon: <File className="inline mr-2" />, 
      component: <Bills />
    },
    { 
      name: 'noticeofexpiry', 
      label: 'Notice of Expiry', 
      icon: <Clock className="inline mr-2" />, 
      component: <NoticeofExpiry />
    },
    { 
      name: 'payments', 
      label: 'Payments', 
      icon: <CreditCard className="inline mr-2" />, 
      component: <Payments />
    },
    { 
      name: 'tickets', 
      label: 'Tickets', 
      icon: <Ticket className="inline mr-2" />, 
      component: <Tickets />
    },
  ];
  
  const renderTabContent = () => {
    const activeTabContent = tabs.find((tab) => tab.name === activeTab);
    return activeTabContent ? activeTabContent.component : null;
  };

  return (
    <div className="bg-white shadow-lg p-0 sm:p-6 space-y-9 rounded-lg ">
      {/* Profile Header */}
      <div className="flex  sm:flex-row flex-col p-6 gap-5 sm:gap-10 relative shadow-md">
        <div className="bg-secondary w-full h-16 absolute z-10 top-0 left-0">
          {" "}
        </div>
        <div className="flex flex-col z-50 text-center items-center gap-6 p-4 rounded-t-md">
          <div className="relative p-2">
            <img
              src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
              alt="User Profile"
              className="w-24 h-24 rounded-full border-4"
            />
            <BadgeCheckIcon className="text-blue-500 absolute bottom-0 right-0" />
          </div>
          <div className="space-y-2 text-black">
            <h2 className="text-lg">KONAN MINI REBECCA</h2>
            <p className="text-sm">PARTICULAR</p>
          </div>
        </div>
        <div className="flex flex-col items-center lg:flex-row   gap-5 sm:gap-10 justify-center">
          {/* Contact Details and Financial Status */}
          <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-2 gap-4   self-center h-2/3 p-0 sm:pt-16 bg-white rounded-b-md">
            <div className="flex items-center gap-2  ">
              <MapIcon size={20} />
              <p className="text-sm">COCODY FAYA</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={20} />
              <p className="text-sm">0710004867</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={20} />
              <p className="text-sm">coconar@faya.com</p>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={20} />
              <p className="text-sm">coconar@faya.com</p>
            </div>
          </div>

          <div className="  text-red-500 text-center font-semibold ">
            <p className="text-lg">OWE: 585,000 XOF</p>
          </div>
        </div>
      </div>

      {/* Tabs for Personal Info, Documents, Emergency Contact */}
      <div className="mb-4">
      <div className="flex flex-wrap gap-4 mb-4 border-b border-gray-200">
  {tabs.map((tab) => (
    <button
      key={tab.name}
      onClick={() => setActiveTab(tab.name)}
      className={`py-2 px-4 text-sm font-semibold ${
        activeTab === tab.name
          ? "text-blue-500 border-b-2 border-blue-500"
          : "text-gray-600 hover:text-gray-800"
      }`}
    >
      {tab.icon}
      {tab.label}
    </button>
  ))}
</div>


        {/* Tab Content */}
        <div className="space-y-4">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default TenantDetailPage;
