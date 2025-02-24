import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

function layout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default layout;
