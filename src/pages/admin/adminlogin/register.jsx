"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/admin/register`, { email, password });
      if (response.status === 200) {
        setSuccess("Registration successful! Redirecting to login...");
        setError("");
        setTimeout(() => {
          router.push("/admin/adminlogin/login");  
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register.");
      setSuccess("");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#267B60]">
      <div className="w-full max-w-[400px] bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-center text-[#555555]">Admin Register</h3>
        {error && <p className="text-red-600 text-center my-4">{error}</p>}
        {success && <p className="text-green-600 text-center my-4">{success}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-lg text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#267B60] text-white rounded-lg hover:bg-[#21824E]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
