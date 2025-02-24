import React from 'react';
import { Eye, Edit, Printer, Pen } from 'lucide-react'; // Import icons from Lucide
import { Link } from 'react-router-dom';
import { Good } from '@/types/DataProps';
import PropertyForRentOwnerForm from '../../../forms/PropertyForRentOwnerForm';
import PropertyForSaleOwnerForm from '../../../forms/PropertyForSaleOwnerForm';



interface GoodCardProps {
  good: Good; // Single prop for the 'Good' object
}

const GoodCard = ({ good }: GoodCardProps) => {
  return (
    <div className="flex flex-col bg-slate-200 p-6 rounded-lg hover:shadow-xl hover:scale-105 cursor-pointer transition-all delay-75 w-full">
      {/* Building Image */}
      <div className="flex justify-center mb-4 p-5 bg-white rounded-lg">
        <img
          src={good?good?.photo || undefined:`https://app.zenapi.immo/assets/images/house-default.png`} // Placeholder image URL
          alt="Building"
          className="w-24 h-24 object-cover rounded-md"
        />
     
      </div>
      <div className="text-center mb-4 self-start">
        <span className="bg-green-300 text-green-800 py-1 px-3 rounded-md text-xs">
          {good.sale_type}
        </span>
      </div>
      {/* Status Badge */}
      <div className="text-center mb-4">
        <span className="bg-blue-500 text-white py-1 px-3 rounded-full text-xs">
          {good.status}
        </span>
      </div>

      {/* Building Name */}
      <h2 className="text-xl font-semibold text-center mb-2">{good.property_name}</h2>

      {/* Location */}
      <p className="text-center text-gray-500 mb-4">Located: {good.city}, {good.neighborhood}</p>

      {/* Market Value */}
      <div className="text-center text-gray-700 mb-4">Market Value: {good.market_value}</div>

      {/* Actions (View, Edit, Print) */}
      <div className="flex justify-center space-x-4 mt-4">
        <Link to={`/property/${good.id}/${good.sale_type =="For Rent"?"rent":"sale"}`}>
          <button className="p-2 bg-blue-500 text-white hover:bg-blue-700 rounded-lg">
            <Eye size={20} />
          </button>
        </Link>
      {
        good.sale_type == "For Rent"?
 <PropertyForRentOwnerForm property={good} customBtn={<button className="p-2 bg-yellow-500 text-white hover:bg-yellow-700 rounded-lg">
  <Pen size={20} />
</button>}/>:
      <PropertyForSaleOwnerForm property={good}  customBtn={<button className="p-2 bg-yellow-500 text-white hover:bg-yellow-700 rounded-lg">
        <Pen size={20} />
      </button>}/>}
        <button className="p-2 bg-gray-500 text-white hover:bg-gray-700 rounded-lg">
          <Printer size={20} />
        </button>
      </div>
    </div>
  );
};

export default GoodCard;
