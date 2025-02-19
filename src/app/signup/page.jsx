"use client";
import useAuth from "@/firebase/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const SignUp = () => {
  const { createUser } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(formData.name, formData.email, formData.password);
    console.log("User signed up successfully!");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 transition-all duration-300">
      <div className="bg-white/50 dark:bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl dark:shadow-lg max-w-md w-full border border-gray-200 dark:border-white/20">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center bg-gray-200/60 dark:bg-white/20 p-3 rounded-lg">
            <FaUser className="text-gray-600 dark:text-gray-400 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none"
              required
            />
          </div>
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
            Sign Up
          </button>
        </form>
        <p className="text-gray-700 dark:text-gray-300 text-center mt-4">
          Already have an account? {" "}
          <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
