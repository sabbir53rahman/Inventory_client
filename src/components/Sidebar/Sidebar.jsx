"use client";
import { useState } from "react";
import {
  FaTshirt,
  FaBoxes,
  FaChartLine,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`h-screen flex ${
        isOpen ? "w-64" : "w-24"
      } transition-all duration-300 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-gray-900 dark:to-gray-800`}
    >
      {/* Sidebar Content */}
      <div className="relative flex flex-col w-full p-5 space-y-4">
        {/* Logo & Toggle */}
        <div className={`flex items-center  ${
              isOpen ? "justify-between" : "justify-center"
            }`}>
          <h1
            className={`text-2xl font-bold text-gray-900 dark:text-white transition-all duration-300 ${
              !isOpen && "hidden"
            }`}
          >
            <Link href="/">
            Inventory
            </Link>
          </h1>
          <button
            onClick={toggleSidebar}
            className="text-gray-900 dark:text-white focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-3">
          <SidebarItem
            href="/dashboard/addProduct"
            icon={FaTshirt}
            label="Add Product"
            isOpen={isOpen}
          />
          <SidebarItem
            href="/dashboard/allProducts"
            icon={FaBoxes}
            label="All Product"
            isOpen={isOpen}
          />
          <SidebarItem
            href="/analytics"
            icon={FaChartLine}
            label="Analytics"
            isOpen={isOpen}
          />
          <SidebarItem
            href="/customers"
            icon={FaUsers}
            label="Customers"
            isOpen={isOpen}
          />
          <SidebarItem
            href="/settings"
            icon={FaCog}
            label="Settings"
            isOpen={isOpen}
          />
        </nav>
      </div>
    </div>
  );
};

const SidebarItem = ({ href, icon: Icon, label, isOpen }) => {
    return (
      <Link 
        href={href} 
        className={`group ${
          isOpen ? "items-center" : "items-center justify-center"
        } flex  gap-3 p-3 rounded-lg 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 
                   shadow-md transition-all duration-200 
                   hover:bg-gradient-to-r hover:from-[#6a11cb] hover:to-[#2575fc] 
                   hover:text-white`}
      >
        <Icon className="text-xl transition-all  group-hover:text-white" />
        {isOpen && <span className="text-lg font-semibold transition-all  group-hover:text-white">{label}</span>}
      </Link>
    );
  };
  
  

export default Sidebar;
