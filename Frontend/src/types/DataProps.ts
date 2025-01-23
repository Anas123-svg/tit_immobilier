import { LucideIcon } from "lucide-react";

export interface StatCardProps {
    name: string;
    value: string ;
    color: string;
    icon: React.ElementType; 
  }
export interface SummaryCardProps {
  name: string;
  value: string | number;
  color: string;
}

export interface FilterOption {
  type: "select" | "date" | "text" | "number"; // Extendable types
  label: string;
  name: string; // Name for identifying the filter
  options?: string[]; // For select type
  placeholder?: string; // For input types
}


export interface SummaryCardSectionProps {
  cards: SummaryCardProps[];
}


export interface CircularDiagramProps {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  }
  

  export interface Owner {
    phone?:string;
    name: string;
    contact?: string;
    profession?: string;
    code?: string;

    status?:string
    pay?:string}
  
    
 

  export interface Mandate {
    good: string;
    surfaceArea: string;
    owner: string;
    type: string;
    amount: string;
  }

  export interface StatCard {
    name: string;
    value: number;
    color: string;
    icon: React.ElementType;
  }
  


export interface Tenant {
  id: number;
  name: string;
  reference: string;
  contact: string;
  contracts: string;
  address: string;
  status: string;
  balance?: string;
  homeStatus:string
  imgUrl:string
  phone?:string
  code?:string
  pay?:string
}

export interface ListOfTenantsSectionProps {
  tenants: Tenant[];
}

export interface Contract {
  reference: string;
  tenant: string;
  location: string;
  contractStartDate:string
  contractEndDate:string
  amount:string
}


export interface TreasuryItem {
  id: string;
  type: "BANK" | "BOX";
  title: string;
  manager: string;
  company: string;
}