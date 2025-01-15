import React from "react";
import { Eye, Edit, Printer } from "lucide-react";

interface Owner {
  id: number;
  name: string;
  reference: string;
  contact: string;
  address: string;
  status: string;
  sold: string;
  imgUrl: string; // Added imgUrl property
}

interface ListOfOwnersSectionProps {
  owners: Owner[];
}

const ListOfOwnersSection: React.FC<ListOfOwnersSectionProps> = ({ owners }) => {
  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-3xl text-center  font-semibold mb-4">List of Owners</h3>
      <div className="grid grid-cols-2 gap-4">
        {owners.map((owner) => (
          <div
            key={owner.id}
            className="relative p-6 bg-white border rounded-lg shadow-md"
          >
            {/* Owner Type and Status */}
            <div className="absolute top-2 left-2 bg-gray-300 text-xs px-2 py-1 rounded-full uppercase font-semibold">
              Particular
            </div>
            <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
              {owner.status}
            </div>

            {/* Owner Info */}
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mx-auto mb-2">
                <img
                  src={owner.imgUrl}
                  alt={owner.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold">{owner.name}</h4>
              <p className="text-sm text-gray-500">Ref: {owner.reference}</p>
              <p className="text-sm text-gray-500">Contact: {owner.contact}</p>
              <p className="text-sm text-blue-600">Home: {owner.address}</p>
              <p className="text-sm text-green-600">Sold: {owner.sold}</p>
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

export default ListOfOwnersSection;
