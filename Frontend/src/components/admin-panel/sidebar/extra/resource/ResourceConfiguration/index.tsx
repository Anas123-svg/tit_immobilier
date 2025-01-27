import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ResourceSidebar from "./ResourceSidebar"; // Assuming you have a sidebar component for resources
import { resourceOptions } from "@/data/resourceOptions"; // Define the resource options

// Define the type for the flattened routes
interface FlattenedRoute {
  path: string;
  component: React.ComponentType;
}

// Flatten all sub-options into a single array of routes
const flattenRoutes = (options: typeof resourceOptions): FlattenedRoute[] => {
  return options.flatMap((option) =>
    option.subOptions.map((subOption) => ({
      path: subOption.path,
      component: subOption.component,
    }))
  );
};

const allRoutes = flattenRoutes(resourceOptions);

const ResourceConfiguration: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen gap-4 sm:gap-5">

      {/* Left Sidebar */}
      <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 rounded-xl px-2 bg-gray-100">
        <ResourceSidebar options={resourceOptions} />
      </div>

      {/* Main Content */}
      <div className="w-full sm:w-5/6 md:w-4/6 shadow-lg bg-white p-4 h-fit sm:p-6 rounded-xl">
        <Routes>
          {/* Dynamically render all resource settings routes */}
          {allRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path.replace("/resource", "")} // Match the relative paths
              element={<route.component />} // Render the component for each route
            />
          ))}

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/resource/family" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default ResourceConfiguration;
