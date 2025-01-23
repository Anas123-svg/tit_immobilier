import FamilyResourceSettings from "@/components/admin-panel/sidebar/extra/resource/ResourceConfiguration/configuration/FamilyResourceSettings";
import UnderFamilyResourceSettings from "@/components/admin-panel/sidebar/extra/resource/ResourceConfiguration/configuration/UnderFamilyResourceSettings";
import { Settings, Tag } from "lucide-react"; // Importing relevant icons

export const resourceOptions = [
  {
    name: "Configuration",
    subOptions: [
      {
        name: "Family",
        path: "/resource/family",
        icon: Settings, // Icon for Family
        component: FamilyResourceSettings, // Component for this route
      },
      {
        name: "Under Family",
        path: "/resource/under-family",
        icon: Tag, // Icon for Under Family
        component: UnderFamilyResourceSettings, // Component for this route
      },
    ],
  },
];
