import React from "react";
import { Eye, Edit, Printer } from "lucide-react";
import useFetchData from "@/hooks/useFetchData"; // Assuming you have a custom hook to fetch data
import { Link } from "react-router-dom";
import BusinessOwnerCard from "./UI/BusinessOwner";
import PrivateOwnerCard from "./UI/PrivateOwner";

// Define the Owner Interface matching the backend model
interface Owner {
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



const ListOfOwnersSection: React.FC = () => {
  // Fetch owners data from API using the useFetchData hook
  const { data: Owners, loading, error } = useFetchData<Owner[]>(
    `${import.meta.env.VITE_API_URL}/api/get-all-owners`
  );

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-3xl text-center font-semibold mb-4">List of Owners</h3>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-500">Loading owners...</p>}

      {/* Error State */}
      {error && <p className="text-center text-red-500">Error fetching data: {error}</p>}

      {/* Empty State */}
      {!loading && Owners?.length === 0 && (
        <p className="text-center text-gray-500">No owners found.</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {Owners?.map((owner) => (
          owner.is_business_owner ? 
  <BusinessOwnerCard owner={owner}/> : <PrivateOwnerCard owner={owner}/>
        ))}
      </div>
    </div>
  );
};

export default ListOfOwnersSection;
