// ClientActionsSection.tsx
import React from "react";
import { Plus, PenTool } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BusinessClientForm from "./forms/BusinessClientForm";
import PrivateClientForm from "./forms/PrivateClientForm";
import FileClientForm from "./forms/FileClientForm";
const ClientActionsSection: React.FC = () => {
  return (
    <div className="flex justify-end space-x-4 mb-6">
         <DropdownMenu>
        <DropdownMenuTrigger className="bg-secondary text-white px-4 py-2 rounded flex items-center">
          <Plus size={16} className="mr-2" />
          Add
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <BusinessClientForm/>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <PrivateClientForm/>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <FileClientForm/>
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

export default ClientActionsSection;
