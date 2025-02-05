import React from "react";
import { Eye, Edit, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import PrivateTenantForm from "../forms/PrivateTenantForm";
import { Tenant } from "@/types/DataProps";



interface PrivateTenantCardProps {
  tenant: Tenant;
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
       <PrivateTenantForm tenant={tenant}/>
        <button className="p-2 bg-yellow-100 rounded-full shadow hover:bg-yellow-200">
          <Printer size={25} className="text-yellow-700" />
        </button>
      </div>
    </div>
  );
};

export default PrivateTenantCard;
