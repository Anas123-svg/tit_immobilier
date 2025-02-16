import {
  DollarSign,
  Briefcase,
  AlertTriangle,
  User,
  FileText,
  CheckCircle,
  Building,
  Home,
  Repeat,
  Ticket,
  Tag,
} from "lucide-react";
import {
  StatCardProps,
  SummaryCardProps,

  Owner,
  Tenant,
  StatCard,
  Contract,
} from "@/types/DataProps"; // Assuming these types are defined in your project

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
export const summaryCardsData = [
  { name: "Real Estate", value: 4, color: "yellow", icon: Home },
  { name: "Ticket", value: 0, color: "green", icon: Ticket },
  { name: "Intervention", value: 0, color: "red", icon: Tag },
  { name: "Supplier", value: 0, color: "blue", icon: User },
];

// DummyData.ts

export const activeOwners = [
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

export const validatedMandates= [
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

export const statsData: StatCard[] = [
  { name: "Owner", value: 4, color: "bg-red-500 text-red-700", icon: User },
  {
    name: "Locative",
    value: 47,
    color: "bg-green-500 text-green-700",
    icon: Home,
  },
  { name: "Mandate", value: 4, color: "bg-yellow-500 ", icon: FileText },
  {
    name: "Reversal",
    value: 0,
    color: "bg-blue-500 text-blue-700",
    icon: Repeat,
  },
];

export const validationStats = [
  {
    name: "Rental Payments",
    value: "0",
    icon: DollarSign,
    color: "bg-yellow-500",
  },
  { name: "Payments Sale", value: "0", icon: Home, color: "bg-blue-500" },
  { name: "Rental Contracts", value: "0", icon: FileText, color: "bg-red-500" },
  { name: "Sales File", value: "0", icon: Repeat, color: "bg-gray-500" },
  {
    name: "Management Mandate",
    value: "0",
    icon: FileText,
    color: "bg-green-500",
  },
  { name: "Reversal", value: "0", icon: Repeat, color: "bg-purple-500" },
  { name: "State of Play", value: "0", icon: DollarSign, color: "bg-teal-500" },
  {
    name: "Termination of Contract",
    value: "0",
    icon: Home,
    color: "bg-orange-500",
  },
  {
    name: "Contract Renewal",
    value: "0",
    icon: FileText,
    color: "bg-pink-500",
  },
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




export const tenantStats = [
  { name: "Invoice(s)", value: 96, currency: "XOF", color: "bg-blue-500" },
  { name: "Waiting(s)", value: 2, currency: "XOF", color: "bg-blue-400" },
  { name: "Unpaid", value: 72, currency: "XOF", color: "bg-red-500" },
  { name: "In progress", value: 0, currency: "XOF", color: "bg-yellow-500" },
  { name: "Sales", value: 22, currency: "XOF", color: "bg-green-500" },
];
