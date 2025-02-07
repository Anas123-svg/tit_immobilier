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
import { Tenant, TenantProfile } from "@/types/DataProps";


const TenantDetailPage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [file, setFile] = useState<File | null>(null);
  const { id } = useParams();



  const { data: tenant, loading, error } = useFetchData<TenantProfile>(
    `${import.meta.env.VITE_API_URL}/api/profile/tenant/${id}`
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // You can also process the file here (e.g., upload it)
    }
  };

  const tabs = [
    { 
      name: 'personal', 
      label: 'Personal Details', 
      icon: <User className="inline mr-2" />, 
      component: <PersonalDetails tenant={tenant?.profile??undefined} onFileChange={handleFileChange} />
    },
    { 
      name: 'documents', 
      label: 'Contract', 
      icon: <FileText className="inline mr-2" />, 
      component: <Documents tenant_cases={tenant?.tenant_contract}  />
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
      component: <Bills tenant_bills={tenant?.tenant_bill}/>
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
      component: <Payments tenant_payments={tenant?.tenant_payment}/>
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
              src={(tenant?.profile?.is_business_tenant? tenant?.profile.business_photo:tenant?.profile?.private_photo) || `https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg`}
              alt="User Profile"
              className="w-24 h-24 rounded-full border-4"
            />
            <BadgeCheckIcon className="text-blue-500 absolute bottom-0 right-0" />
          </div>
          <div className="space-y-2 text-black">
            <h2 className="text-lg"> {tenant?.profile?.is_business_tenant ? tenant?.profile?.business_company_name : tenant?.profile?.private_name}</h2>
            <p className="text-sm">PARTICULAR</p>
          </div>
        </div>
        <div className="flex flex-col items-center lg:flex-row   gap-5 sm:gap-10 justify-center">
          {/* Contact Details and Financial Status */}
          <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-2 gap-4   self-center h-2/3 p-0 sm:pt-16 bg-white rounded-b-md">
            <div className="flex items-center gap-2  ">
              <MapIcon size={20} />
              <p className="text-sm">{tenant?.profile?.is_business_tenant ? tenant?.profile?.business_manager_address : tenant?.profile?.private_address}</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={20} />
              <p className="text-sm">{tenant?.profile?.is_business_tenant ? tenant?.profile?.business_office_phone_number : tenant?.profile?.private_whatsapp_contact}</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={20} />
              <p className="text-sm">{tenant?.profile?.is_business_tenant ? tenant?.profile?.business_email : tenant?.profile?.private_email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={20} />
              <p className="text-sm">{tenant?.profile?.business_email }</p>
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
