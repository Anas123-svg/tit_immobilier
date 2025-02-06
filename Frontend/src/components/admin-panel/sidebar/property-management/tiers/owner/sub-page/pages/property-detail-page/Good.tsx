import DynamicTable from "@/components/admin-panel/UI-components/DynamicTable";
import React from "react";

interface Rentals {
  occupied: number;
  available: number;
  reserved: number;
}

interface Property {
  propertyName: string;
  marketValue: string;
  totalRent: string;
  totalCharges: string;
  rentalValue: string;
  rentals: Rentals;
}
const data = [
    {
      locative: (
        <div className="flex items-center">
          <img
            src="https://app.zenapi.immo/assets/images/house-default.png" // Image URL
            alt="Building"
            className="w-16 h-16 object-cover rounded-md mr-4"
          />
          YAO FERNAND BUILDING - APARTMENT N°A7
        </div>
      ),
      occupant: "My mother is Lydia Carmen",
      state: (
        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
          BUSY
        </span>
      ),
      createIt: "January 8, 2025 at 4:55:28 AM",
      noRent: "88,000 XOF",
    
    },
    {
      locative: (
        <div className="flex items-center">
          <img
            src="https://app.zenapi.immo/assets/images/house-default.png" // Image URL
            alt="Building"
            className="w-16 h-16 object-cover rounded-md mr-4"
          />
          DEMEBLE BUILDING - APARTMENT N°B3
        </div>
      ),
      occupant: "No Occupants",
      state: (
        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
          AVAILABLE
        </span>
      ),
      createIt: "January 8, 2025 at 4:55:28 AM",
      noRent: "175,000 XOF",
   
    },
    // Add more rows as necessary
  ];
  const replicatedData = Array(4).fill(data).flat();
  const columns = [
    { label: "Good", accessor: "locative" }, // This will represent the building name and image
    { label: "Occupant", accessor: "occupant" },
    { label: "State", accessor: "state" },
    { label: "Create It", accessor: "createIt" },
    { label: "No Rent", accessor: "noRent" },

  ];
const Good = ({
  propertyName,
  marketValue,
  totalRent,
  totalCharges,
  rentalValue,
  rentals,
}: Property) => (
  <div className="property-detail space-y-10 p-5">
 <div className="flex sm:h-[500px] flex-col sm:flex-row">
  {/* Left column: Property Image */}
  <div className="sm:w-5/12  flex items-center justify-center p-4">
    <img src="https://app.zenapi.immo/assets/images/house-default.png" alt="Property" className=" min-h-[300px] sm:max-h-[400px]" />
  </div>

  {/* Right column: Property Details */}
  <div className="sm:w-7/12 h-full p-4  flex flex-col space-y-5">
  <div className="p-2 bg-green-200 w-fit rounded-lg"><h2  className="font-semibold  text-2xl text-green-600">For Sale</h2></div>
    <div className="property-info space-y-5">
      <h1 className="text-2xl font-semibold ">YAO FERNAND BUILDING</h1>
      <div className="market-value">
        <h2 className="text-sm ">created by:</h2>

      </div>
      <div className="bg-yellow-200 w-fit p-2 rounded-md">
        <h2 className="text-sm text-yellow-600">Without Mandate</h2>

      </div>
      <div className="market-value">
        <h2 className="text-xl font-bold">Market Value: <span className="text-green-500"> 1000000000 XOF</span></h2>

      </div>
    </div>
<div className="grid grid-cols-2 gap-10">
    <div className="rentals-summary flex  space-y-5 flex-col justify-between">
      <h3 className="text-lg font-semibold">15 Rentals</h3>
   
        <div><strong>Occupied: </strong> 4 Value 570,000 XOF</div>
        <div><strong>Available: </strong> 11 Value 1,650,000 XOF</div>
        <div><strong>Reserved: </strong> 0 Value 0 XOF</div>
  
      <button className=" bg-blue-500 text-white py-2 px-4 rounded-lg">To modify</button>
    </div>

    <div className="financial-summary flex-col flex  space-y-5 justify-between">
      <h3 className="text-lg font-semibold">Total Rent: <span className=" font-normal text-md"> 2,220,000 XOF</span></h3>
      <h3 className="text-lg font-semibold">Total Charges:<span className=" font-normal text-md"> 0 XOF</span></h3>
      <h3 className="text-lg font-semibold">Rental Value:<span className=" font-normal text-md"> 2,220,000 XOF</span></h3>
      <button className=" bg-red-500 text-white py-2 px-4 rounded-lg">Delete</button>
    </div>
    
    </div>
   
  </div>
</div>


<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-1">
  {/* Left Column: Property Information */}
  <div className="p-4">
    <div className="text-sm font-medium text-gray-600">OWNER:</div>
    <div className="text-sm font-semibold">MR. YAO KOUADIO FERNAND</div>
  </div>

  {/* Right Column: Property Information */}
  <div className="p-4">
    <div className="text-sm font-medium text-gray-600">CONTACT:</div>
    <div className="text-sm font-semibold">585139200</div>
  </div>

  {/* Third Column: Property Details */}
  <div className="p-4">
    <div className="text-sm font-medium text-gray-600">ISLAND:</div>
    <div className="text-sm font-semibold">NO</div>
  </div>

  {/* Fourth Column: Property Details */}
  <div className="p-4">
    <div className="text-sm font-medium text-gray-600">AT THE CORNER?:</div>
    <div className="text-sm font-semibold">NO</div>
  </div>

  {/* Additional Fields */}
  <div className="p-4">
    <div className="text-sm font-medium text-gray-600">BATCH:</div>
    <div className="text-sm font-semibold">-</div>
  </div>

  <div className="p-4">
    <div className="text-sm font-medium text-gray-600">NEAR WATER?:</div>
    <div className="text-sm font-semibold">NO</div>
  </div>

  <div className="p-4">
    <div className="text-sm font-medium text-gray-600">MODIFIED ON:</div>
    <div className="text-sm font-semibold">JANUARY 9, 2025 AT 6:17:29 AM</div>
  </div>

  <div className="p-4">
    <div className="text-sm font-medium text-gray-600">CREATED ON:</div>
    <div className="text-sm font-semibold">JANUARY 9, 2025 AT 6:07:31 AM</div>
  </div>
</div>


    {/* Section 3: Financial Summary */}
    <div className="financial-summary">
    <DynamicTable addBorder={false} columns={columns} data={replicatedData} pageSize={5} addButton={false} />
    </div>

  
  </div>
);

export default Good;
