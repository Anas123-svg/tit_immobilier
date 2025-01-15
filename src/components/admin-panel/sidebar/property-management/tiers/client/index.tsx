// ClientTier.tsx
import React from "react";
import { Search, Calendar, ChevronRight } from "lucide-react";
import NotificationSection from "../owner/OwnerNotificationSection";
import PlaceholderSection from "../owner/ListOfOwnersSection";

interface Breadcrumb {
  name: string;
  path: string;
}

interface ClientHeaderSectionProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

const ClientHeaderSection: React.FC<ClientHeaderSectionProps> = ({
  title,
  breadcrumbs,
}) => {
  return (
    <div className="bg-blue-600 text-white p-6 rounded-md mb-6">
      {/* Breadcrumbs */}
      <p className="text-sm mb-2">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="flex items-center">
            <a href={crumb.path} className="hover:underline">
              {crumb.name}
            </a>
            {index < breadcrumbs.length - 1 && (
              <ChevronRight size={12} className="mx-1" />
            )}
          </span>
        ))}
      </p>

      {/* Title */}
      <h1 className="text-2xl font-semibold">{title}</h1>

      {/* Filter Section */}
      <div className="grid grid-cols-6 gap-4 mt-4">
        <div>
          <label className="block text-sm">Type</label>
          <select className="w-full p-2 border rounded">
            <option>CLIENT</option>
            <option>CONTRACT</option>
            <option>SHORT TERM CONTRACT</option>
            <option>PAYMENT</option>
            <option>RENT</option>
            <option>ENTRY INVOICE</option>
            <option>WARNING ECHEANCE</option>
            <option>PENALTY</option>
            <option>OTHER INVOICES</option>
            <option>SHORT TERM CONTRACT INVOICE</option>
            <option>STATE OF PLAY</option>
            <option>RENEWAL</option>
            <option>EXTENSION</option>
            <option>TERMINATION</option>
            <option>RENEWAL PAYMENT</option>
          </select>
        </div>

        <div>
          <label className="block text-sm">Reference No.</label>
          <input
            type="text"
            placeholder="EX: ZA-0000-0000-00"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Name / Company Name</label>
          <input
            type="text"
            placeholder="Name / Company"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Promotion</label>
          <input
            type="text"
            placeholder="Select an item"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Subdivision Project</label>
          <input
            type="text"
            placeholder="Select an item"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Commercial</label>
          <input
            type="text"
            placeholder="Select an item"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Start Date</label>
          <div className="relative">
            <input type="date" className="w-full p-2 border rounded" />
            <Calendar size={16} className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm">End Date</label>
          <div className="relative">
            <input type="date" className="w-full p-2 border rounded" />
            <Calendar size={16} className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>

        <div className="flex items-end">
          <button className="bg-blue-700 text-white px-4 py-2 rounded flex items-center">
            <Search size={16} className="mr-2" />
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

const ClientTier: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ClientHeaderSection
        title="Client"
        breadcrumbs={[
          { name: "Tiers", path: "/tiers" },
          { name: "Client", path: "/tiers/client" },
        ]}
      />

      <NotificationSection message="We inform you that an update has been made. From now on, all actions are grouped under the Add button. Please click on this button to make all your creations." />

      <PlaceholderSection title="Customer List" message="Oupss!! No clients found" />
    </div>
  );
};

export default ClientTier;
