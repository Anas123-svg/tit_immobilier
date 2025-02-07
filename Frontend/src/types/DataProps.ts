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
  

 


  export interface StatCard {
    name: string;
    value: number;
    color: string;
    icon: React.ElementType;
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
    surname?: string;
    is_business_client?: boolean;
    private_pronouns?: string;
    private_name?: string;
    private_gender?: string;
    private_birth_date?: string;
    private_place_of_birth?: string;
    private_address?: string;
    private_nationality?: string;
    private_document_type?: string;
    private_document_number?: string;
    private_date_of_issue?: string;
    private_signatory_authority?: string;
    private_expiry_date?: string;
    private_taxpayer_identification_number?: string;
    private_occupation?: string;
    private_contact?: string;
    private_whatsapp_contact?: string;
    private_email?: string;
    private_mail_box?: string;
    private_marital_status?: string;
    private_spouses_name?: string;
    private_number_of_children?: number;
    private_emergency_contact_name?: string;
    private_emergency_contact?: string;
    private_emergency_contact_relation?: string;
    private_photo?: string | null;
    private_documents?: string[];
    business_company_name?: string;
    business_taxpayer_identification_number?: string;
    business_business_registration_number?: string;
    business_industry_sector?: string;
    business_office_phone_number?: string;
    business_whatsapp_contact?: string;
    business_email?: string;
    business_head_office?: string;
    business_mail_box?: string;
    business_capital?: number;
    business_manager_pronouns_title?: string;
    business_manager_name?: string;
    business_manager_gender?: string;
    business_manager_contact?: string;
    business_manager_date_of_birth?: string;
    business_manager_place_of_birth?: string;
    business_manager_address?: string;
    business_manager_job_position?: string;
    business_manager_type_of_document?: string;
    business_manager_document_number?: string;
    business_manager_date_of_issue?: string;
    business_manager_signatory_authority?: string;
    business_manager_expiry_date?: string;
    business_photo?: string | null;
    business_documents?: string[];
    status?: string;

  
}

// Define the Owner Interface based on the provided model
export interface Owner {
  id:number
  // Private owner fields
  private_pronouns?: string;
  private_name?: string;
  surname?: string;
  private_gender?: string;
  private_birth_date?: string; // Use Date type or string based on how the data is stored
  private_place_of_birth?: string;
  private_address?: string;
  private_nationality?: string;
  private_document_type?: string;
  private_document_number?: string;
  private_date_of_issue?: string;
  private_expiry_date?: string;
  private_taxpayer_identification_number?: string;
  private_occupation?: string;
  private_contact?: string;
  private_whatsapp_contact?: string;
  private_email?: string;
  private_po_box?: string;
  private_marital_status?: string;
  private_spouses_name?: string;
  private_number_of_children?: number;
  private_employer_name?: string;
  private_bank_statement_rib?: string;
  private_emergency_contact_name?: string;
  private_emergency_contact?: string;
  private_emergency_contact_relation?: string;
  private_photo?: string; // Path or URL to the photo
  private_documents?: string[]; // Assuming documents are stored as an array of strings (URLs or file paths)

  // Business owner fields
  business_company_name?: string;
  business_taxpayer_identification_number?: string;
  business_business_registration_number?: string;
  business_industry_sector?: string;
  business_office_phone_number?: string;
  business_whatsapp_contact?: string;
  business_email?: string;
  business_head_office?: string;
  business_po_box?: string;
  business_capital?: number;
  business_manager_pronouns_title?: string;
  business_manager_name?: string;
  business_manager_gender?: string;
  business_manager_contact?: string;
  business_manager_date_of_birth?: string;
  business_manager_place_of_birth?: string;
  business_manager_address?: string;
  business_manager_job_position?: string;
  business_manager_type_of_document?: string;
  business_manager_document_number?: string;
  business_manager_date_of_issue?: string;
  business_manager_authorizing_authority?: string;
  business_manager_expiry_date?: string;
  business_photo?: string; // Path or URL to the business photo
  business_documents?: string[]; // Assuming documents are stored as an array of strings (URLs or file paths)
  is_business_owner?: boolean;
  status?: string;
}




