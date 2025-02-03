import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SettingsSidebar from "./SettingsSidebar";
import { settingsOptions } from "@/data/crmsSettingSibarOptions";

// Define the type for the flattened routes
interface FlattenedRoute {
  path: string;
  component: React.ComponentType;
}

// Flatten all sub-options into a single array of routes
const flattenRoutes = (options: typeof settingsOptions): FlattenedRoute[] => {
  return options.flatMap((option) =>
    option.subOptions.map((subOption) => ({
      path: subOption.path,
      component: subOption.component,
    }))
  );
};

const allRoutes = flattenRoutes(settingsOptions);

const CRMSettingsComponent: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen gap-4 sm:gap-5">
      {/* Left Sidebar */}
      <div className="w-full sm:w-6/12 md:w-3/12 lg:w-3/12 rounded-xl px-2 bg-gray-100">
        <SettingsSidebar options={settingsOptions} />
      </div>

      {/* Main Content */}
      <div className=" md:6/12 sm:w-full bg-white h-fit shadow-lg  p-4 sm:p-6 rounded-xl">
 
      <Routes>
  {/* Dynamically render all settings routes */}
  {allRoutes.map((route) => (
    <Route
      key={route.path}
      path={route.path.replace("/crm/setting", "")} // Match the relative paths
      element={<route.component />}
    />
  ))}

  {/* Default Redirect */}
  <Route path="*" element={<Navigate to="/crm/setting/general" replace />} />
</Routes>
      </div>
    </div>
  );
};

export default CRMSettingsComponent;
