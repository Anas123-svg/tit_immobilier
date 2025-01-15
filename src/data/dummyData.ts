import { DollarSign, Briefcase, AlertTriangle, User, FileText, CheckCircle, Building,Home,Repeat, } from "lucide-react";
import { StatCardProps, SummaryCardProps, FilterOptions ,Mandate,Owner,Tenant,StatCard,ListOfTenantsSectionProps } from "@/types/DataProps"; // Assuming these types are defined in your project

// Filter options for the dropdown
export const filterOptions: FilterOptions = {
  type: ["ALL", "Pay", "Commission Agency", "Caution", "VAT on Commission"],
};

// Statistics cards data for Management Portfolio
export const statCardsData: StatCardProps[] = [
  {
    name: "Pay",
    value: "172,000 XOF",
    icon: DollarSign,
    color: "bg-green-500",
  },
  {
    name: "Commission",
    value: "12,000 XOF",
    icon: Briefcase,
    color: "bg-blue-500",
  },
  {
    name: "Caution",
    value: "160,000 XOF",
    icon: AlertTriangle,
    color: "bg-yellow-500",
  },
];

// Principal statistics data
export const principalStats: StatCardProps[] = [
  {
    name: "Owner",
    value: "4",
    color: "bg-yellow-500",
    activeLabel: "Active",
    inactiveLabel: "Inactive",
    icon: User,
  },
  {
    name: "Tenant",
    value: "12",
    color: "bg-red-500",
    activeLabel: "Active",
    inactiveLabel: "Inactive",
    icon: Building,
  },
  {
    name: "Contract",
    value: "12",
    color: "bg-blue-500",
    activeLabel: "Active",
    inactiveLabel: "Terminated",
    icon: FileText,
  },
  {
    name: "Mandate",
    value: "4",
    color: "bg-green-500",
    activeLabel: "Valid",
    inactiveLabel: "Terminated",
    icon: CheckCircle,
  },
];

// Summary cards data
export const summaryCardsData: SummaryCardProps[] = [
  { name: "Real Estate", value: 4, color: "yellow" },
  { name: "Ticket", value: 0, color: "green" },
  { name: "Intervention", value: 0, color: "red" },
  { name: "Supplier", value: 0, color: "blue" },
];





  export const circularDiagramData = {
    labels: ["Occupied", "Reserved", "Available"],
    datasets: [
      {
        data: [10, 5, 32],
        backgroundColor: ["#34D399", "#3B82F6", "#F87171"],
      },
    ],
  };



  // DummyData.ts

export const activeOwners: Owner[] = [
    {
      name: "Mrs. DIOMANDE AUDREY ASTOU",
      contact: "627745376 - INDIVIDUAL",
      profession: "CHEMIST",
      code: "ZA-6972-8243-01",
    },
    {
      name: "Mr. SANGARE YOU ARE THE ONE",
      contact: "0709739307 - INDIVIDUAL",
      profession: "BUSINESS MANAGER",
      code: "ZA-6972-2150-01",
    },
    {
      name: "Mr. YAO KOUADIO FERNAND",
      contact: "585139200 - INDIVIDUAL",
      profession: "ENGINEER",
      code: "ZA-6972-6988-01",
    },
    {
      name: "Mr. DEMBELE BASSERIBA",
      contact: "19782278791 - INDIVIDUAL",
      profession: "ENGINEER",
      code: "ZA-6972-4802-01",
    },
  ];
  
  export const validatedMandates: Mandate[] = [
    {
      good: "DEMBELE BUILDING",
      surfaceArea: "0 m²",
      owner: "DEMBELE BASSERIBA",
      type: "Location",
      amount: "180,120 XOF",
    },
    {
      good: "YAO FERNAND BUILDING",
      surfaceArea: "0 m²",
      owner: "YAO KOUADIO FERNAND",
      type: "Location",
      amount: "222,000 XOF",
    },
    {
      good: "SANGARE BUILDING",
      surfaceArea: "425 m²",
      owner: "SANGARE YACOUBA",
      type: "Location",
      amount: "397,000 XOF",
    },
    {
      good: "VILLA JULES VERNE",
      surfaceArea: "300 m²",
      owner: "DIOMANDE AUDREY ASTOU",
      type: "Location",
      amount: "50,000 XOF",
    },
  ];
  

