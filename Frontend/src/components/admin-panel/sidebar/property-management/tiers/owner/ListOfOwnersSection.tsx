import React from "react";
import { Eye, Edit, Printer } from "lucide-react";
import useFetchData from "@/hooks/useFetchData"; // Import custom fetch hook

// Define BusinessOwner Interface matching Laravel Model
interface BusinessOwner {
  id: number;
  company_name: string;
  taxpayer_identification_number: string;
  business_registration_number: string;
  industry_sector: string;
  office_phone_number: string;
  whatsapp_contact: string;
  email: string;
  head_office: string;
  po_box: string;
  capital: number;
  manager_name: string;
  manager_gender: string;
  manager_contact: string;
  manager_job_position: string;
  manager_address: string;
  manager_type_of_document: string;
  manager_document_number: string;
  manager_date_of_issue: string;
  manager_expiry_date: string;
  photo: string | null; // Nullable field for photo
  documents: string[]; // Array of documents
}

// Component
const ListOfOwnersSection: React.FC = () => {
  // Fetch owners data from API
  const { data: businessOwners, loading, error } = useFetchData<BusinessOwner[]>(
    "http://127.0.0.1:8000/api/business-owners"
  );

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-3xl text-center font-semibold mb-4">List of Business Owners</h3>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-500">Loading business owners...</p>}

      {/* Error State */}
      {error && (
        <p className="text-center text-red-500">Error fetching data: {error}</p>
      )}

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
              Active
            </div>

            {/* Business Owner Info */}
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mx-auto mb-2">
                <img
                  src={owner.photo || "/default-avatar.png"} // Fallback image
                  alt={owner.company_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold">{owner.company_name}</h4>
              <p className="text-sm text-gray-500">
                TIN: {owner.taxpayer_identification_number}
              </p>
              <p className="text-sm text-gray-500">
                Business Reg: {owner.business_registration_number}
              </p>
              <p className="text-sm text-gray-500">
                Industry: {owner.industry_sector}
              </p>
              <p className="text-sm text-blue-600">Head Office: {owner.head_office}</p>
              <p className="text-sm text-green-600">Capital: ${owner.capital}</p>
            </div>

            {/* Manager Details */}
            <div className="border-t pt-3 mt-3">
              <p className="text-sm font-semibold text-gray-600">Manager:</p>
              <p className="text-sm text-gray-700">{owner.manager_name} ({owner.manager_gender})</p>
              <p className="text-sm text-gray-500">Contact: {owner.manager_contact}</p>
              <p className="text-sm text-gray-500">Job: {owner.manager_job_position}</p>
              <p className="text-sm text-gray-500">Address: {owner.manager_address}</p>
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
