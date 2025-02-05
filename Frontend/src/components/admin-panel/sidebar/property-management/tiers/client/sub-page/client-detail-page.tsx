import React, { useState } from "react";
import PersonalDetails from "./tabs/PersonalDetails";
import Documents from "./tabs/Case";
import EmergencyContact from "./tabs/Mutations";
import OtherInformation from "./tabs/OtherInformation";
import StateofPlay from "./tabs/Mutations";
import Bills from "./tabs/Bills";
import NoticeofExpiry from "./tabs/Terminations";
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
import useFetchData from "@/hooks/useFetchData";
import { useParams } from "react-router-dom";


interface Client {
  id: number;
  is_business_client: boolean;
  private_pronouns: string;
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
  private_taxpayer_identification_number: string;
  private_occupation: string;
  private_contact: string;
  private_whatsapp_contact: string;
  private_email: string;
  private_mail_box: string;
  private_marital_status: string;
  private_spouses_name: string;
  private_number_of_children: number;
  private_emergency_contact_name: string;
  private_emergency_contact: string;
  private_emergency_contact_relation: string;
  private_photo: string | null;
  private_documents: string[];
  business_company_name: string;
  business_taxpayer_identification_number: string;
  business_business_registration_number: string;
  business_industry_sector: string;
  business_office_phone_number: string;
  business_whatsapp_contact: string;
  business_email: string;
  business_head_office: string;
  business_mail_box: string;
  business_capital: number;
  business_manager_pronouns_title: string;
  business_manager_name: string;
  business_manager_gender: string;
  business_manager_contact: string;
  business_manager_date_of_birth: string;
  business_manager_place_of_birth: string;
  business_manager_address: string;
  business_manager_job_position: string;
  business_manager_type_of_document: string;
  business_manager_document_number: string;
  business_manager_date_of_issue: string;
  business_manager_signatory_authority: string;
  business_manager_expiry_date: string;
  business_photo: string | null;
  business_documents: string[];
  status: string;
}


const ClientDetailPage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // You can also process the file here (e.g., upload it)
    }
  };
const {id} = useParams()
  const { data: client, loading, error } = useFetchData<Client>(
    `${import.meta.env.VITE_API_URL}/api/clients/${id}`
  );
  const tabs = [
    { 
      name: 'personal', 
      label: 'Personal Details', 
      icon: <User className="inline mr-2" />, 
      component: <PersonalDetails client={client??undefined} onFileChange={handleFileChange} />
    },
    { 
      name: 'documents', 
      label: 'Case', 
      icon: <FileText className="inline mr-2" />, 
      component: <Documents />
    },
    { 
      name: 'emergency', 
      label: 'Mutations', 
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
      label: 'Terminations', 
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
                  src={(client?.is_business_client? client.business_photo:client?.private_photo) || `https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg`}
                  alt="User Profile"
                  className="w-24 h-24 rounded-full border-4"
                />
                <BadgeCheckIcon className="text-blue-500 absolute bottom-0 right-0" />
              </div>
              <div className="space-y-2 text-black">
                <h2 className="text-lg"> {client?.is_business_client ? client?.business_company_name : client?.private_name}</h2>
                <p className="text-sm">PARTICULAR</p>
              </div>
            </div>
            <div className="flex flex-col items-center lg:flex-row   gap-5 sm:gap-10 justify-center">
              {/* Contact Details and Financial Status */}
              <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-2 gap-4   self-center h-2/3 p-0 sm:pt-16 bg-white rounded-b-md">
                <div className="flex items-center gap-2  ">
                  <MapIcon size={20} />
                  <p className="text-sm">{client?.is_business_client ? client?.business_manager_address : client?.private_address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={20} />
                  <p className="text-sm">{client?.is_business_client ? client?.business_office_phone_number : client?.private_whatsapp_contact}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={20} />
                  <p className="text-sm">{client?.is_business_client ? client?.business_email : client?.private_email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={20} />
                  <p className="text-sm">{client?.business_email }</p>
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

export default ClientDetailPage;
