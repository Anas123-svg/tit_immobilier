import React, { useState } from "react";
import WalletComponent from './tabs/Wallet'; // Import your components
import ProfileComponent from './tabs/PersonalDetails';
import GoodComponent from './tabs/Good';
import LocativeComponent from './tabs/Locative';
import MandateComponent from './tabs/Mandate';
import ReversalComponent from './tabs/Reversal';
import TicketComponent from './tabs/Ticket';
import WalletWithdrawalComponent from './tabs/WalletWithdrawal';
import ApproAccountComponent from './tabs/ApproAccount';
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
  Home,
  CaseLowerIcon,
  Badge,
  BadgeCheck,
  BadgeCheckIcon,
  Briefcase,
  ArrowLeft, Wallet, ArrowRight
} from "lucide-react";
import ReversalPropertyForRentalOwnerForm from "../forms/ReversalPropertyForRentalOwnerForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MakeDepositOwnerForm from "./forms/MakeDepositOwnerForm";
import MakeWithdrawalOwnerForm from "./forms/MakeWithdrawalOwnerForm";
import PullAccountStatementForm from "./forms/PullAccountStatementFormProps";

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

const OwnerDetailPage = ({
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
  const [activeTab, setActiveTab] = useState("wallet");
  const [file, setFile] = useState<File | null>(null);

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
      name: 'wallet', 
      label: 'Wallet', 
      icon: <Wallet className="inline mr-2" />, 
      component: <WalletComponent />
    },
    { 
      name: 'profile', 
      label: 'Profile', 
      icon: <User className="inline mr-2" />, 
      component: <ProfileComponent {...personalDetailsProps} />
    },
    { 
      name: 'good', 
      label: 'GOOD', 
      icon: <FileText className="inline mr-2" />, 
      component: <GoodComponent />
    },
    { 
      name: 'locative', 
      label: 'Locative', 
      icon: <Home className="inline mr-2" />, 
      component: <LocativeComponent />
    },
    { 
      name: 'mandate', 
      label: 'Mandate', 
      icon: <FileText className="inline mr-2" />, 
      component: <MandateComponent />
    },
    { 
      name: 'reversal', 
      label: 'Reversal', 
      icon: <FileText className="inline mr-2" />, 
      component: <ReversalComponent />
    },
    { 
      name: 'ticket', 
      label: 'Ticket', 
      icon: <Ticket className="inline mr-2" />, 
      component: <TicketComponent />
    },
    { 
      name: 'walletwithdrawal', 
      label: 'Wallet Withdrawal', 
      icon: <CreditCard className="inline mr-2" />, 
      component: <WalletWithdrawalComponent />
    },
    { 
      name: 'approaccount', 
      label: 'Approve Account', 
      icon: <CreditCard className="inline mr-2" />, 
      component: <ApproAccountComponent />
    },
  ];
  const renderTabContent = () => {
    const activeTabContent = tabs.find((tab) => tab.name === activeTab);
    return activeTabContent ? activeTabContent.component : null;
  };
  const [isDepositFormOpen, setIsDepositFormOpen] = useState(false); // State to manage the dialog open/close
  const handleDepositFormOpen = () => setIsDepositFormOpen(true); // Open dialog
  const handleDepositFormClose = () => setIsDepositFormOpen(false); // Close dialog


    // State to manage the dialog open/close for withdrawal form
    const [isWithdrawalFormOpen, setIsWithdrawalFormOpen] = useState(false);

    // Open dialog function
    const handleWithdrawalFormOpen = () => setIsWithdrawalFormOpen(true);
  
    // Close dialog function
    const handleWithdrawalFormClose = () => setIsWithdrawalFormOpen(false);
    const [isPullAccountFormOpen, setIsPullAccountFormOpen] = useState(false);

  // Open dialog function
  const handlePullAccountFormOpen = () => setIsPullAccountFormOpen(true);

  // Close dialog function
  const handlePullAccountFormClose = () => setIsPullAccountFormOpen(false);


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

          <div className="  text-green-500 text-center font-semibold ">
            <p className="text-lg">Sold: 585,000 XOF</p>
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




        <div className="flex flex-wrap gap-4 p-4">
      {/* Back Button */}
      <button className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
        <ArrowLeft className="mr-2" /> Back
      </button>

      {/* Wallet Deposit Button */}
      <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onSelect={(e)=>e.preventDefault()}  onClick={handleDepositFormOpen}>
        <Wallet className="mr-2" /> Wallet Deposit
      </button>
      
      {/* Wallet Withdrawal Button */}
      <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"  onSelect={(e)=>e.preventDefault()}  onClick={handleWithdrawalFormOpen}>
        <ArrowRight className="mr-2" /> Wallet Withdrawal
      </button>
    
      {/* Account Statement Button */}
      <button className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600" onSelect={(e)=>e.preventDefault()}  onClick={handlePullAccountFormOpen}>
        <FileText className="mr-2" /> Account Statement
      </button>
     
    </div>
      {/* Reversal Property for Sale Form */}
      
        {/* Tab Content */}
        <div className="space-y-4">{renderTabContent()}</div>
            {/* Dialog Component */}
      
      </div>
      <MakeDepositOwnerForm open={isDepositFormOpen} onClose={handleDepositFormClose}/>
      <MakeWithdrawalOwnerForm open={isWithdrawalFormOpen} onClose={handleWithdrawalFormClose}/>
       <PullAccountStatementForm open={isPullAccountFormOpen} onClose={handlePullAccountFormClose}/>
    </div>
  );
};

export default OwnerDetailPage;

// DummyComponent that will show content when opened
const DummyComponent: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl mb-4">This is a dummy component</h2>
      <p>Here you can add your content or form.</p>
      <Button className="mt-4 bg-primary">Submit</Button>
    </div>
  );
};