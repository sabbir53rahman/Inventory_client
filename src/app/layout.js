"use client";
import { Provider } from "react-redux";

import "./globals.css";
import store from "@/redux/app/store";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PrivateRoute>{children}</PrivateRoute>
        </Provider>
      </body>
    </html>
  );
}
