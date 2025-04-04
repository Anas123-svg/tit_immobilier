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
  id:string;
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
      market_value: number;
      island: string;
      batch: string;
      cie_identifier_number: string;
      sodeci_identifier_number: string;
      boundary_marking_done: string;
      domain_type: string;
      has_title_deed: string;
      serviced: string;
      other_type:string
      approved: string;
      description: string;
      city: string;
      municipality: string ;
      neighborhood: string;
      longitude: number;
      latitude: number;
      height: number;
      altitude: number;
      number_of_parking_spaces: number;
      number_of_levels: number;
      garden: boolean;
      pool: boolean;
      on_the_corner: boolean;
      near_water: boolean;
      feet_in_water: boolean;
      distance_from_water: string;
      on_main_road: boolean;
      distance_from_road: string;
      dry_land: boolean;
      low_depth: boolean;
      school_nearby: boolean;
      market_nearby: boolean;
      assigned_agents: string[];
      photo: string | null;
      documents: any[];  // Adjust type based on the document structure if known
      created_at: string;
      updated_at: string;
      status: string;
      details:Locative[]
      sale_type:string;
      number_of_rentals:number;
type_of_numbering:string;
area_m2:string;

block:string;


    }
    

 
  
 export interface OwnerProfile {
    profile: Owner
    Good: Good[];          // Adjust type based on the expected structure of Good
    Locative: Good[];      // Adjust type based on the expected structure of Locative
    Mandate: Mandate[];   // Adjust type based on the expected structure of Mandate
  }
  

  export interface TenantBill {
    id: number;
    tenant_id: number;
    contract_id: number;
    month: string;  // e.g., "January" or "YYYY-MM"
    rent: string;   // "500.00"
    charge: string; // "50.00"
    total: string;  // "550.00"
    created_at: string; // e.g., "2025-03-22T20:59:38.000000Z"
    updated_at: string; // e.g., "2025-03-22T20:59:38.000000Z"
    state: string;      // e.g., "waiting"
  }
  


  export interface TenantRentBill{
    bills : TenantBill
  }
  export interface Contract {
    id: number;
    owner_id: number ; // 'null' is possible, otherwise use 'number'
    tenant_id: number;
    concerned: number; // The subject of the contract (e.g., maintenance agreement)
    location: number; // The address of the property
    cost_of_rent: number; // Rent amount, represented as a string (can change to 'number' if needed)
    contract_type: string; // Type of contract (e.g., residential)
    date_of_signature: string; // Date when the contract was signed (ISO 8601 format)
    entry_date: string; // Date when the tenant moves in (ISO 8601 format)
    end_date: string; // Date when the contract ends (ISO 8601 format)
    Number_of_months_of_deposit: number; // Number of months for the deposit
    deposit_amount: number; // Deposit amount, represented as a string
    caution_to_be_paid: string; // "Yes" or "No"
    number_of_months_in_advance: number; // Number of months rent to be paid in advance
    advance_amount: number; // Advance amount, represented as a string
    penalty_for_delay: number; // Penalty rate for delayed payment
    payment_limit: string; // Payment due date each month
    tacit_renewal: string; // "Yes" or "No" indicating tacit renewal
    Frequency: string; // Payment frequency (e.g., "Monthly")
    digital_signature_of_the_contract: string; // Path to the digital signature file
    due_date: string; // Due date for the current payment (ISO 8601 format)
    created_at: string; // Date the contract was created (ISO 8601 format)
    updated_at: string; // Date the contract was last updated (ISO 8601 format)
    status: string; // The status of the contract (e.g., "active")
    rent_locative:Locative
    owner:Owner
    tenant:Tenant
    total_amount_due:number;
    rent_property:Good;
    previous_invoices: []
    invoices:[]
  }
  
  export interface TenantPayment {
    id: number;
    tenant_id: number;
    contract_id: number;
    payment_method: string; // e.g. "CHEQUE"
    payment_date: string; // ISO date format (e.g. "2025-04-03")
    done_by: string; // e.g. "OTHER"
    other_name: string | null;
    phone_no: string | null;
    Transaction_details: string | null;
    amount: number | null;
    documents: string | null;
    created_at: string; // ISO date format (e.g. "2025-03-24T00:07:10.000000Z")
    updated_at: string; // ISO date format (e.g. "2025-03-24T00:07:10.000000Z")
    designation: string | null;
    invoice_type: string; // e.g. "OTHER_INVOICES"
    total: number | null;
    treasury_type: string | null;
    cheque: string; // e.g. "123"
    bank: string; // e.g. "123"
    transaction: string | null;
    tiers: string; // e.g. "2313"
    state: string; // e.g. "waiting"
    invoice_number: string; // e.g. "INV-67EFAFD7E3148"
  }
  
  
  
  export interface TenantProfile {
    profile:Tenant; // 'profile' could be an object or null, adjust as needed
    tenant_bill: TenantBill[];   // Array of tenant bills, adjust type as needed
    tenant_contract: Contract[]; // Array of tenant contracts, adjust type as needed
    tenant_payment: TenantPayment[];  // Array of tenant payments, adjust type as needed
    state_of_play:StateOfPlay[];
    notice_of_expirey:NoticeOfExpiry[]
  }
  
  export interface StateOfPlay {
    id: number;
    tenant_id: number;
    contract_id: number;
    date_of_establishment: string; // ISO date format (e.g. "2025-03-06")
    state_type: string;
    observation: string;
    created_at: string; // ISO date format (e.g. "2025-03-23T15:39:16.000000Z")
    updated_at: string; // ISO date format (e.g. "2025-03-23T15:39:16.000000Z")
    documents: string | null; // assuming documents can be a string or null
    state: string; // e.g. "waiting"
  }
  export interface NoticeOfExpiry {
    id: number;
    tenant_id: number;
    contract_id: number;
    month: string | null; // Assuming it can be a string or null
    rent: number | null; // Assuming it can be a number or null
    charge: number | null; // Assuming it can be a number or null
    total: number | null; // Assuming it can be a number or null
    created_at: string; // ISO date format (e.g. "2025-03-22T19:36:46.000000Z")
    updated_at: string; // ISO date format (e.g. "2025-03-22T19:36:46.000000Z")
  }
  

  export interface OwnerSaleProperty {
    id: number; // Unique identifier for the property
    owner_id: number; // ID of the owner
    owner: string; // Name of the owner
    property_name: string; // Name of the property
    type_of_property: string; // Type of the property (e.g., House, Villa, etc.)
    number_of_floors: number; // Number of floors in the property
    area: string; // Area of the property (e.g., "500 sqm")
    market_value: number; // Market value of the property
    island: boolean; // Whether the property is on an island
    batch: string; // Batch identifier for the property
    cie_identifier_number: string; // CIE identifier number
    sodeci_identifier_number: string; // SODECI identifier number
    boundary_marking_done: boolean; // Whether the boundary marking is done
    domain_type: string; // Type of domain (e.g., Residential, Commercial)
    has_title_deed: boolean; // Whether the property has a title deed
    serviced: boolean; // Whether the property is serviced
    approved: boolean; // Whether the property is approved
    description: string; // Description of the property
    city: string; // City where the property is located
    municipality: string; // Municipality where the property is located
    neighborhood: string; // Neighborhood name
    longitude: string; // Longitude coordinate
    latitude: string; // Latitude coordinate
    height: number; // Height of the property
    altitude: number; // Altitude of the property
    number_of_parking_spaces: number; // Number of parking spaces available
    number_of_levels: number; // Number of levels in the property
    garden: boolean; // Whether the property has a garden
    pool: boolean; // Whether the property has a pool
    on_the_corner: boolean; // Whether the property is on a corner
    near_water: boolean; // Whether the property is near water
    feet_in_water: boolean; // Whether the property is feet in water
    distance_from_water: number; // Distance from the water in meters
    on_main_road: boolean; // Whether the property is on the main road
    distance_from_road: number; // Distance from the road in meters
    dry_land: boolean; // Whether the property is on dry land
    low_depth: boolean; // Whether the property has low depth
    school_nearby: boolean; // Whether a school is nearby
    market_nearby: boolean; // Whether a market is nearby
    assigned_agents: string[]; // List of assigned agents (could be an array of agent IDs or names)
    photo: string; // URL to the photo of the property
    documents: string[]; // List of document URLs for the property
    status: string; // Current status of the property (e.g., "For Sale", "Sold", etc.)
    sale_type:string;
  }
  

  export interface OwnerProperties{
    sale_properties : OwnerSaleProperty[]

  }
  export interface OwnerRentProperty {
    owner_id: number;
    owner?: string;
    property_name: string;
    type_of_property?: string;
    number_of_floors?: number;
    number_of_rentals?: number;
    type_of_numbering?: string;
    area_m2?: number;
    market_value?: number;
    other_type?: string;
    island?: string;
    batch?: string;
    block?: string;
    cie_identifier_number?: string;
    sodeci_identifier_number?: string;
    description?: string;
    city?: string;
    municipality?: string;
    neighborhood?: string;
    longitude?: number;
    latitude?: number;
    height?: number;
    altitude?: number;
    on_the_corner?: string;
    near_water?: string;
    feet_in_water?: boolean;
    distance_from_water?: string;
    on_main_road?: boolean;
    distance_from_road?: string;
    dry_land?: string;
    low_depth?: string;
    school_nearby?: string;
    market_nearby?: string;
    assigned_agents?: string[];
    photo?: string;
    documents?: string[];
    details?: Locative[];
  }
  // src/types/DataProps.ts

