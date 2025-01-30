import React from "react";
import { Eye, Edit, Printer } from "lucide-react";
import useFetchData from "@/hooks/useFetchData"; // Assuming you have a custom hook to fetch data

// Define the BusinessOwner Interface matching the backend model
interface BusinessOwner {
  id: number;
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
  business_manager_name: string;
  business_manager_gender: string;
  business_manager_contact: string;
  business_manager_job_position: string;
  business_manager_address: string;
  business_manager_type_of_document: string;
  business_manager_document_number: string;
  business_manager_date_of_issue: string;
  business_manager_expiry_date: string;
  business_photo: string | null; // Nullable field for photo
  business_documents: { type: string; number: string; date_of_issue: string }[]; // Array of documents
  is_business_owner: boolean;
  status: string;
}

const ListOfOwnersSection: React.FC = () => {
  // Fetch owners data from API using the useFetchData hook
  const { data: businessOwners, loading, error } = useFetchData<BusinessOwner[]>(
    `${import.meta.env.VITE_API_URL}/api/get-all-owners`
  );

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-3xl text-center font-semibold mb-4">List of Owners</h3>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-500">Loading business owners...</p>}

      {/* Error State */}
      {error && <p className="text-center text-red-500">Error fetching data: {error}</p>}

      {/* Empty State */}
      {!loading && businessOwners?.length === 0 && (
        <p className="text-center text-gray-500">No business owners found.</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {businessOwners?.map((owner) => (
          <div
            key={owner.id}
            className="relative p-6 bg-white border rounded-lg shadow-md"
          >
            {/* Owner Status */}
            <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
              {owner.status}
            </div>

            {/* Business Owner Info */}
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mx-auto mb-2">
                <img
                  src={owner.business_photo || "/default-avatar.png"} // Fallback image
                  alt={owner.business_company_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold">{owner.business_company_name}</h4>
              <p className="text-sm text-gray-500">
                TIN: {owner.business_taxpayer_identification_number}
              </p>
              <p className="text-sm text-gray-500">
                Business Reg: {owner.business_business_registration_number}
              </p>
              <p className="text-sm text-gray-500">
                Industry: {owner.business_industry_sector}
              </p>
              <p className="text-sm text-blue-600">Head Office: {owner.business_head_office}</p>
              <p className="text-sm text-green-600">Capital: ${owner.business_capital}</p>
            </div>

            {/* Manager Details */}
            <div className="border-t pt-3 mt-3">
              <p className="text-sm font-semibold text-gray-600">Manager:</p>
              <p className="text-sm text-gray-700">{owner.business_manager_name} ({owner.business_manager_gender})</p>
              <p className="text-sm text-gray-500">Contact: {owner.business_manager_contact}</p>
              <p className="text-sm text-gray-500">Job: {owner.business_manager_job_position}</p>
              <p className="text-sm text-gray-500">Address: {owner.business_manager_address}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-4">
              <button className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200">
                <Eye size={25} className="text-gray-700" />
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

export default ListOfOwnersSection;
