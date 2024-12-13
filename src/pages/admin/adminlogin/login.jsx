"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password fields.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/admin/send-otp`, { email, password });
      if (response.status === 200) {
        setSuccess("OTP sent to your email!");
        setIsOtpSent(true);
        setError("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
      setSuccess("");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
  
    if (!email || !password || !otp) {
      setError("Please fill in all fields.");
      return;
    }
  
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/admin/login`, { email, password, otp });
      if (response.status === 200) {
        setSuccess("Login successful!");
        setError("");
  
        // Save the token in localStorage
        localStorage.setItem("adminToken", response.data.token); // Save token to localStorage
  
        setTimeout(() => {
          router.push("/admin/admindashboard/dashboard");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to verify OTP.");
      setSuccess("");
    }
  };
  

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#267B60]">
      <div className="w-full max-w-[400px] bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-center text-[#555555]">Admin Login</h3>
        {error && <p className="text-red-600 text-center my-4">{error}</p>}
        {success && <p className="text-green-600 text-center my-4">{success}</p>}

        <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}>
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
          {isOtpSent && (
            <div className="mb-4">
              <label className="block text-lg text-gray-700">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter OTP"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-[#267B60] text-white rounded-lg hover:bg-[#21824E]"
          >
            {isOtpSent ? "Verify OTP" : "Send OTP"}
          </button>
        </form>

        <p className="text-gray-800 mx-auto w-fit py-2">
          Don&apos;t have an account?{" "}
          <Link className="text-purple-900 font-[600] px-2" href="/admin/adminlogin/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
