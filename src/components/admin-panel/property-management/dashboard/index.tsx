import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      {/* Header with Breadcrumb */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-primary">Principal</h1>
        <p className="text-sm text-gray-500">
          <span>Dashboard</span> / <span>Principal</span>
        </p>
      </div>

      {/* Filter Section */}
      <div className="p-4 bg-white shadow rounded-md mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option>ALL</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start date
            </label>
            <input
              type="date"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End date
            </label>
            <input
              type="date"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="flex items-end">
            <button className="w-full bg-primary text-white py-2 px-4 rounded-md">
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Owner Card */}
        <div className="p-4 bg-yellow-100 rounded-md shadow">
          <h3 className="text-lg font-semibold">4</h3>
          <p className="text-sm text-gray-500">Owner</p>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-yellow-700">Active</span>
            <span className="text-sm text-yellow-700">Inactive</span>
          </div>
        </div>

        {/* Tenant Card */}
        <div className="p-4 bg-red-100 rounded-md shadow">
          <h3 className="text-lg font-semibold">12</h3>
          <p className="text-sm text-gray-500">Tenant</p>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-red-700">Active</span>
            <span className="text-sm text-red-700">Inactive</span>
          </div>
        </div>

        {/* Contract Card */}
        <div className="p-4 bg-blue-100 rounded-md shadow">
          <h3 className="text-lg font-semibold">12</h3>
          <p className="text-sm text-gray-500">Contract</p>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-blue-700">Active</span>
            <span className="text-sm text-blue-700">Terminated</span>
          </div>
        </div>

        {/* Mandate Card */}
        <div className="p-4 bg-green-100 rounded-md shadow">
          <h3 className="text-lg font-semibold">4</h3>
          <p className="text-sm text-gray-500">Mandate</p>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-green-700">Valid</span>
            <span className="text-sm text-green-700">Terminated</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-4 bg-white shadow rounded-md mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Statistiques de Recouvrement Mensuel des Loyers
        </h3>
        <div className="h-64 bg-gray-200 rounded-md">
          {/* Placeholder for Chart */}
          <p className="text-center mt-24">[Chart Placeholder]</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-yellow-100 rounded-md shadow">
          <h3 className="text-lg font-semibold">4</h3>
          <p className="text-sm text-gray-500">Real Estate</p>
        </div>
        <div className="p-4 bg-green-100 rounded-md shadow">
          <h3 className="text-lg font-semibold">0</h3>
          <p className="text-sm text-gray-500">Ticket</p>
        </div>
        <div className="p-4 bg-red-100 rounded-md shadow">
          <h3 className="text-lg font-semibold">0</h3>
          <p className="text-sm text-gray-500">Intervention</p>
        </div>
        <div className="p-4 bg-blue-100 rounded-md shadow">
          <h3 className="text-lg font-semibold">0</h3>
          <p className="text-sm text-gray-500">Supplier</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
