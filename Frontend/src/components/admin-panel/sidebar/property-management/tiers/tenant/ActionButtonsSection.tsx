
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


const TenantActionsSection: React.FC = () => {
  return (
    <div className="flex justify-end space-x-4 mb-6">
       <button className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600">
        <RefreshCw size={16} />
        <span>Generation</span>
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-secondary text-white px-4 py-2 rounded flex items-center">
          <Plus size={16} className="mr-2" />
          Add
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <PrivateTenantForm />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <BusinessTenantForm />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ContractTenantForm />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ShortTermContractTenantForm />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <RentBill />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <PenaltyBills />
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

export default TenantActionsSection;
