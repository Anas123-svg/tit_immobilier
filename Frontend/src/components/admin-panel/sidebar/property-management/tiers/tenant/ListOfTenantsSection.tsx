import React, { useState } from "react";
import { Eye, Edit, Printer, RefreshCw } from "lucide-react";
import useFetchData from "@/hooks/useFetchData"; // Assuming the useFetchData hook is implemented
import { Link } from "react-router-dom";
import PrivateTenantCard from "./UI/PrivateTenantCard"
import BusinessTenantCard from "./UI/BusinessTenantCard"
import { Tenant } from "@/types/DataProps";
// Define Tenant Interface matching the backend model
// Define Tenant Interface matching the backend model


const ListOfTenantsSection: React.FC = () => {
    // State to trigger a reload of the data
    const [reloadTrigger, setReloadTrigger] = useState<boolean>(false);
  // Function to handle reload button click
  const handleReload = () => {
    setReloadTrigger(prev => !prev); // Toggle the reloadTrigger to trigger re-fetch
  };
  // Fetch tenants data from API using the useFetchData hook
  const { data: tenants, loading, error } = useFetchData<Tenant[]>(
    `${import.meta.env.VITE_API_URL}/api/get-all-tenants`,
    reloadTrigger
  );

  return (
    <div className="p-4 bg-white shadow rounded-md mt-6">
    <div className="flex justify-between">  <h3 className="text-lg font-semibold mb-4">List of Tenants</h3>
 {/* Reload Button */}
 <button
        onClick={handleReload}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
      >
        <RefreshCw/>
      </button></div>
      {/* Loading State */}
      {loading && <p className="text-center text-gray-500">Loading tenants...</p>}

      {/* Error State */}
      {error && <p className="text-center text-red-500">Error fetching data: {error}</p>}

      {/* Empty State */}
      {!loading && tenants?.length === 0 && (
        <p className="text-center text-gray-500">No tenants found.</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {tenants?.map((tenant) => (
          tenant.is_business_tenant ? 
          <BusinessTenantCard key={tenant.id} tenant={tenant}/>:<PrivateTenantCard key={tenant.id} tenant={tenant}/>

        ))}
      </div>
    </div>
  
  );
};

export default ListOfTenantsSection;
