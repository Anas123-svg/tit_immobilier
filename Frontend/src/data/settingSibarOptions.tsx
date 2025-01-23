// src/data/settingsSidebarOptions.ts
import {
    Settings,
    MessageSquare,
    Mail,
    FileText,
   
    Divide,
    Book,
    FileSpreadsheet,
    Globe,
    MapPin,
    Wrench,
    DollarSign,
  } from "lucide-react";
  
  // Import the components for the routes
  import GeneralSettings from "@/components/admin-panel/sidebar/profile/Settings/settings/general";
import SmsSettings from "@/components/admin-panel/sidebar/profile/Settings/settings/sms";
import MailsSetting from "@/components/admin-panel/sidebar/profile/Settings/settings/mails";
import TemplatesSettings from "@/components/admin-panel/sidebar/profile/Settings/settings/templates";
import EquipmentSettings from "@/components/admin-panel/sidebar/profile/Settings/other-settings/equipment";
import ThousandthsSettings from "@/components/admin-panel/sidebar/profile/Settings/other-settings/thousandths";
import CategorySettings from "@/components/admin-panel/sidebar/profile/Settings/other-settings/category-of-charges";
  
  
  export const settingsOptions = [
    {
      name: "Settings",
      subOptions: [
        { name: "General", path: "/settings/general", icon: Settings, component: GeneralSettings },
        { name: "SMS", path: "/settings/sms", icon: MessageSquare, component: SmsSettings },
        { name: "Mails", path: "/settings/mails", icon: Mail, component: MailsSetting },
        { name: "Templates", path: "/settings/templates", icon: FileText, component: TemplatesSettings },
      ],
    },
    {
      name: "Other Settings",
      subOptions: [
        { name: "Equipment", path: "/settings/other/equipment", icon: Wrench, component: EquipmentSettings },
        { name: "Thousandths", path: "/settings/other/thousandths", icon: Divide, component: ThousandthsSettings },
    { name: "Category of charges", path: "/settings/other/thousandths", icon: DollarSign, component: CategorySettings },
      ],
    },
    {
      name: "Settings",
      subOptions: [
        { name: "General", path: "/settings/general", icon: Settings, component: GeneralSettings },
        { name: "SMS", path: "/settings/sms", icon: MessageSquare, component: SmsSettings },
        { name: "Mails", path: "/settings/mails", icon: Mail, component: MailsSetting },
        { name: "Templates", path: "/settings/templates", icon: FileText, component: TemplatesSettings },
      ],
    },
    {
      name: "Other Settings",
      subOptions: [
        { name: "Equipment", path: "/settings/other/equipment", icon: Wrench, component: EquipmentSettings },
        { name: "Thousandths", path: "/settings/other/thousandths", icon: Divide, component: ThousandthsSettings },
    { name: "Category of charges", path: "/settings/other/thousandths", icon: DollarSign, component: CategorySettings },
      ],
    },
    {
      name: "Settings",
      subOptions: [
        { name: "General", path: "/settings/general", icon: Settings, component: GeneralSettings },
        { name: "SMS", path: "/settings/sms", icon: MessageSquare, component: SmsSettings },
        { name: "Mails", path: "/settings/mails", icon: Mail, component: MailsSetting },
        { name: "Templates", path: "/settings/templates", icon: FileText, component: TemplatesSettings },
      ],
    },
    {
      name: "Other Settings",
      subOptions: [
        { name: "Equipment", path: "/settings/other/equipment", icon: Wrench, component: EquipmentSettings },
        { name: "Thousandths", path: "/settings/other/thousandths", icon: Divide, component: ThousandthsSettings },
    { name: "Category of charges", path: "/settings/other/thousandths", icon: DollarSign, component: CategorySettings },
      ],
    },
    // {
    //   name: "Accounting",
    //   subOptions: [
    //     { name: "Accounting Journals", path: "/settings/accounting/journals", icon: Book, component: AccountingJournals },
    //     { name: "Accounting Plan Template", path: "/settings/accounting/plan-template", icon: FileSpreadsheet, component: AccountingPlanTemplate },
    //     { name: "Accounting Plan", path: "/settings/accounting/plan", icon: FileSpreadsheet, component: AccountingPlan },
    //   ],
    // },
    // {
    //   name: "Location of Goods",
    //   subOptions: [
    //     { name: "Country", path: "/settings/location/country", icon: Globe, component: CountrySettings },
    //     { name: "Cities", path: "/settings/location/cities", icon: MapPin, component: CitiesSettings },
    //   ],
    // },
  ];
  