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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 transition-all duration-300">
      <div className="bg-white/50 dark:bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl dark:shadow-lg max-w-md w-full border border-gray-200 dark:border-white/20">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center bg-gray-200/60 dark:bg-white/20 p-3 rounded-lg">
            <FaEnvelope className="text-gray-600 dark:text-gray-400 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center bg-gray-200/60 dark:bg-white/20 p-3 rounded-lg">
            <FaLock className="text-gray-600 dark:text-gray-400 mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition-all duration-300 shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="text-gray-700 dark:text-gray-300 text-center mt-4">
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
