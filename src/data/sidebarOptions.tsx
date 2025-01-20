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
  TicketIcon,
  MapPin,
  Mail,
} from "lucide-react";

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
import CRM from "@/components/admin-panel/sidebar/property-management/crm/SalesProspect";
import Report from "@/components/admin-panel/sidebar/property-management/report/client-report";
import GeneralMeans from "@/components/admin-panel/sidebar/extra/general-means";
import Ticket from "@/components/admin-panel/sidebar/extra/ticket/TicketConfiguratoin";
import Extra from "@/components/admin-panel/sidebar/extra/extra";
import OwnerTier from "@/components/admin-panel/sidebar/property-management/tiers/owner";
import TenantTier from "@/components/admin-panel/sidebar/property-management/tiers/tenant";
import SubdivisionDashboard from "@/components/admin-panel/sidebar/property-management/dashboard/Subdivision";
import ClientTier from "@/components/admin-panel/sidebar/property-management/tiers/client";
import SalesProspect from "@/components/admin-panel/sidebar/property-management/crm/SalesProspect";
import LocationProspect from "@/components/admin-panel/sidebar/property-management/crm/LocationProspect";
import PromotionHeritage from "@/components/admin-panel/sidebar/property-management/heritage/promotion";
import SubdivisionHeritage from "@/components/admin-panel/sidebar/property-management/heritage/subdivison";
import TreasuryComponent from "@/components/admin-panel/sidebar/property-management/treasury/treasury";
import TreasuryRequests from "@/components/admin-panel/sidebar/property-management/treasury/requests";
import OwnerReport from "@/components/admin-panel/sidebar/property-management/report/owner-report";
import TenantReport from "@/components/admin-panel/sidebar/property-management/report/tenant-report";
import ClientReport from "@/components/admin-panel/sidebar/property-management/report/client-report";
import TicketDashboard from "@/components/admin-panel/sidebar/extra/ticket/TicketDashboard";
import TicketList from "@/components/admin-panel/sidebar/extra/ticket/TicketList";

import UserManagement from "@/components/admin-panel/sidebar/security/UserManagement";
import ResourceDashboard from "@/components/admin-panel/sidebar/extra/resource/ResourceDashboard";
import ResourceList from "@/components/admin-panel/sidebar/extra/resource/ResourceList";
import ResourceConfiguration from "@/components/admin-panel/sidebar/extra/resource/ResourceConfiguration";
import TicketConfiguration from "@/components/admin-panel/sidebar/extra/ticket/TicketConfiguratoin";
import GeolocationGoods from "@/components/admin-panel/sidebar/extra/extra/GeolocationGoods";
import CalendarSettings from "@/components/admin-panel/sidebar/extra/extra/CalendarSettings";
import SendMailSmsSettings from "@/components/admin-panel/sidebar/extra/extra/SendMailSmsSettings";

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
        path: "/logout",
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
    
      {
        name: "Heritage",
        path: "/heritage",
        icon: Building,
        component: PromotionHeritage,
        subOptions: [
          {
            name: "Promotion",
            path: "/heritage/promotion",
            component: PromotionHeritage
          },
          {
            name: "Subdivision",
            path: "/heritage/subdivision",
            component: SubdivisionHeritage
          }
        ]
      },
      {
        name: "Treasury",
        path: "/treasury",
        icon: DollarSign,
        component: TreasuryComponent,
        subOptions: [
          {
            name: "Treasury",
            path: "/treasury/treasury",
            component: TreasuryComponent, // Replace with the actual component for Treasury
          },
          {
            name: "Requests",
            path: "/treasury/requests",
            component: TreasuryRequests, // Replace with the actual component for Requests
          },
        ],
      },
      
      {
        name: "Report",
        path: "/report",
        icon: FileText, // Use the correct icon reference
        component: Report, // The main Report component
        subOptions: [
          {
            name: "Owner",
            path: "/report/owner",
            component: OwnerReport, // Component to handle Owner reports
          },
          {
            name: "Tenant",
            path: "/report/tenant",
            component: TenantReport, // Component to handle Tenant reports
          },
          {
            name: "Client",
            path: "/report/client",
            component: ClientReport, // Component to handle Client reports
          },
        ],
      }
      ,
    ],
  },
  {
    section: "Extra",
    options: [
      { name: "General Means", path: "/general-means", icon: Clipboard, component: GeneralMeans },
      {
        name: "Ticket",
        path: "/ticket",
        icon: TicketIcon,
        component: Ticket,
        subOptions: [
          {
            name: "Dashboard",
            path: "/ticket/dashboard",
            component: TicketDashboard,
          },
          {
            name: "Ticket",
            path: "/ticket/ticket",
            component: TicketList,
          },
          {
            name: "Configuration",
            path: "/ticket/configuration",
            component: TicketConfiguration,
          }
        ],
      }
      ,
      {
        name: "Resource",
        path: "/resource",
        icon: Layers,
        component: ResourceDashboard, // Main dashboard component for Resource
        subOptions: [
          {
            name: "Dashboard",
            path: "/resource/dashboard",
            component: ResourceDashboard, // Component for the Dashboard section
          },
          {
            name: "Resource",
            path: "/resource/resource",
            component: ResourceList, // Component for the Resource section
          },
          {
            name: "Configuration",
            path: "/resource/configuration",
            component: ResourceConfiguration, // Component for the Configuration section
          },
        ],
      },
      {
        name: "Extra",
        path: "/extra",
        icon: MapPin, // Icon for Extra section
        component: Extra, // Component for the main Extra section
        subOptions: [
          {
            name: "Geolocation of goods",
            path: "/extra/geolocation",
            icon: MapPin, // Icon for Geolocation of goods
            component: GeolocationGoods, // Component for this sub-option
          },
          {
            name: "Calendar",
            path: "/extra/calendar",
            icon: Calendar, // Icon for Calendar
            component: CalendarSettings, // Component for this sub-option
          },
          {
            name: "Send Mail/SMS",
            path: "/extra/send-mail",
            icon: Mail, // Icon for Send Mail/SMS
            component: SendMailSmsSettings, // Component for this sub-option
          },
        ],
      },
    ],
  },
  {
    section: "Security",
    options: [{ name: "User", path: "/user", icon: User, component: UserManagement }],
  },
];
