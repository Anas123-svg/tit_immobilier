
// ListOfTenantsSection.tsx
import React from "react";
import { Eye, Edit, Printer } from "lucide-react";
import { ListOfTenantsSectionProps } from "@/types/DataProps"; // Assuming these types are defined in your project



const ListOfTenantsSection: React.FC<ListOfTenantsSectionProps> = ({ tenants }) => {
  return (
    <div className="p-4 bg-white shadow rounded-md mt-6">
      <h3 className="text-lg font-semibold mb-4">List of Tenants</h3>
      <div className="grid grid md:grid-cols-2 gap-4">
        {tenants.map((tenant) => (
          <div
            key={tenant.id}
            className="relative p-6 bg-white border rounded-lg shadow-md"
          >
            {/* Tenant Type and Status */}
            <div className="absolute top-2 left-2 bg-gray-300 text-xs px-2 py-1 rounded-full uppercase font-semibold">
              Particular
            </div>
            <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
              {tenant.status}
            </div>

            {/* Tenant Info */}
            <div className="text-center mb-4">
            <div className="w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden">
    <img
      src={tenant.imgUrl}
      alt={tenant.name}
      className="w-full h-full object-cover"
    />
  </div>
              <h4 className="text-xl font-bold">{tenant.name}</h4>
              <p className="text-sm text-gray-500">Ref: {tenant.reference}</p>
              <p className="text-sm text-gray-500">Contact: {tenant.contact}</p>
              <p className="text-sm text-gray-500">{tenant.contracts}</p>
              <p className="text-sm text-blue-600">Home: {tenant.address}</p>
              <p className={`text-sm  ${tenant.balance&& tenant.balance.includes('OWE') ? 'text-red-600' : 'text-green-600'}`}>
                {tenant.balance}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
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

export default ListOfTenantsSection;
