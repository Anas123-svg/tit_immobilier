import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "@/components/admin-panel/sidebar";
import Navbar from "@/components/admin-panel/navbar";
import { sidebarOptions, SidebarOption } from "@/data/sidebarOptions";

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
      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-grow p-4 bg-gray-100 overflow-auto min-h-screen">
          <Routes>
            {/* Render all routes */}
            {allRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/admin-panel/dashboard" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
