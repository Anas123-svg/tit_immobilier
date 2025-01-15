import { DollarSign, Briefcase, AlertTriangle, User, FileText, CheckCircle, Building } from "lucide-react";
import { StatCardProps, SummaryCardProps, FilterOptions } from "@/types/DataProps"; // Assuming these types are defined in your project

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



export const tenantData: Tenant[] = [
    { name: "Mr ASSEMIAN N'GUESSAN ADOLPHE", phone: "0707778973", code: "ZA-6972-6414-01", status: "ACTIVE", pay: "9 900 000 XOF" },
    { name: "Mr YAO N'GUESSAN ALAIN ROLAND", phone: "0777120473", code: "ZA-6972-2939-01", status: "ACTIVE", pay: "0 XOF" },
  ];
  
  export const ownerData: Owner[] = [
    { name: "Mrs. DIOMANDE AUDREY ASTOU", phone: "627745376", code: "ZA-6972-8243-01", status: "ACTIVE", pay: "150,000 XOF" },
    { name: "Mr SANGARE YOU ARE THE ONE", phone: "0709739307", code: "ZA-6972-2150-01", status: "ACTIVE", pay: "0 XOF" },
  ];