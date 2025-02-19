"use client";
import { Provider } from "react-redux";

import "./globals.css";
import store from "@/redux/app/store";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import { useState } from "react";
export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <html lang="en">
      <body className={`${darkMode && "dark"}`}>
        <Provider store={store}>
          <PrivateRoute>
            {children}
            <button
            onClick={toggleDarkMode}
            className="absolute w-16 h-16 bottom-16 right-16 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black font-semibold">
              {darkMode ? "Light" : "Dark"}
            </button>
          </PrivateRoute>
        </Provider>
      </body>
    </html>
  );
}
