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
import RenewMandateOwnerForm from "./forms/RenewMandateOwnerForm";
import TerminateMandateOwnerForm from "./forms/TerminateMandateOwnerForm";

const OwnerActionsSection: React.FC = () => {
  return (
    <div className="flex justify-end space-x-4 mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-secondary text-white px-4 py-2 rounded flex items-center">
          <Plus size={16} className="mr-2" />
          Add
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-2 p-2 items-start">
          <PrivateOwnerForm />
          <BusinessOwnerForm />
          <PropertyForRentOwnerForm />
          <PropertyForSaleOwnerForm />
          <ReversalPropertyForSaleOwnerForm />
          <ReversalPropertyForRentalOwnerForm />
          <ManagmentFormOwner />
          <MandateOwnerForm />
      
          <RenewMandateOwnerForm/>
          <TerminateMandateOwnerForm/>
          <ValidatorsOwnerForm />
          <RentalPropertyOwnerForm />
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
