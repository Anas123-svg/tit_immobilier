import { Edit, Eye, Printer } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

// Define the interface for Business Owner
interface BusinessOwner {
    id:number
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
  business_photo: string | null;
  business_documents: string[];
  is_business_owner: boolean;
  status: string;
}

const BusinessOwnerCard: React.FC<{ owner: BusinessOwner }> = ({ owner }) => {
  return (
    <div key={owner.business_company_name} className="relative p-6 bg-white border rounded-lg shadow-md">
      <div className="absolute top-2 left-2 bg-gray-300 text-xs px-2 py-1 rounded-full uppercase font-semibold">Business</div>
      <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">{owner.status}</div>

      <div className="text-center mb-4">
        <div className="w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden">
          <img src={owner.business_photo || "/default-avatar.png"} alt={owner.business_company_name} className="w-full h-full object-cover" />
        </div>
        <h4 className="text-xl font-bold">{owner.business_company_name}</h4>
        <p className="text-sm text-gray-500">TIN: {owner.business_taxpayer_identification_number}</p>
        <p className="text-sm text-gray-500">Industry: {owner.business_industry_sector}</p>
        <p className="text-sm text-blue-600">Head Office: {owner.business_head_office}</p>
        <p className="text-sm text-green-600">Capital: ${owner.business_capital}</p>
      </div>

      <div className="border-t pt-3 mt-3">
        <p className="text-sm font-semibold text-gray-600">Manager:</p>
        <p className="text-sm text-gray-700">{owner.business_manager_name} ({owner.business_manager_gender})</p>
        <p className="text-sm text-gray-500">Contact: {owner.business_manager_contact}</p>
        <p className="text-sm text-gray-500">Job: {owner.business_manager_job_position}</p>
        <p className="text-sm text-gray-500">Address: {owner.business_manager_address}</p>
      </div>

      <div className="flex justify-end space-x-4 mt-4">
      <button className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200">
                <Link to={`/tier/owners/detail-page/${owner.id}`}>  <Eye size={25} className="text-gray-700" /></Link>
                </button>
                <button className="p-2 bg-blue-100 rounded-full shadow hover:bg-blue-200">
                  <Edit size={25} className="text-blue-700" />
                </button>
                <button className="p-2 bg-yellow-100 rounded-full shadow hover:bg-yellow-200">
                  <Printer size={25} className="text-yellow-700" />
                </button>
      </div>
    </div>
  );
};

export default BusinessOwnerCard;
