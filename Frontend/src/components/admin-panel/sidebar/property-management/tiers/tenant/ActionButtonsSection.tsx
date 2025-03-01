
import React from "react";
import { Plus, PenTool, RefreshCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PrivateTenantForm from "./forms/PrivateTenantForm";
import BusinessTenantForm from "./forms/BusinessTenantForm";
import ContractTenantForm from "./forms/ContractTenantForm";
import ShortTermContractTenantForm from "./forms/ShortTermContractTenantForm";
import RentBill from "./forms/RentBill";
import PenaltyBills from "./forms/PenaltyBills";
import GenerationButton from "./GenerationButton";


const TenantActionsSection: React.FC = () => {
  return (
    <div className="flex justify-end space-x-4 mb-6">
   <GenerationButton/>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-secondary text-white px-4 py-2 rounded flex items-center">
          <Plus size={16} className="mr-2" />
          Add
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col text-start gap-1 justify-start items-start p-3">
         
            <PrivateTenantForm />
    
         
            <BusinessTenantForm />
    
         
            <ContractTenantForm />
    
         
            <ShortTermContractTenantForm />
    
         
            <RentBill />
    
         
            <PenaltyBills />
    
        </DropdownMenuContent>
      </DropdownMenu>

      <button className="bg-primary text-white px-4 py-2 rounded flex items-center">
        <PenTool size={16} className="mr-2" />
        Tools
      </button>
    </div>
  );
};

export default TenantActionsSection;
