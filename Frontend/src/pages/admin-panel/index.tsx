import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "@/components/admin-panel/sidebar";
import Navbar from "@/components/admin-panel/navbar";
import { sidebarOptions, SidebarOption } from "@/data/sidebarOptions";
import SettingsComponent from "@/components/admin-panel/sidebar/profile/Settings";
import TicketConfiguration from "@/components/admin-panel/sidebar/extra/ticket/TicketConfiguratoin";
import ResourceConfiguration from "@/components/admin-panel/sidebar/extra/resource/ResourceConfiguration";
import SendMailSmsSettings from "@/components/admin-panel/sidebar/extra/extra/SendMailSmsSettings";
import TenantDetailPage from "@/components/admin-panel/sidebar/property-management/tiers/tenant/sub-page/tenant-detail-page";
import OwnerDetailPage from "@/components/admin-panel/sidebar/property-management/tiers/owner/sub-page/owner-detail-page";
import CRMSettingsComponent from "@/components/admin-panel/sidebar/property-management/crm/Settings";
import ClientDetailPage from "@/components/admin-panel/sidebar/property-management/tiers/client/sub-page/client-detail-page";
import {PropertyDetailPage} from "@/components/admin-panel/sidebar/property-management/tiers/owner/sub-page/pages/property-detail-page";

// Recursive function to flatten all routes, including sub-options
const flattenRoutes = (options: SidebarOption[]): SidebarOption[] => {
  const flatRoutes: SidebarOption[] = [];

  options.forEach((option) => {
    flatRoutes.push(option); // Add the main option

    // If sub-options exist, recursively flatten them
    if (option.subOptions) {
      flatRoutes.push(...flattenRoutes(option.subOptions));
    }
  });

  return flatRoutes;
};

const AdminPanel: React.FC = () => {
  // Flatten all sidebar routes for use in <Routes>
  const allRoutes = flattenRoutes(sidebarOptions.flatMap((section) => section.options));

  return (
    <div className="h-screen min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex flex-grow ">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-grow p-4 bg-gray-100 overflow-auto min-h-screen">
          <Routes>
            {/* Nested Settings Routes */}
            <Route path="/tier/tenants/detail-page/:id" element={<TenantDetailPage/>} />
            <Route path="/tier/owners/detail-page/:id" element={<OwnerDetailPage/>} />
            <Route path="/tier/clients/detail-page/:id" element={<ClientDetailPage/>} />
            <Route path="/property" element={<PropertyDetailPage/>} />

            <Route path="/settings/*" element={<SettingsComponent />} />
            <Route path="/crm/setting/*" element={<CRMSettingsComponent />} />
            <Route path="/ticket/*" element={<TicketConfiguration />} />
            <Route path="/resource/*" element={<ResourceConfiguration />} />
            <Route path="/extra/*" element={<SendMailSmsSettings />} />
            {/* Render all routes */}
            {allRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/portfolio" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;