export interface Treasury {
  id: number;
  label: string;
  cash_type: string;
  account_no: string;
  minimum_threshold: number;
  maximum_threshold: number;
  manager_id: number;
  validator_assignment: string[]; // assuming an array of manager IDs for validator assignment
  comment: string;
  // Add any other properties as required
}


export interface Mandate {
  id: number
  owner_id: number
  type_of_mandate: string
  owner_name: string
  very_concerned: boolean
  type_of_property: string
  neighborhood: string
  tax_payable: boolean
  billing_type: string
  commission: number
  commission_percentage:number
  deduct_commission: boolean
  vat_on_commission: boolean
  date_of_signature: string
  debut_date: string
  end_date: string
  digital_signature_of_the_mandate: string
  tacit_renewal: boolean
  status: string
  created_at:string
}


export interface OwnerMandate{
  message: String
  data:Mandate[]
}




export interface Locative {
  id?: number;
  rent_property_id?: number;
  door_number?: string;
  rental_type?: string;
  rent?: number;
  charges?: number;
  room?: number;
  state?:string,
  occupant?:string;
  area?: number;
  created_at?: string; // or Date if you plan to work with Date objects
  updated_at?: string; // or Date if you plan to work with Date objects
}




export interface RentLocative {
  message:string,
  data:Locative[]
}



// Interface for an invoice
export interface Invoice {
  id:number
  designation?: string;
  unit_price?: number;
  qty?: number;
  vat?: number;
  discount?: number;
  total?: number;
}

// Interface for a previous invoice
export interface PreviousInvoice {
  month?: string;
  type?: string;
  rent?: number;
  charge?: number;
  total?: number;
  verse?: number;
  remaining?: number;
}


export type InvoiceItem = {
  designation: string;
  price: number;
  qty: number;
  vat: number;
  discount: number;
  total: number;
};



export interface TenantOtherInvoice {
  tenant_id: number;
  contract_id: number;
  label?: string;
  due_date?: string;
  date?: string;
  tenant_other_details?: Invoice[];
}

export interface TenantRenewInvoice {
 
  tenant_renew_contract_invoices?: Invoice[];
}

