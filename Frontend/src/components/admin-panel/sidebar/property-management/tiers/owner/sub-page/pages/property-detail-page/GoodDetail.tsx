import DynamicTable from "@/components/admin-panel/UI-components/DynamicTable";
import { Good } from "@/types/DataProps";
import React from "react";
import PropertyForRentOwnerForm from "../../../forms/PropertyForRentOwnerForm";
import { ProspectSalesForm } from "@/components/admin-panel/sidebar/property-management/crm/SalesProspect/forms/ProspectSalesForm";
import PropertyForSaleOwnerForm from "../../../forms/PropertyForSaleOwnerForm";
import DeletePropertyDialog from "./DeletePropertyDialog";
import EmptyState from "@/components/admin-panel/UI-components/EmptyState";

interface Rentals {
  occupied: number;
  available: number;
  reserved: number;
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

  interface GoodDetailFormProps{
    property?: Good
  }
const GoodDetail: React.FC<GoodDetailFormProps> = ({property}) => (
  !property ?
  <div className="">
    <EmptyState message="Property"/>
  </div>
  :
  <div className="property-detail space-y-10 p-5">
 <div className="flex sm:h-[500px] flex-col sm:flex-row">
  {/* Left column: Property Image */}
  <div className="sm:w-5/12  flex items-center justify-center p-4">
    <img src={property ?`${property?.photo}`:"https://app.zenapi.immo/assets/images/house-default.png"} alt="Property" className=" min-h-[300px] sm:max-h-[400px]" />
  </div>

  {/* Right column: Property Details */}
  <div className="sm:w-7/12 h-full p-4  flex flex-col space-y-5">
  <div className="p-2 bg-green-200 w-fit rounded-lg"><h2  className="font-semibold  text-2xl text-green-600">{property?.sale_type}</h2></div>
    <div className="property-info space-y-5">
      <h1 className="text-2xl font-semibold ">{property?.property_name}</h1>
      <div className="market-value">
        <h2 className="text-sm ">created by: {property?.created_at}</h2>

      </div>
      {/* <div className="bg-yellow-200 w-fit p-2 rounded-md">
        <h2 className="text-sm text-yellow-600">Without Mandate</h2>
        

      </div> */}
      <div className="market-value">
        <h2 className="text-xl font-bold">Market Value: <span className="text-green-500"> {property?.market_value} XOF</span></h2>

      </div>
    </div>
<div className="grid grid-cols-2 gap-10">
    <div className="rentals-summary flex  space-y-5 flex-col justify-between">
      <h3 className="text-lg font-semibold">{property?.number_of_rentals} Rentals</h3>
{/*    
        <div><strong>Occupied: </strong> {property?.details?.length||0} Value {property?.details[0]?.charges||0} XOF</div>
        <div><strong>Available: </strong> {property?.details?.length||0} Value {property?.details[0]?.charges||0} XOF</div>
        <div><strong>Reserved: </strong> {property?.details?.length||0} Value {property?.details[0]?.charges||0} XOF</div>
   */}
    {property?.sale_type =="For Rent"?
    
    <PropertyForRentOwnerForm property={property} customBtn={<button className=" bg-blue-500 w-full text-white py-2 px-4 rounded-lg">To modify</button>}/>
    :

    <PropertyForSaleOwnerForm property={property} customBtn={ <button className=" bg-blue-500 w-full text-white py-2 px-4 rounded-lg">To modify</button>}/>
 
    }  
    </div>

    <div className="financial-summary flex-col flex  space-y-5 justify-between">
      <h3 className="text-lg font-semibold">Total Rent: <span className=" font-normal text-md"> {property?.details?.reduce((sum, locative) => sum + (locative.rent || 0), 0)||0} XOF</span></h3>
      <h3 className="text-lg font-semibold">Total Charges:<span className=" font-normal text-md"> {property?.details?.reduce((sum, locative) => sum + (locative.charges || 0), 0)||0} XOF</span></h3>
      <h3 className="text-lg font-semibold">Rental Value:<span className=" font-normal text-md"> {property?.details?.reduce((sum, locative) => sum + (locative.rent || 0), 0)||0} XOF</span></h3>
     <DeletePropertyDialog propertyId={property?.id||0}/>
    </div>
    
    </div>
   
  </div>
</div>


<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-1">
  {/* Left Column: Property Information */}
  <div className="p-4">
    <div className="text-sm font-medium text-gray-600">OWNER:</div>
    <div className="text-sm font-semibold">{property?.owner}</div>
  </div>

  {/* Right Column: Property Information */}
  <div className="p-4">
    <div className="text-sm font-medium text-gray-600">CONTACT:</div>
    <div className="text-sm font-semibold">{property?.municipality}</div>
  </div>

  {/* Third Column: Property Details */}
  <div className="p-4">
    <div className="text-sm font-medium text-gray-600">ISLAND:</div>
    <div className="text-sm font-semibold">{property?.island}</div>
  </div>

  {/* Fourth Column: Property Details */}
  <div className="p-4">
    <div className="text-sm font-medium text-gray-600">AT THE CORNER?:</div>
    <div className="text-sm font-semibold">{property?.on_the_corner}</div>
  </div>

  {/* Additional Fields */}
  <div className="p-4">
    <div className="text-sm font-medium text-gray-600">BATCH:</div>
    <div className="text-sm font-semibold">{property?.batch}</div>
  </div>

  <div className="p-4">
    <div className="text-sm font-medium text-gray-600">NEAR WATER?:</div>
    <div className="text-sm font-semibold">{property?.near_water}</div>
  </div>

  <div className="p-4">
    <div className="text-sm font-medium text-gray-600">MODIFIED ON:</div>
    <div className="text-sm font-semibold">{property?.updated_at}</div>
  </div>

  <div className="p-4">
    <div className="text-sm font-medium text-gray-600">CREATED ON:</div>
    <div className="text-sm font-semibold">{property?.created_at}</div>
  </div>
</div>


    {/* Section 3: Financial Summary */}
    {/* <div className="financial-summary">
    <DynamicTable addBorder={false} columns={columns} data={replicatedData} pageSize={5} addButton={false} />
    </div> */}

  
  </div>
);

export default GoodDetail;
