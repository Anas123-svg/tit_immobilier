import React from "react";
import { Eye, Edit, Printer } from "lucide-react";
import useFetchData from "@/hooks/useFetchData"; // Assuming you have a custom hook to fetch data
import { Link } from "react-router-dom";
import BusinessOwnerCard from "./UI/BusinessOwner";
import PrivateOwnerCard from "./UI/PrivateOwner";
import { Owner } from "@/types/DataProps";

// Define the Owner Interface matching the backend model



const ListOfOwnersSection: React.FC = () => {
  // Fetch owners data from API using the useFetchData hook
  const { data: Owners, loading, error } = useFetchData<Owner[]>(
    `${import.meta.env.VITE_API_URL}/api/get-all-owners`
  );

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-3xl text-center font-semibold mb-4">List of Owners</h3>

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
