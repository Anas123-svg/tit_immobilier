import { Printer } from "lucide-react";
import React from "react";

interface Breadcrumb {
  name: string;
  path: string;
}

const ClientReport: React.FC = () => {
  const breadcrumbs: Breadcrumb[] = [
    { name: "Report", path: "/report" },
    { name: "Client", path: "/report/client" },
  ];

  return (
    <div className="p-2 sm:p-6 space-y-10 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-primary text-white p-6 rounded-md">
        {/* Breadcrumbs */}
        <div className="mb-2">
          <p className="text-sm">
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                <a href={crumb.path} className="hover:underline">
                  {crumb.name}
                </a>
                {index < breadcrumbs.length - 1 && " > "}
              </span>
            ))}
          </p>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold">Client</h1>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-md shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select className="w-full p-2 border rounded-md">
              <option>ACCOUNT</option>
              <option>CONTRACT</option>
            </select>
          </div>

          {/* Name / Company Name */}
          <div>
            <label className="block text-sm font-medium">Name / Company Name</label>
            <input
              type="text"
              placeholder="Name / Company name"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input type="date" className="w-full p-2 border rounded-md" />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium">End Date</label>
            <input type="date" className="w-full p-2 border rounded-md" />
          </div>

          {/* Creation Date */}
          <div>
            <label className="block text-sm font-medium">Creation Date</label>
            <input type="date" className="w-full p-2 border rounded-md" />
          </div>

          {/* Order */}
          <div>
            <label className="block text-sm font-medium">Order</label>
            <select className="w-full p-2 border rounded-md">
              <option>Ascending</option>
              <option>Descending</option>
            </select>
          </div>

          {/* Results Per Page */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <select className="w-full p-2 border rounded-md">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>

        {/* Print Button */}
        <div className="flex justify-end mt-4">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md flex items-center gap-2">
          <Printer/>
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientReport;
