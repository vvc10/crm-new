"use client";
import AdminNavbar from "@/components/navBar/AdminNavBar";
import NavBar from "@/components/navBar/Navbar";
import React, { useState } from "react";

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminIdChange = (e) => setAdminId(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation (e.g., check if fields are not empty)
    if (!adminId || !password) {
      setError("Please enter both Admin ID and Password");
      return;
    }

    try {
      // Send POST request to backend for authentication
      const response = await fetch("http://your-backend-url/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminId, password }),
      });

      // Handle response
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Redirect to the dashboard or another page on successful login
          console.log("Login successful", data);
          // Example: window.location.href = "/admin/dashboard";
        } else {
          setError(data.message || "Invalid credentials");
        }
      } else {
        setError("Error occurred while logging in");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError("Failed to connect to the backend");
    }
  };

  return (
    <>
      <AdminNavbar />
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
            <label className="block text-lg text-[#555555]" htmlFor="adminId">Admin ID</label>
            <input
              type="text"
              name="adminId"
              id="adminId"
              value={adminId}
              onChange={handleAdminIdChange}
              placeholder="Enter Admin ID"
              className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-lg text-[#555555]" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter Password"
              className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
    </>
   
  );
};

export default AdminLogin;
