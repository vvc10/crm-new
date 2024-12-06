"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Dummy credentials
  const dummyAdminId = "admin";
  const dummyPassword = "password123";

  const handleAdminIdChange = (e) => setAdminId(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the input fields
    if (!adminId || !password) {
      setError("Please enter both Admin ID and Password");
      return;
    }

    // Dummy authentication logic
    if (adminId === dummyAdminId && password === dummyPassword) {
      // Clear error and navigate to the dashboard
      setError("");
      router.push("/admin/admindashboard/dashboard");
    } else {
      setError("Invalid Admin ID or Password");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#267B60]">
      <div className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[549px] bg-white rounded-lg shadow-md p-6 relative">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-300 rounded-t-lg overflow-hidden mb-6">
          <div className="h-full bg-[#267B60]"></div>
        </div>

        {/* Admin Login Form */}
        <h3 className="text-2xl font-bold mt-4 text-[#555555] text-center">Admin Login</h3>
        <h6 className="text-lg text-[#555555] text-center mb-6">Enter Admin Credentials</h6>

        {/* Error message */}
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg text-gray-700" htmlFor="adminId">
              Admin ID
            </label>
            <input
              type="text"
              name="adminId"
              id="adminId"
              value={adminId}
              onChange={handleAdminIdChange}
              placeholder="Enter Admin ID"
              className="w-full px-4 py-2 text-base border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg text-[#555555]" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter Password"
              className="w-full px-4 py-2 text-base border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#267B60] text-white text-lg font-medium rounded-lg mt-4 hover:bg-[#21824E]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