export  const statsData: StatCard[] = [
   { name: "Owner", value: 4, color: "bg-red-100 text-red-700", icon: User },
    { name: "Locative", value: 47, color: "bg-green-100 text-green-700", icon: Home },
    { name: "Mandate", value: 4, color: "bg-yellow-100 text-yellow-700", icon: FileText },
    { name: "Reversal", value: 0, color: "bg-blue-100 text-blue-700", icon: Repeat },
  ];
  


export const validationStats = [
  { name: "Rental Payments", value: 0, icon: DollarSign, color: "bg-yellow-500" },
  { name: "Payments Sale", value: 0, icon: Home, color: "bg-blue-500" },
  { name: "Rental Contracts", value: 0, icon: FileText, color: "bg-red-500" },
  { name: "Sales File", value: 0, icon: Repeat, color: "bg-gray-500" },
  { name: "Management Mandate", value: 0, icon: FileText, color: "bg-green-500" },
  { name: "Reversal", value: 0, icon: Repeat, color: "bg-purple-500" },
  { name: "State of Play", value: 0, icon: DollarSign, color: "bg-teal-500" },
  { name: "Termination of Contract", value: 0, icon: Home, color: "bg-orange-500" },
  { name: "Contract Renewal", value: 0, icon: FileText, color: "bg-pink-500" },
  { name: "Supply", value: 0, icon: Repeat, color: "bg-indigo-500" },
  { name: "Spent", value: 0, icon: DollarSign, color: "bg-cyan-500" },
];

export const dummyOwners = [
    {
      id: 1,
      name: "DIOMANDE AUDREY ASTOU",
      reference: "ZA-6972-8243-01",
      contact: "627745376",
      address: "PARIS-FRANCE",
      status: "Active",
      sold: "0 XOF",
      imgUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      name: "SANGARE YACOUBA",
      reference: "ZA-6972-2150-01",
      contact: "0709739307",
      address: "KOUMASSI",
      status: "Active",
      sold: "0 XOF",
      imgUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "YAO KOUADIO FERNAND",
      reference: "ZA-6972-6988-01",
      contact: "585139200",
      address: "USA",
      status: "Active",
      sold: "108,000 XOF",
      imgUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "DEMBELE BASSERIBA",
      reference: "ZA-6972-4802-01",
      contact: "19782278791",
      address: "USA",
      status: "Active",
      sold: "0 XOF",
      imgUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    },
  ];
  export const dummyTenants : Tenant[] = [
    {
      id: 1,
      name: "ASSEMIAN N'GUESSAN ADOLPHE",
      reference: "ZA-6972-6414-01",
      contact: "0707787973",
      contracts: "1",
      address: "YAO FERNAND BUILDING - STUDIO No. A5",
      homeStatus: "OWE: 9,900,000 XOF",
      status: "Active",
      imgUrl: "https://randomuser.me/api/portraits/men/1.jpg", // Example image URL
    },
    {
      id: 2,
      name: "YAO N'GUESSAN ALAIN ROLAND",
      reference: "ZA-6972-2939-01",
      contact: "0777120473",
      contracts: "1",
      address: "YAO FERNAND BUILDING - APARTMENT No. A7",
      homeStatus: "DUE: 0 XOF",
      status: "Active",
      imgUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "KOUADIO JEAN MICHEL",
      reference: "ZA-6972-1293-01",
      contact: "0778901234",
      contracts: "2",
      address: "ABIDJAN - COCODY",
      homeStatus: "OWE: 5,500,000 XOF",
      status: "Inactive",
      imgUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "AHOUA MARIE LAURE",
      reference: "ZA-6972-9384-01",
      contact: "0583920123",
      contracts: "1",
      address: "VILLA VERNE",
      homeStatus: "DUE: 0 XOF",
      status: "Active",
      imgUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
  ];
  