// ListOfClientsSection.tsx
import React from "react";
import { Eye, Edit, Printer } from "lucide-react";

interface Client {
  id: number;
  name: string;
  reference: string;
  contact: string;
  address: string;
  status: string;
  sold: string;
  imgUrl: string; // Added imgUrl property
}

interface ListOfClientsSectionProps {
  clients?: Client[];
}

const ListOfClientsSection: React.FC<ListOfClientsSectionProps> = ({ clients }) => {
  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-3xl text-center font-semibold mb-4">Customer List</h3>
      {clients === undefined ? 
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="text-6xl text-yellow-500 mb-4">😟</div>
          <h4 className="text-xl font-bold text-gray-700">Oops!!</h4>
          <p className="text-gray-500">No owners found</p>
        </div>
       : (<div className="grid grid-cols-2 gap-4">
        {clients?.map((client) => (
          <div
            key={client.id}
            className="relative p-6 bg-white border rounded-lg shadow-md"
          >
            {/* Client Type and Status */}
            <div className="absolute top-2 left-2 bg-gray-300 text-xs px-2 py-1 rounded-full uppercase font-semibold">
              Particular
            </div>
            <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
              {client.status}
            </div>

            {/* Client Info */}
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mx-auto mb-2">
                <img
                  src={client.imgUrl}
                  alt={client.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold">{client.name}</h4>
              <p className="text-sm text-gray-500">Ref: {client.reference}</p>
              <p className="text-sm text-gray-500">Contact: {client.contact}</p>
              <p className="text-sm text-blue-600">Home: {client.address}</p>
              <p className="text-sm text-green-600">Sold: {client.sold}</p>
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
      </div>)
    }    </div>
  );
};

export default ListOfClientsSection;
