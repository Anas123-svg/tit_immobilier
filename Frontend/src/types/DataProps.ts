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





interface CaseDetails {
  industry: string;
  company_size: string;
}

interface AdditionalOptions {
  priority: string;
  follow_up_date: string;
}

interface Document {
  type: string;
  url: string;
}

export interface Case {
  id: number;
  client_id: number;
  customer_name: string;
  legal_status: string;
  contact: string;
  email: string;
  opening_date: string;
  opening_reason: string;
  business_manager: string;
  digital_signature_of_file: string;
  details: CaseDetails;
  additional_options: AdditionalOptions;
  documents: Document[];
  created_at: string;
  updated_at: string;
  modality: string | null;
  opening_fee: string;
  advance_amount: string;
}

export interface ClientProfile {
  profile: Client,
  case:Case[]
  }
  






   export interface Good {
      id: number;
      owner_id: number;
      owner: string;
      property_name: string;
      type_of_property: string;
      number_of_floors: number;
      area: number;
      market_value: string;
      island: string;
      batch: string;
      cie_identifier_number: string;
      sodeci_identifier_number: string;
      boundary_marking_done: string;
      domain_type: string;
      has_title_deed: string;
      serviced: string;
      approved: string;
      description: string;
      city: string;
      municipality: string;
      neighborhood: string;
      longitude: number;
      latitude: number;
      height: number;
      altitude: number;
      number_of_parking_spaces: number;
      number_of_levels: number;
      garden: string;
      pool: string;
      on_the_corner: string;
      near_water: string;
      feet_in_water: string;
      distance_from_water: number;
      on_main_road: string;
      distance_from_road: number;
      dry_land: string;
      low_depth: string;
      school_nearby: string;
      market_nearby: string;
      assigned_agents: string[];
      photo: string | null;
      documents: any[];  // Adjust type based on the document structure if known
      created_at: string;
      updated_at: string;
      status: string;
    }
    

  
    export  interface Locative {
      id: number;
      owner_id: number;
      owner: string;
      property_name: string;
      type_of_property: string;
      number_of_floors: number;
      number_of_rentals: number;
      type_of_numbering: string;
      area_m2: string;
      market_value: string;
      island: string;
      batch: string;
      block: string;
      cie_identifier_number: string;
      sodeci_identifier_number: string;
      description: string;
      city: string;
      municipality: string;
      neighborhood: string;
      longitude: string;
      latitude: string;
      height: number;
      altitude: number;
      on_the_corner: string;
      near_water: string;
      feet_in_the_water: string | null;
      distance_from_water: string;
      on_the_main_road: string | null;
      distance_from_road: string;
      dry_land: string;
      low_depth: string;
      school_nearby: string;
      market_nearby: string;
      assigned_agents: string[];
      photo: string | null;
      documents: any[];  // Adjust type based on document structure if known
      level: number;
      door_number: string;
      rental_type: string;
      rent: number;
      charges: number;
      room: number;
      area: number;
      created_at: string;
      updated_at: string;
      status: string;
    }
    
  
 export interface OwnerProfile {
    profile: Owner
    Good: Good[];          // Adjust type based on the expected structure of Good
    Locative: Locative[];      // Adjust type based on the expected structure of Locative
    Mandate: any[];   // Adjust type based on the expected structure of Mandate
  }
  

  export interface TenantBill {
    id: number;
    tenant_id: number;
    contract_id: number;
    month: string; // Format: "YYYY-MM"
    rent: string; // Assuming rent is represented as a string
    charge: string; // Assuming charge is represented as a string
    total: string; // Assuming total is represented as a string
    created_at: string; // ISO 8601 format datetime string
    updated_at: string; // ISO 8601 format datetime string
  }
  export interface TenantContract {
    id: number;
    owner_id: number | null; // 'null' is possible, otherwise use 'number'
    tenant_id: number;
    concerned: string; // The subject of the contract (e.g., maintenance agreement)
    location: string; // The address of the property
    cost_of_rent: string; // Rent amount, represented as a string (can change to 'number' if needed)
    contract_type: string; // Type of contract (e.g., residential)
    date_of_signature: string; // Date when the contract was signed (ISO 8601 format)
    entry_date: string; // Date when the tenant moves in (ISO 8601 format)
    end_date: string; // Date when the contract ends (ISO 8601 format)
    number_of_months_of_deposit: number; // Number of months for the deposit
    deposit_amount: string; // Deposit amount, represented as a string
    caution_to_be_paid: string; // "Yes" or "No"
    number_of_months_in_advance: number; // Number of months rent to be paid in advance
    advance_amount: string; // Advance amount, represented as a string
    penalty_for_delay: number; // Penalty rate for delayed payment
    payment_limit: string; // Payment due date each month
    tacit_renewal: string; // "Yes" or "No" indicating tacit renewal
    Frequency: string; // Payment frequency (e.g., "Monthly")
    digital_signature_of_the_contract: string; // Path to the digital signature file
    due_date: string; // Due date for the current payment (ISO 8601 format)
    created_at: string; // Date the contract was created (ISO 8601 format)
    updated_at: string; // Date the contract was last updated (ISO 8601 format)
    status: string; // The status of the contract (e.g., "active")
  }
  
  export interface TenantPayment {
    id: number;
    tenant_id: number;
    contract_id: number;
    type_payment: string; // Type of payment (e.g., "Rent Payment")
    Treasury: string; // The treasury source (e.g., "Bank")
    payment_method: string; // Method used for payment (e.g., "Bank Transfer")
    payment_date: string; // Payment date (ISO 8601 format)
    done_by: string; // The person who made the payment
    other_name: string; // Other relevant name (e.g., co-signatory)
    phone_no: string; // Contact phone number
    Transaction_details: string; // Description of the transaction
    amount: string; // Amount paid, represented as a string
    documents: string[] | null; // Any associated documents (can be a path or null)
    created_at: string; // Date when the payment was created (ISO 8601 format)
    updated_at: string; // Date when the payment was last updated (ISO 8601 format)
  }
  
  export interface TenantProfile {
    profile:Tenant; // 'profile' could be an object or null, adjust as needed
    tenant_bill: TenantBill[];   // Array of tenant bills, adjust type as needed
    tenant_contract: TenantContract[]; // Array of tenant contracts, adjust type as needed
    tenant_payment: TenantPayment[];  // Array of tenant payments, adjust type as needed
  }
  

