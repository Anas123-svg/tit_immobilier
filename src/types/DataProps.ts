import { LucideIcon } from "lucide-react";

export interface StatCardProps {
    name: string;
    value: string ;
    color: string;
    icon: React.ElementType; // Use React.ElementType for the icon component
    activeLabel?: string;
    inactiveLabel?: string;
  }
export interface SummaryCardProps {
  name: string;
  value: string | number;
  color: string;
}

export interface FilterOptions {
  type: string[];
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