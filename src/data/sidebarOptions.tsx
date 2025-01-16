import {
  Home,
  User,
  Settings,
  Calendar,
  FileText,
  DollarSign,
  Briefcase,
  Clipboard,
  Layers,
  Building,
  Shield,
  HelpCircle,
} from "lucide-react";
import { Icon as LucideIcon } from "lucide-react"; // Import Icon type from lucide-react

// Dummy components for demonstration (replace these with actual imports)
import Principal from "@/components/admin-panel/sidebar/property-management/dashboard/Principal";
import ProfileComponent from "@/components/admin-panel/sidebar/profile/Profile";
import ChangePassword from "@/components/admin-panel/sidebar/profile/ChangePassword";
import SettingsComponent from "@/components/admin-panel/sidebar/profile/Settings";
import LogoutComponent from "@/components/admin-panel/sidebar/profile/Logout";
import Owner from "@/components/admin-panel/sidebar/property-management/dashboard/Owner";
import Tenant from "@/components/admin-panel/sidebar/property-management/dashboard/Tenant";
import PromotionDashboard from "@/components/admin-panel/sidebar/property-management/dashboard/Promotion";
import Subdivision from "@/components/admin-panel/sidebar/property-management/dashboard/Subdivision";
import ManagementPortfolio from "@/components/admin-panel/sidebar/property-management/management-portfolio";
import MesValidations from "@/components/admin-panel/sidebar/property-management/mes-validatoins";
import Tiers from "@/components/admin-panel/sidebar/property-management/tiers";
import CRM from "@/components/admin-panel/sidebar/property-management/crm/SalesProspect";
import Heritage from "@/components/admin-panel/sidebar/property-management/heritage";
import Treasury from "@/components/admin-panel/sidebar/property-management/treasury";
import Report from "@/components/admin-panel/sidebar/property-management/report";
import GeneralMeans from "@/components/admin-panel/sidebar/extra/general-means";
import Ticket from "@/components/admin-panel/sidebar/extra/ticket";
import Resource from "@/components/admin-panel/sidebar/extra/resource";
import Extra from "@/components/admin-panel/sidebar/extra/extra";
import OwnerTier from "@/components/admin-panel/sidebar/property-management/tiers/owner";
import TenantTier from "@/components/admin-panel/sidebar/property-management/tiers/tenant";
import SubdivisionDashboard from "@/components/admin-panel/sidebar/property-management/dashboard/Subdivision";
import ClientTier from "@/components/admin-panel/sidebar/property-management/tiers/client";
import SalesProspect from "@/components/admin-panel/sidebar/property-management/crm/SalesProspect";
import LocationProspect from "@/components/admin-panel/sidebar/property-management/crm/LocationProspect";

// Type definition for a single route option
export interface SidebarOption {
  name: string;
  path: string;
  icon?: React.ElementType; // Correctly typed using LucideIcon
  component: React.FC<any>; // Allow components with any props
  subOptions?: SidebarOption[]; // Optional sub-options
}

// Type definition for sections in the sidebar
export interface SidebarSection {
  section: string;
  options: SidebarOption[];
}

export const sidebarOptions: SidebarSection[] = [
  {
    section: "Profile",
    options: [
      {
        name: "My Profile",
        path: "/profile",
        icon: User,
        component: ProfileComponent,
      },
      {
        name: "Change Password",
        path: "/change-password",
        icon: Shield,
        component: ChangePassword,
      },
      {
        name: "Setting",
        path: "/settings",
        icon: Settings,
        component: SettingsComponent,
      },
      {
        name: "Log out",
        path: "/",
        icon: HelpCircle,
        component: LogoutComponent,
      },
    ],
  },
  {
    section: "Property Management",
    options: [
      { name: "Management Portfolio", path: "/portfolio", icon: Briefcase, component: ManagementPortfolio,  },
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: Home,
        component:Principal,
        subOptions: [
          { name: "Principal", path: "/dashboard/principal", component: Principal },
          { name: "Owner", path: "/dashboard/owner", component: Owner },
          { name: "Tenant", path: "/dashboard/tenant", component: Tenant },
          { name: "Promotion", path: "/dashboard/promotion", component: PromotionDashboard },
          { name: "Subdivision", path: "/dashboard/subdivision", component: SubdivisionDashboard },
        ],
      },
      { name: "Mes Validations", path: "/validations", icon: Clipboard, component: MesValidations },
      {
        name: "Tiers",
        path: "/tiers",
        icon: Layers,
        component: OwnerTier,
        subOptions: [
          { name: "Owner", path: "/tiers/owner", component: OwnerTier },
          { name: "Tenant", path: "/tiers/tenant", component: TenantTier },
          { name: "Client", path: "/tiers/client", component: ClientTier },
        ],
      },
      {
        name: "CRM",
        path: "/crm",
        icon: User,
       component:SalesProspect,
        subOptions: [
          {
            name: "Sales Prospect",
            path: "/crm/sales-prospect",
           component: SalesProspect
          },
          {
            name: "Prospect Location",
            path: "/crm/prospect-location",
           component:LocationProspect
          },
          {
            name: "Setting",
            path: "/crm/setting",
           component: CRM
          }
        ]
      },
    
      { name: "Heritage", path: "/heritage", icon: Building, component: Heritage },
      { name: "Treasury", path: "/treasury", icon: DollarSign, component: Treasury },
      { name: "Report", path: "/report", icon: FileText, component: Report },
    ],
  },
  {
    section: "Extra",
    options: [
      { name: "General Means", path: "/general-means", icon: Clipboard, component: GeneralMeans },
      { name: "Ticket", path: "/ticket", icon: Calendar, component: Ticket },
      { name: "Resource", path: "/resource", icon: Layers, component: Resource },
      { name: "Extra", path: "/extra", icon: Briefcase, component: Extra },
    ],
  },
  // {
  //   section: "Security",
  //   options: [{ name: "User", path: "/user", icon: User, component: UserManagement }],
  // },
];
