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



export interface Client {
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


export interface Owner {
  id:number
  // Private Owner Fields
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
  private_expiry_date: string;
  private_taxpayer_identification_number: string;
  private_occupation: string;
  private_contact: string;
  private_whatsapp_contact: string;
  private_email: string;
  private_po_box: string;
  private_marital_status: string;
  private_spouses_name: string;
  private_number_of_children: number;
  private_employer_name: string;
  private_bank_statement_rib: string;
  private_emergency_contact_name: string;
  private_emergency_contact: string;
  private_emergency_contact_relation: string;
  private_photo: string | null; // Nullable field for photo
  private_documents: string[]; // Array of document objects

  // Business Owner Fields
  business_company_name: string;
  business_taxpayer_identification_number: string;
  business_business_registration_number: string;
  business_industry_sector: string;
  business_office_phone_number: string;
  business_whatsapp_contact: string;
  business_email: string;
  business_head_office: string;
  business_po_box: string;
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
  business_manager_authorizing_authority: string;
  business_manager_expiry_date: string;
  business_photo: string | null; // Nullable field for photo
  business_documents:string[] ; // Array of document objects
  is_business_owner: boolean;
  status: string;
}


