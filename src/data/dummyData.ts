import { DollarSign, Briefcase, AlertTriangle, User, FileText, CheckCircle, Building,Home,Repeat, } from "lucide-react";
import { StatCardProps, SummaryCardProps ,Mandate,Owner,Tenant,StatCard,Contract,TreasuryItem } from "@/types/DataProps"; // Assuming these types are defined in your project

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
    icon: User,
  },
  {
    name: "Tenant",
    value: "12",
    color: "bg-red-500",
    icon: Building,
  },
  {
    name: "Contract",
    value: "12",
    color: "bg-blue-500",
    icon: FileText,
  },
  {
    name: "Mandate",
    value: "4",
    color: "bg-green-500",
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
  { name: "Rental Payments", value: "0", icon: DollarSign, color: "bg-yellow-500" },
  { name: "Payments Sale", value: "0", icon: Home, color: "bg-blue-500" },
  { name: "Rental Contracts", value: "0", icon: FileText, color: "bg-red-500" },
  { name: "Sales File", value: "0", icon: Repeat, color: "bg-gray-500" },
  { name: "Management Mandate", value: "0", icon: FileText, color: "bg-green-500" },
  { name: "Reversal", value: "0", icon: Repeat, color: "bg-purple-500" },
  { name: "State of Play", value: "0", icon: DollarSign, color: "bg-teal-500" },
  { name: "Termination of Contract", value: "0", icon: Home, color: "bg-orange-500" },
  { name: "Contract Renewal", value: "0", icon: FileText, color: "bg-pink-500" },
  { name: "Supply", value: "0", icon: Repeat, color: "bg-indigo-500" },
  { name: "Spent", value: "0", icon: DollarSign, color: "bg-cyan-500" },
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
  export const tenantData = [
    {
      name: "ASSEMIAN N'GUESSAN ADOLPHE",
      phone: "0707787973",
      code: "ZA-6972-6414-01",
      status: "Active",
      pay: "OWE: 9,900,000 XOF",
    },
    {
      name: "YAO N'GUESSAN ALAIN ROLAND",
      phone: "0777120473",
      code: "ZA-6972-2939-01",
      status: "Active",
      pay: "DUE: 0 XOF",
    },
    {
      name: "KOUADIO JEAN MICHEL",
      phone: "0778901234",
      code: "ZA-6972-1293-01",
      status: "Inactive",
      pay: "OWE: 5,500,000 XOF",
    },
    {
      name: "AHOUA MARIE LAURE",
      phone: "0583920123",
      code: "ZA-6972-9384-01",
      status: "Active",
      pay: "DUE: 0 XOF",
    },
  ];

  
  export const renewals: Contract[] = [
    {
      reference: "ZA-6972-9058-01",
      tenant: "Miss YAO AMANY HOUPHOUET JEANNE",
      location: "DEMBELE",
      contractStartDate: "2024-01-01",
      contractEndDate: "2024-12-31",
      amount: "500,000 XOF",
    },
    {
      reference: "ZA-6972-4083-01",
      tenant: "Mr. YAO KOUAKOU NARCISSE",
      location: "DEMBELE",
      contractStartDate: "2023-02-01",
      contractEndDate: "2024-02-01",
      amount: "300,000 XOF",
    },
    {
      reference: "ZA-6972-7895-01",
      tenant: "Mrs. KOUASSI ANNE MARIE",
      location: "YAO RESIDENCE",
      contractStartDate: "2023-03-01",
      contractEndDate: "2024-03-01",
      amount: "700,000 XOF",
    },
    {
      reference: "ZA-6972-9123-01",
      tenant: "Mr. KOUADIO JEAN MICHEL",
      location: "VERNE VILLA",
      contractStartDate: "2023-04-01",
      contractEndDate: "2024-04-01",
      amount: "450,000 XOF",
    },
    {
      reference: "ZA-6972-5643-01",
      tenant: "Miss AHOUA MARIE",
      location: "COCODY RESIDENCE",
      contractStartDate: "2023-05-01",
      contractEndDate: "2024-05-01",
      amount: "650,000 XOF",
    },
    {
      reference: "ZA-6972-3210-01",
      tenant: "Mr. SANGARE YACOUBA",
      location: "YAO APARTMENTS",
      contractStartDate: "2023-06-01",
      contractEndDate: "2024-06-01",
      amount: "600,000 XOF",
    },
    {
      reference: "ZA-6972-8765-01",
      tenant: "Mrs. DEMBELE KAREN",
      location: "DEMBELE VILLAS",
      contractStartDate: "2023-07-01",
      contractEndDate: "2024-07-01",
      amount: "800,000 XOF",
    },
    {
      reference: "ZA-6972-4321-01",
      tenant: "Miss DIOMANDE AUDREY",
      location: "COCODY VILLAS",
      contractStartDate: "2023-08-01",
      contractEndDate: "2024-08-01",
      amount: "550,000 XOF",
    },
  ];
  
  export const tenantStats = [
    { name: "Invoice(s)", value: 96, currency: "XOF", color: "bg-blue-500" },
    { name: "Waiting(s)", value: 2, currency: "XOF", color: "bg-blue-400" },
    { name: "Unpaid", value: 72, currency: "XOF", color: "bg-red-500" },
    { name: "In progress", value: 0, currency: "XOF", color: "bg-yellow-500" },
    { name: "Sales", value: 22, currency: "XOF", color: "bg-green-500" },
  ];
  

  export const dummyTreasuryData: TreasuryItem[] = [
    { id: "1", type: "BANK", title: "CHECK CASH", manager: "Manager", company: "New IT Company" },
    { id: "2", type: "BOX", title: "MOBILE MONEY", manager: "Manager", company: "New IT Company" },
    { id: "3", type: "BANK", title: "TRANSFER CASH", manager: "Manager", company: "New IT Company" },
    { id: "4", type: "BOX", title: "DEPOT OF WARRANTY", manager: "Manager", company: "New IT Company" },
    { id: "5", type: "BOX", title: "Cash Box", manager: "Manager", company: "New IT Company" },
  ];