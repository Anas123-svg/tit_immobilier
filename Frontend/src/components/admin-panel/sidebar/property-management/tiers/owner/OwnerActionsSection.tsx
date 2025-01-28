import React from "react";
import { Plus, PenTool } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PrivateOwnerForm from "./forms/PrivateOwnerForm";
import BusinessOwnerForm from "./forms/BusinessOwnerForm";

import PropertyForSaleOwnerForm from "./forms/PropertyForSaleOwnerForm";
import ReversalPropertyForSaleOwnerForm from "./forms/ReversalPropertyForSaleOwnerForm";
import ReversalPropertyForRentalOwnerForm from "./forms/ReversalPropertyForRentalOwnerForm";
import ManagmentFormOwner from "./forms/ManagmentFormOwner";
import MandateOwnerForm from "./forms/MandateOwnerForm";
import RentalPropertyOwnerForm from "./forms/RentalPropertyOwnerForm";
import PropertyForRentOwnerForm from "./forms/PropertyForRentOwnerForm";
import ValidatorsOwnerForm from "./forms/ValidatorsOwnerForm";

const OwnerActionsSection: React.FC = () => {
  return (
    <div className="flex justify-end space-x-4 mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-secondary text-white px-4 py-2 rounded flex items-center">
          <Plus size={16} className="mr-2" />
          Add
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <PrivateOwnerForm />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <BusinessOwnerForm />
          </DropdownMenuItem>
       
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <PropertyForRentOwnerForm />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <PropertyForSaleOwnerForm />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ReversalPropertyForSaleOwnerForm />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ReversalPropertyForRentalOwnerForm />
          </DropdownMenuItem><DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ManagmentFormOwner />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <MandateOwnerForm />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ValidatorsOwnerForm />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <RentalPropertyOwnerForm />
          </DropdownMenuItem>
        
        </DropdownMenuContent>
      </DropdownMenu>

      <button className="bg-primary text-white px-4 py-2 rounded flex items-center">
        <PenTool size={16} className="mr-2" />
        Tools
      </button>
    </div>
  );
};

export default OwnerActionsSection;
