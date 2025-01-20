import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TicketSidebar from "./TicketSidebar"; // Assuming you have a sidebar component for tickets
import {ticketOptions} from "@/data/ticketOptions"; // Define the ticket options

// Define the type for the flattened routes
interface FlattenedRoute {
  path: string;
  component: React.ComponentType;
}

// Flatten all sub-options into a single array of routes
const flattenRoutes = (options: typeof ticketOptions): FlattenedRoute[] => {
  return options.flatMap((option) =>
    option.subOptions.map((subOption) => ({
      path: subOption.path,
      component: subOption.component,
    }))
  );
};

const allRoutes = flattenRoutes(ticketOptions);

const TicketConfiguration: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen gap-4 sm:gap-5">

      {/* Left Sidebar */}
      <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 rounded-xl px-2 bg-gray-100">
        <TicketSidebar options={ticketOptions} />
      </div>

      {/* Main Content */}
      <div className="w-full sm:w-5/6 md:w-4/6 shadow-lg bg-white p-4 h-fit sm:p-6 rounded-xl">
        <Routes>
          {/* Dynamically render all ticket settings routes */}
          {allRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path.replace("/ticket", "")} // Match the relative paths
              element={<route.component />}
            />
          ))}

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/ticket/general" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default TicketConfiguration;
