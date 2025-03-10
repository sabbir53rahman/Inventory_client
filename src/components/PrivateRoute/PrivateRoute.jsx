"use client";
import { useEffect, useState } from "react";
import useAuth from "@/firebase/useAuth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const {user, isAuthLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  //const user = useSelector((state) => state.users.user)
  console.log(user)

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [user, isAuthLoading, router]);

  if (loading || isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-l-blue-500 dark:border-t-cyan-400 dark:border-l-cyan-400 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg font-semibold">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
