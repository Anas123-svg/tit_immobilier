import { Edit, Eye, Printer } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

// Define the interface for Private Owner
interface PrivateOwner {
  id:number,
  private_name: string;
  private_gender: string;
  private_birth_date: string;
  private_address: string;
  private_nationality: string;
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
  private_photo: string | null;
  private_documents: string[];
  status: string;
}

const PrivateOwnerCard: React.FC<{ owner: PrivateOwner }> = ({ owner }) => {
  return (
    <div className="relative p-6 bg-white border rounded-lg shadow-md">
      <div className="absolute top-2 left-2 bg-gray-300 text-xs px-2 py-1 rounded-full uppercase font-semibold">Individual</div>
      <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">{owner.status}</div>

      <div className="text-center mb-4">
        <div className="w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden">
          <img src={owner.private_photo || "/default-avatar.png"} alt={owner.private_name} className="w-full h-full object-cover" />
        </div>
        <h4 className="text-xl font-bold">{owner.private_name}</h4>
        <p className="text-sm text-gray-500">TIN: {owner.private_taxpayer_identification_number}</p>
        <p className="text-sm text-gray-500">Occupation: {owner.private_occupation}</p>
        <p className="text-sm text-blue-600">Address: {owner.private_address}</p>
        <p className="text-sm text-green-600">Email: {owner.private_email}</p>
      </div>

      <div className="border-t pt-3 mt-3">
        <p className="text-sm font-semibold text-gray-600">Emergency Contact:</p>
        <p className="text-sm text-gray-700">{owner.private_emergency_contact_name}</p>
        <p className="text-sm text-gray-500">Relation: {owner.private_emergency_contact_relation}</p>
        <p className="text-sm text-gray-500">Contact: {owner.private_emergency_contact}</p>
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

export default PrivateOwnerCard;
