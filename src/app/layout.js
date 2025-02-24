"use client";
import { Provider } from "react-redux";
import { useState } from "react";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

import "./globals.css";
import store from "@/redux/app/store";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <html lang="en">
      <body
        className={`${
          darkMode ? "dark bg-gray-900" : "bg-gray-100"
        } transition-all duration-300`}
      >
        <Provider store={store}>
          <PrivateRoute>
            <div className="flex-1">{children}</div>

            {/* Dark Mode Toggle Button */}
            <div className="absolute bottom-16 left-2">
              <button
                onClick={toggleDarkMode}
                className="relative flex items-center w-20 h-10 px-1 rounded-full shadow-xl transition-all duration-300
                  bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg border border-gray-300 dark:border-gray-700"
              >
                {/* Sun Icon (Light Mode) */}
                <BsSunFill
                  className={`absolute left-3 text-yellow-500 text-lg transition-all duration-300 ${
                    darkMode ? "opacity-0 scale-50" : "opacity-100 scale-100"
                  }`}
                />

                {/* Toggle Button */}
                <div
                  className={`absolute top-1 w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-50 dark:from-gray-700 dark:to-gray-900
                  rounded-full shadow-md transition-all duration-300 ${
                    darkMode ? "translate-x-10" : "translate-x-0"
                  }`}
                ></div>

                {/* Moon Icon (Dark Mode) */}
                <BsMoonStarsFill
                  className={`absolute right-3 text-blue-500 text-lg transition-all duration-300 ${
                    darkMode ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`}
                />
              </button>
            </div>
          </PrivateRoute>
        </Provider>
      </body>
    </html>
  );
}
