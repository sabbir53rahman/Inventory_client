"use client";
import { Provider } from "react-redux";
import { useState } from "react";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

import "./globals.css";
import store from "@/redux/app/store";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import Navbar from "@/components/Navbar/Navbar";

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
            <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <div className="flex-1">{children}</div>
          </PrivateRoute>
        </Provider>
      </body>
    </html>
  );
}
