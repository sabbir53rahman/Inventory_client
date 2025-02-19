"use client";
import { useEffect, useState } from "react";
import useAuth from "@/firebase/useAuth";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }) => {
  const { user, isAuthLoading } = useAuth(); 
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (!isAuthLoading && !user) {
      router.push("/login"); 
    } else {
      setLoading(false); 
    }
  }, [user, isAuthLoading, router]);

  if (loading || isAuthLoading) {
    return <div>Loading...</div>; 
  }

  return <>{children}</>; 
};

export default PrivateRoute;
