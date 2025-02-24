import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

function layout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />
      <div className="flex-1 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">{children}</div>
    </div>
  );
}

export default layout;
