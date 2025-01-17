import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SettingsSidebar from "./SettingsSidebar";
import { settingsOptions } from "@/data/settingSibarOptions";
import GeneralSettings from "./settings/general";

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

const SettingsComponent: React.FC = () => {
  return (
    <div className="flex min-h-screen gap-5">
      {/* Left Sidebar */}
      <div className="w-3/12 rounded-xl px-2 bg-gray-100">
        <SettingsSidebar options={settingsOptions} />
      </div>

      {/* Main Content */}
      <div className="w-5/6 shadow-lg bg-white p-6 rounded-xl">
      <Routes>
  {/* Dynamically render all settings routes */}
  {allRoutes.map((route) => (
    <Route
      key={route.path}
      path={route.path.replace("/settings", "")} // Match the relative paths
      element={<route.component />}
    />
  ))}

  {/* Default Redirect */}
  <Route path="*" element={<Navigate to="/settings/general" replace />} />
</Routes>
      </div>
    </div>
  );
};

export default SettingsComponent;
