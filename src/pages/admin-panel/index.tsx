import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "@/components/admin-panel/sidebar";
import Navbar from "@/components/admin-panel/navbar";
import { sidebarOptions, SidebarOption } from "@/data/sidebarOptions";

// Function to render routes dynamically, including sub-options
const renderRoutes = (options: SidebarOption[]): JSX.Element[] =>
  options.map((option) => (
    <Route
      key={option.path}
      path={option.path}
      element={<option.component />}
    >
      {/* Recursively render sub-options if available */}
      {option.subOptions && renderRoutes(option.subOptions)}
    </Route>
  ));

const AdminPanel: React.FC = () => {
  return (
    <div className="h-screen min-h-screen">
      {/* Sidebar */}
   
      <Navbar />
      {/* Main Content Area */}
      <div className="flex flex-grow">
        {/* Navbar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-grow p-4 bg-gray-100 overflow-auto min-h-screen">
          <Routes>
            {/* Render all main routes and nested sub-options */}
            {sidebarOptions.map((section) => renderRoutes(section.options))}

            {/* Default Route */}
            <Route
              path="/"
              element={<Navigate to="/admin-panel/dashboard" />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
