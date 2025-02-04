import React from "react";
import { Eye, Edit, Printer } from "lucide-react";
import { Link } from "react-router-dom";

// Define PrivateTenant Interface matching the backend model
interface PrivateTenant {
  id: number;
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
  status: string;
}

interface PrivateTenantCardProps {
  tenant: PrivateTenant;
}

const PrivateTenantCard: React.FC<PrivateTenantCardProps> = ({ tenant }) => {
  return (
    <div
      key={tenant.id}
      className="relative p-6 bg-white border rounded-lg shadow-md"
    >
      {/* Tenant Type and Status */}
      <div className="absolute top-2 left-2 bg-gray-300 text-xs px-2 py-1 rounded-full uppercase font-semibold">
        {"Individual"}
      </div>
      <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
        {tenant.status}
      </div>

      {/* Tenant Info */}
      <div className="text-center mb-4">
        <div className="w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden">
          <img
            src={tenant.private_photo || "/default-avatar.png"} // Fallback image
            alt={tenant.private_name}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="text-xl font-bold">{tenant.private_name}</h4>
        <p className="text-sm text-gray-500">TIN: {tenant.private_taxpayer_account_number}</p>
        <p className="text-sm text-gray-500">Nationality: {tenant.private_nationality}</p>
        <p className="text-sm text-gray-500">Occupation: {tenant.private_occupation}</p>
        <p className="text-sm text-blue-600">Address: {tenant.private_address}</p>
        <p className="text-sm text-gray-500">Marital Status: {tenant.private_marital_status}</p>
      </div>

      {/* Emergency Contact */}
      <div className="border-t pt-3 mt-3">
        <p className="text-sm font-semibold text-gray-600">Emergency Contact:</p>
        <p className="text-sm text-gray-700">{tenant.private_emergency_contact_name}</p>
        <p className="text-sm text-gray-500">Relation: {tenant.private_emergency_contact_relation}</p>
        <p className="text-sm text-gray-500">Contact: {tenant.private_emergency_contact}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-4">
        <button className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200">
          <Link to={`/tier/tenants/detail-page/${tenant.id}`}>
            <Eye size={25} className="text-gray-700" />
          </Link>
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

export default PrivateTenantCard;
