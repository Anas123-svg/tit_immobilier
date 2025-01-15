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
import Dashboard from "@/components/admin-panel/property-management/dashboard";
import Principal from "@/components/admin-panel/property-management/dashboard/Principal";
import ProfileComponent from "@/components/admin-panel/profile/Profile";
import ChangePassword from "@/components/admin-panel/profile/ChangePassword";
import SettingsComponent from "@/components/admin-panel/profile/Settings";
import LogoutComponent from "@/components/admin-panel/profile/Logout";
import Owner from "@/components/admin-panel/property-management/dashboard/Owner";
import Tenant from "@/components/admin-panel/property-management/dashboard/Tenant";
import Promotion from "@/components/admin-panel/property-management/dashboard/Promotion";
import Subdivision from "@/components/admin-panel/property-management/dashboard/Subdivision";

// Type definition for a single route option
export interface SidebarOption {
  name: string;
  path: string;
  icon: React.ElementType; // Correctly typed using LucideIcon
  component: React.FC;
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
      { name: "Management Portfolio", path: "/portfolio", icon: Briefcase, component: Dashboard },
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: Home,
        component: Dashboard,
        subOptions: [
          { name: "Principal", icon: Home, path: "/dashboard/principal", component: Principal },
          { name: "Owner",icon: Home, path: "/dashboard/owner", component: Owner },
          { name: "Tenant", icon: Home, path: "/dashboard/tenant", component: Tenant },
          { name: "Promotion", icon: Home, path: "/dashboard/promotion", component: Promotion },
          { name: "Subdivision",icon: Home, path: "/dashboard/subdivision", component: Subdivision },
        ],
      },
      // { name: "Mes Validations", path: "/validations", icon: Clipboard, component: Dashboard },
      // {
      //   name: "Tiers",
      //   path: "/tiers",
      //   icon: Layers,
      //   component: Tiers,
      //   subOptions: [
      //     { name: "Owner", path: "/tiers/owner", component: Owner },
      //     { name: "Tenant", path: "/tiers/tenant", component: Tenant },
      //     { name: "Client", path: "/tiers/client", component: Principal },
      //   ],
      // },
      // { name: "CRM", path: "/crm", icon: User, component: CRM },
      // { name: "Heritage", path: "/heritage", icon: Building, component: Heritage },
      // { name: "Treasury", path: "/treasury", icon: DollarSign, component: Treasury },
      // { name: "Report", path: "/report", icon: FileText, component: Report },
    ],
  },
  // {
  //   section: "Extra",
  //   options: [
  //     { name: "General Means", path: "/general-means", icon: Clipboard, component: GeneralMeans },
  //     { name: "Ticket", path: "/ticket", icon: Calendar, component: Ticket },
  //     { name: "Resource", path: "/resource", icon: Layers, component: Resource },
  //     { name: "Extra", path: "/extra", icon: Briefcase, component: Dashboard },
  //   ],
  // },
  // {
  //   section: "Security",
  //   options: [{ name: "User", path: "/user", icon: User, component: UserManagement }],
  // },
];
