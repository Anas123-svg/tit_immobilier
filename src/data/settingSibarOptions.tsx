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
    BookIcon,
    FileTextIcon,
    BanknoteIcon,
    CalculatorIcon,
    BoxIcon,
    RulerIcon,
    GlobeIcon,
    MapPinIcon,
    MapIcon,
  } from "lucide-react";
  
  // Import the components for the routes
  import GeneralSettings from "@/components/admin-panel/sidebar/profile/Settings/settings/general";
import SmsSettings from "@/components/admin-panel/sidebar/profile/Settings/settings/sms";
import MailsSetting from "@/components/admin-panel/sidebar/profile/Settings/settings/mails";
import TemplatesSettings from "@/components/admin-panel/sidebar/profile/Settings/settings/templates";
import EquipmentSettings from "@/components/admin-panel/sidebar/profile/Settings/other-settings/equipment";
import ThousandthsSettings from "@/components/admin-panel/sidebar/profile/Settings/other-settings/thousandths";
import CategorySettings from "@/components/admin-panel/sidebar/profile/Settings/other-settings/category-of-charges";
import AccountingJournals from "@/components/admin-panel/sidebar/profile/Settings/accounting/AccountingJournals";
import AccountingPlanTemplate from "@/components/admin-panel/sidebar/profile/Settings/accounting/AccountingPlanTemplate";
import AccountingPlan from "@/components/admin-panel/sidebar/profile/Settings/accounting/AccountingPlan";
import AuxiliaryAccountPlans from "@/components/admin-panel/sidebar/profile/Settings/accounting/AuxiliaryAccountPlans";
import DefaultAccounts from "@/components/admin-panel/sidebar/profile/Settings/accounting/DefaultAccounts";
import Treasury from "@/components/admin-panel/sidebar/profile/Settings/accounting/Treasury";
import TaxAccounts from "@/components/admin-panel/sidebar/profile/Settings/accounting/TaxAccounts";
import SocialTaxChargesAccounts from "@/components/admin-panel/sidebar/profile/Settings/accounting/SocialTaxChargesAccounts";
import ExpenseReports from "@/components/admin-panel/sidebar/profile/Settings/accounting/ExpenseReports";
import Products from "@/components/admin-panel/sidebar/profile/Settings/accounting/Products";
import AccountingCodesLength from "@/components/admin-panel/sidebar/profile/Settings/accounting/AccountingCodesLength";
import CountrySettings from "@/components/admin-panel/sidebar/profile/Settings/location-of-goods/CountrySettings";
import CitiesSettings from "@/components/admin-panel/sidebar/profile/Settings/location-of-goods/CitiesSettings";
import CommunesSettings from "@/components/admin-panel/sidebar/profile/Settings/location-of-goods/CommunesSettings";
import NeighborhoodsSettings from "@/components/admin-panel/sidebar/profile/Settings/location-of-goods/NeighborhoodsSettings";
  
  
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
    { name: "Category of charges", path: "/settings/other/categoryOfcharges", icon: DollarSign, component: CategorySettings },
      ],
    },
 
    {
      name: "Accounting",
      subOptions: [
        { name: "Accounting Journals", path: "/settings/accounting/journals", icon: BookIcon, component: AccountingJournals },
        { name: "Accounting Plan Template", path: "/settings/accounting/plan-template", icon: FileSpreadsheet, component: AccountingPlanTemplate },
        { name: "Accounting Plan", path: "/settings/accounting/plan", icon: FileSpreadsheet, component: AccountingPlan },
        { name: "Auxiliary Account Plans", path: "/settings/accounting/auxiliary", icon: FileSpreadsheet, component: AuxiliaryAccountPlans },
        { name: "Default Accounts", path: "/settings/accounting/default-accounts", icon: FileTextIcon, component: DefaultAccounts },
        { name: "Treasury", path: "/settings/accounting/treasury", icon: BanknoteIcon, component: Treasury },
        { name: "Tax Accounts", path: "/settings/accounting/tax-accounts", icon: CalculatorIcon, component: TaxAccounts },
        { name: "Accounts Social/tax charges", path: "/settings/accounting/social-tax-charges", icon: CalculatorIcon, component: SocialTaxChargesAccounts },
        { name: "Expense Reports", path: "/settings/accounting/expense-reports", icon: FileTextIcon, component: ExpenseReports },
        { name: "Products", path: "/settings/accounting/products", icon: BoxIcon, component: Products },
        { name: "Length of Accounting Codes", path: "/settings/accounting/accounting-codes-length", icon: RulerIcon, component: AccountingCodesLength }
      ]
    },
    
    {
      name: "Location of Goods",
      subOptions: [
        { name: "Country", path: "/settings/location/country", icon: GlobeIcon, component: CountrySettings },
        { name: "Cities", path: "/settings/location/cities", icon: MapPinIcon, component: CitiesSettings },
        { name: "Communes", path: "/settings/location/communes", icon: MapIcon, component: CommunesSettings },
        { name: "Neighborhoods", path: "/settings/location/neighborhoods", icon: MapIcon, component: NeighborhoodsSettings }
      ]
    }
    ,
  ];
  