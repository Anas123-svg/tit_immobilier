import React from "react";
import { Eye, Edit, Printer } from "lucide-react";
import useFetchData from "@/hooks/useFetchData"; // Assuming the useFetchData hook is implemented
import { Link } from "react-router-dom";
import PrivateTenantCard from "./UI/PrivateTenantCard"
import BusinessTenantCard from "./UI/BusinessTenantCard"
// Define Tenant Interface matching the backend model
// Define Tenant Interface matching the backend model
interface Tenant {
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
  private_name: string;
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
}


const ListOfTenantsSection: React.FC = () => {
  // Fetch tenants data from API using the useFetchData hook
  const { data: tenants, loading, error } = useFetchData<Tenant[]>(
    `${import.meta.env.VITE_API_URL}/api/get-all-tenants`
  );

  return (
    <div className="p-4 bg-white shadow rounded-md mt-6">
      <h3 className="text-lg font-semibold mb-4">List of Tenants</h3>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-500">Loading tenants...</p>}

      {/* Error State */}
      {error && <p className="text-center text-red-500">Error fetching data: {error}</p>}

      {/* Empty State */}
      {!loading && tenants?.length === 0 && (
        <p className="text-center text-gray-500">No tenants found.</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {tenants?.map((tenant) => (
          tenant.is_business_tenant ? 
          <BusinessTenantCard tenant={tenant}/>:<PrivateTenantCard tenant={tenant}/>

        ))}
      </div>
    </div>
  
  );
};

export default ListOfTenantsSection;