// Define Tenant Interface matching the backend model
export interface Tenant {
  id: number;
  business_company_name: string;
  business_taxpayer_account_number: string;
  business_business_registration_number: string;
  business_industry_sector: string;
  business_office_phone_number: string;
  business_whatsapp_contact: string;
  business_email: string;
  business_head_office: string;
  business_mail_box: string;
  business_capital: number;
  business_manager_name: string;
  business_manager_gender: string;
  business_manager_contact: string;
  business_manager_job_position: string;
  business_manager_address: string;
  business_manager_type_of_document: string;
  business_manager_document_number: string;
  business_manager_date_of_issue: string;
  business_manager_expiry_date: string;
  business_photo: string | null;
  business_documents: string[];
  private_pronouns:string,
  private_name: string;
  surname: string;
  private_gender: string;
  private_birth_date: string;
  private_place_of_birth:string,
  private_address: string;
  private_nationality: string;
  private_document_type: string;
  private_document_number: string;
  private_date_of_issue: string;
  private_signatory_authority: string;
  private_expiry_date: string;
  private_taxpayer_account_number: string;
  private_occupation: string;
  private_contact: string;
  private_whatsapp_contact: string;
  private_email: string;
  private_mail_box: string;
  private_marital_status: string;
  private_number_of_children: number;
  private_emergency_contact_name: string;
  private_emergency_contact: string;
  private_emergency_contact_relation: string;
  private_photo: string | null;
  private_documents: string[];
  is_business_tenant: boolean;
  status: string;
  payment_status: string;
  business_manager_pronouns_title:string,
  business_manager_date_of_birth:string
  business_manager_authorizing_authority:string
  business_manager_place_of_birth:string
}

type Field = {
  id: number;
  template_id: number;
  label: string;
  type: string;
  options: string[];
  value: string | string[];
  isFlagged: boolean;
  attributes: {
    placeholder: string;
    required: boolean;
  };
  created_at: string;
  updated_at: string;
};

type Table = {
  id: number;
  template_id: number;
  table_name: string;
  table_data: {
    table_name: string;
    columns: string[];
    rows: {
      [key: string]: {
        [key: string]: string;
      };
    };
  };
  created_at: string;
  updated_at: string;
};
type Template = {
  id: number;
  name: string;
  Reference: string;
  fields: Field[];
  tables: Table[];
  created_by?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
};

export type Assessment = {
  id: number;
  user_id: number;

  assessment: Template;
  status: string;
  status_by_admin: string;
  submitted_to_admin: boolean;
  client_i: number;
  client: Client;
  template_id?: number;
  site_images?: [
    {
      site_image: string;
    }
  ];
  feedback_by_admin: string | null;
  complete_by_user: boolean;
  created_at: string;
  updated_at: string;
};

export type OwnerPdf = {
 owner:Owner,
 template:Template
};


export type ClientPdf = {
  id?: number;
  user_id?: number;

  assessment?: Template;
  status?: string;
  status_by_admin?: string;
  submitted_to_admin?: boolean;
  client_id?: number;
  client?: Client;
  template_id?: number;
  site_images?: [
    {
      site_image: string;
    }
  ];
  feedback_by_admin?: string | null;
  complete_by_user?: boolean;
  created_at?: string;
  updated_at?: string;
};



export interface User {
  name: string;
  email: string;
  password: string;
  Gender: string;
  userLogin: string;
  service: string;
  contact: string;
  pronouns: string;
  photo: string | null;  // Assuming photo can be a URL string or null
  permissions: string[]; // Assuming permissions is an array of strings
  documents: string[]; // Assuming documents is an array of strings (file paths, etc.)
}
