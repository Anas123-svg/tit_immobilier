import React from "react";
import { Plus, PenTool } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PrivateOwnerForm from "./PrivateOwnerForm";
import BusinessOwnerForm from "./BusinessOwnerForm";

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
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
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
