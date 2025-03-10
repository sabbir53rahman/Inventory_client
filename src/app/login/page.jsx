"use client";
import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import useAuth from "@/firebase/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { signIn } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(formData.email, formData.password);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="relative bg-white/30 dark:bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl dark:shadow-md max-w-md w-full border border-gray-300 dark:border-white/20">
        
        {/* Glowing Border Effect - Matches SignUp Page */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 blur-lg pointer-events-none"></div>

        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-6">
          Welcome Back
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="flex items-center bg-white/70 dark:bg-white/20 p-3 rounded-xl shadow-sm dark:shadow-lg transition-all duration-300">
            <FaEnvelope className="text-gray-600 dark:text-gray-300 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center bg-white/70 dark:bg-white/20 p-3 rounded-xl shadow-sm dark:shadow-lg transition-all duration-300">
            <FaLock className="text-gray-600 dark:text-gray-300 mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-gray-700 dark:text-gray-300 text-center mt-5">
          Dont have an account?{" "}
          <Link href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
