"use client";
import { useState } from "react";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = ({ toggleDarkMode, darkMode }) => {
  // Get the current user from auth state
  const { user, isLoading, error } = useSelector((state) => state.user || {});
  console.log(user)

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md">
      {/* Navbar Left (Links) */}
      <div className="flex space-x-4">
        <Link href="/" className="text-gray-900 dark:text-white">
          Home
        </Link>
        <Link href="/about" className="text-gray-900 dark:text-white">
          About
        </Link>
        <Link href="/services" className="text-gray-900 dark:text-white">
          Services
        </Link>
        <Link href="/contact" className="text-gray-900 dark:text-white">
          Contact
        </Link>
      </div>

      {/* Dark/Light Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="relative flex items-center justify-center w-12 h-8 rounded-full shadow-xl transition-all duration-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg border border-gray-300 dark:border-gray-700"
      >
        {/* Sun Icon (Light Mode) */}
        <BsSunFill
          className={`absolute left-2 text-yellow-500 text-lg transition-all duration-300 ${
            darkMode ? "opacity-0 scale-50" : "opacity-100 scale-100"
          }`}
        />

        {/* Toggle Button */}
        <div
          className={`absolute top-1 w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-50 dark:from-gray-700 dark:to-gray-900 rounded-full shadow-md transition-all duration-300 ${
            darkMode ? "translate-x-4" : "translate-x-0"
          }`}
        ></div>

        {/* Moon Icon (Dark Mode) */}
        <BsMoonStarsFill
          className={`absolute right-2 text-blue-500 text-lg transition-all duration-300 ${
            darkMode ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        />
      </button>

      {/* Login/Logout Button */}
      <div>
        {user ? (
          <Link href="/logout">
            <button className="px-4 py-2 bg-red-600 text-white rounded-md">
              Logout
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
