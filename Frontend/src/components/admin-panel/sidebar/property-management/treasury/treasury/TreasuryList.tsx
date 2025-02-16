import React, { useState } from "react";
import TreasuryItemCard from "./TreasuryItemCard";
import { Treasury } from "@/types/DataProps";
import useFetchData from "@/hooks/useFetchData";
import { RefreshCw } from "lucide-react";


const TreasuryList: React.FC = () => {
   const [reloadTrigger, setReloadTrigger] = useState<boolean>(false);
    // Function to handle reload button click
    const handleReload = () => {
      setReloadTrigger((prev) => !prev); // Toggle the reloadTrigger to trigger re-fetch
    };
  const { data, loading, error } = useFetchData<Treasury[]>(
    `${import.meta.env.VITE_API_URL}/api/treasury/add`,reloadTrigger
  );
  return (

    <div className="p-6 bg-white rounded-xl ">
  <div className="flex flex-col "> <h2 className="text-2xl font-bold mb-4 text-center">LIST OF THE TREASURE</h2>
    <button
          onClick={handleReload}
          className="bg-green-500 w-fit self-end text-white px-4 py-2  rounded-md mb-4"
        >
          <RefreshCw />
        </button>
        </div> 
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6">
    
      {data?.map((item) => (
        <TreasuryItemCard
          key={item.id}
          item={item}
        
        />
      ))}
    </div>
    </div>
  );
};

export default TreasuryList;
