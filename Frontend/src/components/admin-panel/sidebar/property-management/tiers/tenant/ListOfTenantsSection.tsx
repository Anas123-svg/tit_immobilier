import React from "react";
import { Eye, Edit, Printer } from "lucide-react";
import useFetchData from "@/hooks/useFetchData"; // Assuming the useFetchData hook is implemented
import { Link } from "react-router-dom";

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
          <div
            key={tenant.id}
            className="relative p-6 bg-white border rounded-lg shadow-md"
          >
            {/* Tenant Type and Status */}
            <div className="absolute top-2 left-2 bg-gray-300 text-xs px-2 py-1 rounded-full uppercase font-semibold">
              {tenant.is_business_tenant ? "Business" : "Individual"}
            </div>
            <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
              {tenant.status}
            </div>

            {/* Tenant Info */}
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden">
                <img
                  src={tenant.business_photo || "/default-avatar.png"} // Fallback image
                  alt={tenant.business_company_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold">{tenant.business_company_name}</h4>
              <p className="text-sm text-gray-500">TIN: {tenant.business_taxpayer_account_number}</p>
              <p className="text-sm text-gray-500">Reg. No: {tenant.business_business_registration_number}</p>
              <p className="text-sm text-gray-500">Industry: {tenant.business_industry_sector}</p>
              <p className="text-sm text-blue-600">Head Office: {tenant.business_head_office}</p>
              <p className="text-sm text-green-600">Capital: ${tenant.business_capital}</p>
            </div>

            {/* Manager Details */}
            <div className="border-t pt-3 mt-3">
              <p className="text-sm font-semibold text-gray-600">Manager:</p>
              <p className="text-sm text-gray-700">{tenant.business_manager_name} ({tenant.business_manager_gender})</p>
              <p className="text-sm text-gray-500">Contact: {tenant.business_manager_contact}</p>
              <p className="text-sm text-gray-500">Job: {tenant.business_manager_job_position}</p>
              <p className="text-sm text-gray-500">Address: {tenant.business_manager_address}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-4">
              <button className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200">
               <Link to="/tier/tanents/detail-page">   <Eye size={25} className="text-gray-700" /></Link>
              </button>
              <button className="p-2 bg-blue-100 rounded-full shadow hover:bg-blue-200">
                <Edit size={25} className="text-blue-700" />
              </button>
              <button className="p-2 bg-yellow-100 rounded-full shadow hover:bg-yellow-200">
                <Printer size={25} className="text-yellow-700" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfTenantsSection;
