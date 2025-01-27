import GeneralTicketSettings from "@/components/admin-panel/sidebar/extra/ticket/TicketConfiguratoin/gernal-configuration/GeneralTicketSettings";
import ProcedureTicketSettings from "@/components/admin-panel/sidebar/extra/ticket/TicketConfiguratoin/gernal-configuration/ProcedureTicketSettings";
import TicketCategorySettings from "@/components/admin-panel/sidebar/extra/ticket/TicketConfiguratoin/gernal-configuration/TicketCategorySettings";
import { FileText, Tag, Settings } from "lucide-react"; // Importing relevant icons

export const ticketOptions = [
  {
    name: "General configuration",
    subOptions: [
      {
        name: "Ticket Manager",
        path: "/ticket/general",
        icon: Settings, // Icon for Ticket Manager
        component: GeneralTicketSettings, // Component for this route
      },
      {
        name: "Ticket Category",
        path: "/ticket/category",
        icon: Tag, // Icon for Ticket Category
        component: TicketCategorySettings, // Component for this route
      },


      {
        name: "Ticket Procedures",
        path: "/ticket/procedure",
        icon: FileText, // Icon for Ticket Procedures
        component: ProcedureTicketSettings, // Component for this route
      },
    ],
  },
];
