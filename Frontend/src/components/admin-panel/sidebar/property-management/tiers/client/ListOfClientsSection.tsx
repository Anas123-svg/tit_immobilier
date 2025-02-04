import React from "react";
import { Eye, Edit, Printer } from "lucide-react";
import useFetchData from "@/hooks/useFetchData";
import { Link } from "react-router-dom";
import BusinessClientForm from "./forms/BusinessClientForm";
import PrivateClientForm from "./forms/PrivateClientForm";
import { Client } from "@/types/DataProps";


interface ListOfClientsSectionProps {
  clients?: Client[];
}

const ListOfClientsSection: React.FC<ListOfClientsSectionProps> = () => {
  const { data: clients, loading, error } = useFetchData<Client[]>(
    `${import.meta.env.VITE_API_URL}/api/clients`
  );

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-3xl text-center font-semibold mb-4">Client List</h3>
      {clients === undefined ? (
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="text-6xl text-yellow-500 mb-4">😟</div>
          <h4 className="text-xl font-bold text-gray-700">Oops!!</h4>
          <p className="text-gray-500">No clients found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {clients?.map((client) => (
            <div key={client.id} className="relative p-6 bg-white border rounded-lg shadow-md">
              {/* Client Type and Status */}
              <div className="absolute top-2 left-2 bg-gray-300 text-xs px-2 py-1 rounded-full uppercase font-semibold">
                {client.is_business_client ? "Business" : "Individual"}
              </div>
              <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                {client.status}
              </div>

              {/* Client Info */}
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mx-auto mb-2">
                  <img
                    src={client.is_business_client ? client.business_photo || "/default-avatar.png" : client.private_photo || "/default-avatar.png"} // Fallback image
                    alt={client.is_business_client ? client.business_company_name : client.private_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold">
                  {client.is_business_client ? client.business_company_name : client.private_name}
                </h4>
                <p className="text-sm text-gray-500">
                  {client.is_business_client
                    ? `TIN: ${client.business_taxpayer_identification_number}`
                    : `TIN: ${client.private_taxpayer_identification_number}`}
                </p>
                <p className="text-sm text-gray-500">
                  {client.is_business_client
                    ? `Reg. No: ${client.business_business_registration_number}`
                    : `Occupation: ${client.private_occupation}`}
                </p>
                <p className="text-sm text-gray-500">
                  {client.is_business_client
                    ? `Industry: ${client.business_industry_sector}`
                    : `Marital Status: ${client.private_marital_status}`}
                </p>
                <p className="text-sm text-blue-600">
                  {client.is_business_client ? `Head Office: ${client.business_head_office}` : `Home Address: ${client.private_address}`}
                </p>
                <p className="text-sm text-green-600">
                  {client.is_business_client ? `Capital: ${client.business_capital}` : `Contact: ${client.private_contact}`}
                </p>
              </div>

              {/* Manager or Personal Details */}
              <div className="border-t pt-3 mt-3">
                <p className="text-sm font-semibold text-gray-600">{client.is_business_client ? "Manager" : "Emergency Contact"}</p>
                <p className="text-sm text-gray-700">
                  {client.is_business_client
                    ? `${client.business_manager_name} (${client.business_manager_gender})`
                    : `${client.private_emergency_contact_name} (${client.private_emergency_contact_relation})`}
                </p>
                <p className="text-sm text-gray-500">
                  {client.is_business_client
                    ? `Contact: ${client.business_manager_contact}`
                    : `Contact: ${client.private_emergency_contact}`}
                </p>
                <p className="text-sm text-gray-500">
                  {client.is_business_client
                    ? `Job: ${client.business_manager_job_position}`
                    : `Address: ${client.private_address}`}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-4">
                <button className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200">
                <Link to={`/tier/clients/detail-page/${client.id}`}>  <Eye size={25} className="text-gray-700" /></Link>
                </button>
             
                  {client.is_business_client?<BusinessClientForm client={client}/>:<PrivateClientForm client={client}/>}
                
                  <button
  className="p-2 bg-yellow-100 rounded-full shadow hover:bg-yellow-200"
  onClick={() => window.print()} // Add the onClick handler for printing
>
  <Printer size={25} className="text-yellow-700" />
</button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListOfClientsSection;
