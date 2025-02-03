import {Costs} from "@/components/admin-panel/sidebar/property-management/crm/Settings/settings/costs";
import GeneralConfiguration from "@/components/admin-panel/sidebar/property-management/crm/Settings/settings/general-configuration";
import ProspectingStage from "@/components/admin-panel/sidebar/property-management/crm/Settings/settings/prospecting-stage";
import ProspectingTunnelRental from "@/components/admin-panel/sidebar/property-management/crm/Settings/settings/rospecting-tunnel-rental";
import SalesProspectingFunnel from "@/components/admin-panel/sidebar/property-management/crm/Settings/settings/sales-prospecting-funnel";
import { Settings, Wrench, DollarSign, BookIcon, BanknoteIcon } from "lucide-react";


export const settingsOptions = [
  {
    name: "Settings",
    subOptions: [
      { name: "General configuration", path: "/crm/setting/general", icon: Settings, component: GeneralConfiguration },
      { name: "Sales prospecting funnel", path: "/crm/setting/sales-prospecting-funnel", icon: Wrench, component: SalesProspectingFunnel },
      { name: "Prospecting tunnel rental", path: "/crm/setting/prospecting-tunnel-rental", icon: DollarSign, component: ProspectingTunnelRental },
      { name: "Prospecting stage", path: "/crm/setting/prospecting-stage", icon: BookIcon, component: ProspectingStage },
      { name: "Costs", path: "/crm/setting/costs", icon: BanknoteIcon, component: Costs },
    ],
  },
];
