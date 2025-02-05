import React, { useState } from "react";
import { Eye, Edit, Printer, RefreshCw } from "lucide-react";
import useFetchData from "@/hooks/useFetchData"; // Assuming you have a custom hook to fetch data
import { Link } from "react-router-dom";
import BusinessOwnerCard from "./UI/BusinessOwner";
import PrivateOwnerCard from "./UI/PrivateOwner";
import { Owner } from "@/types/DataProps";

// Define the Owner Interface matching the backend model



const ListOfOwnersSection: React.FC = () => {
  // Fetch owners data from API using the useFetchData hook
 
  const [reloadTrigger, setReloadTrigger] = useState<boolean>(false);
  // Function to handle reload button click
  const handleReload = () => {
    setReloadTrigger(prev => !prev); // Toggle the reloadTrigger to trigger re-fetch
  };
  const { data: Owners, loading, error } = useFetchData<Owner[]>(
    `${import.meta.env.VITE_API_URL}/api/get-all-owners`,reloadTrigger
  );
  return (
    <div className="p-4 bg-white shadow rounded-md">
    <div className="flex justify-between">   <h3 className="text-3xl text-center font-semibold mb-4">List of Owners</h3>
      <button
        onClick={handleReload}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
      >
        <RefreshCw/>
      </button></div>
      {/* Loading State */}
      {loading && <p className="text-center text-gray-500">Loading owners...</p>}

      {/* Error State */}
      {error && <p className="text-center text-red-500">Error fetching data: {error}</p>}

      {/* Empty State */}
      {!loading && Owners?.length === 0 && (
        <p className="text-center text-gray-500">No owners found.</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {Owners?.map((owner) => (
          owner.is_business_owner ? 
  <BusinessOwnerCard key={owner.id} owner={owner}/> : <PrivateOwnerCard key={owner.id} owner={owner}/>
        ))}
      </div>
    </div>
  );
};

export default ListOfOwnersSection;
