import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

function Layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar - Hidden on small screens unless toggled */}
      <div className=" dark:bg-gray-900 shadow-md md:block hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-300 p-4">
        {children}
      </div>
    </div>
  );
}

export default Layout;
