"use client";
import { useEffect, useState } from "react";
import {
  FaTshirt,
  FaBoxes,
  FaChartLine,
  FaUsers,
  FaCog,
} from "react-icons/fa";
import Link from "next/link";

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // `lg` breakpoint
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`h-screen flex flex-col fixed md:relative z-50 ${
        isMobile ? "w-20" : "w-64"
      } transition-all duration-200 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-gray-900 dark:to-gray-800`}
    >
      {/* Sidebar Content */}
      <div className="relative flex flex-col w-full p-5 space-y-4">
        {/* Logo (Hidden on small screens) */}
        {!isMobile && (
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              <Link href="/">Inventory</Link>
            </h1>
          </div>
        )}

        {/* Menu Items */}
        <nav className="flex-1 space-y-3 mt-4">
          <SidebarItem href="/dashboard/addProduct" icon={FaTshirt} label="Add Product" isMobile={isMobile} />
          <SidebarItem href="/dashboard/allProducts" icon={FaBoxes} label="All Product" isMobile={isMobile} />
          <SidebarItem href="/analytics" icon={FaChartLine} label="Analytics" isMobile={isMobile} />
          <SidebarItem href="/dashboard/manageUser" icon={FaUsers} label="Customers" isMobile={isMobile} />
          <SidebarItem href="/settings" icon={FaCog} label="Settings" isMobile={isMobile} />
        </nav>
      </div>
    </div>
  );
};

const SidebarItem = ({ href, icon: Icon, label, isMobile }) => {
  return (
    <Link
      href={href}
      className="group z-0 flex items-center gap-3 p-3 rounded-lg 
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 
                  shadow-md transition-all duration-200 
                  hover:bg-gradient-to-r hover:from-[#6a11cb] hover:to-[#2575fc] 
                  hover:text-white hover:scale-105"
    >
      {/* Always Show Icon */}
      <Icon className="text-xl transition-all duration-200 group-hover:text-white" />

      {/* Show Text Only on Large Screens */}
      {!isMobile && (
        <span className="text-lg font-semibold transition-all duration-200 group-hover:text-white">
          {label}
        </span>
      )}
    </Link>
  );
};

export default Sidebar;
