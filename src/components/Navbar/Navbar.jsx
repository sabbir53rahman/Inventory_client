"use client";
import { useState } from "react";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { HiOutlineMenu, HiX } from "react-icons/hi"; // Hamburger menu icons
import { useSelector } from "react-redux";
import Link from "next/link";
import useAuth from "@/firebase/useAuth";

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useAuth();
  //const user = useSelector((state) => state.users.user);

  return (
    <nav className="w-full px-6 py-4 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-gray-900 dark:to-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Brand */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          MyBrand
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            About
          </Link>
          <Link
            href="/services"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            Contact
          </Link>
        </div>

        {/* Right Section (Dark Mode + Auth Buttons) */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="relative flex items-center justify-between w-[70px] h-[35px] rounded-full bg-gray-200 dark:bg-gray-800 transition-all duration-300"
          >
            {/* Sun Icon */}
            <BsSunFill
              className={`absolute z-10 left-1 text-yellow-500 text-lg transition-all duration-300 ${
                darkMode ? "opacity-0 scale-50" : "opacity-100 scale-100"
              }`}
            />
            {/* Toggle Circle */}
            <div
              className={`absolute z-0 top-1 left-1 w-[27px] h-[27px] bg-white dark:bg-gray-600 rounded-full shadow-md transition-all duration-300 ${
                darkMode ? "translate-x-[35px]" : "translate-x-0"
              }`}
            ></div>
            {/* Moon Icon */}
            <BsMoonStarsFill
              className={`absolute right-1 text-blue-500 text-lg transition-all duration-300 ${
                darkMode ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            />
          </button>

          {/* Auth Button */}
          {user ? (
            <button
              onClick={logOut}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all">
                Login
              </button>
            </Link>
          )}

          {/* Hamburger Menu Button (Mobile) */}
          <button
            className="md:hidden text-gray-900 dark:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <HiX className="w-8 h-8" />
            ) : (
              <HiOutlineMenu className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
          <Link
            href="/"
            className="text-gray-900 dark:text-white hover:text-blue-500"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-900 dark:text-white hover:text-blue-500"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/services"
            className="text-gray-900 dark:text-white hover:text-blue-500"
            onClick={() => setMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="text-gray-900 dark:text-white hover:text-blue-500"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
