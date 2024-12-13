"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const VerifyOTP = () => {
  const router = useRouter();
  const { email } = router.query; // Get email from query parameters
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(false);

    try {
      const response = await axios.post("http://localhost:3001/api/v1/auth/verify-otp", {
        email,
        otp,
      });
      setMessage(response.data.message); // Success message
      if (response.data.success) {
        router.push("/user/userlogin/login"); // Redirect to login page
      }
    } catch (error) {
      setMessage("Invalid OTP. Please try again.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#605CFF99] h-[100vh]">
      <div className="w-full max-w-[400px] bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Verify Your OTP
        </h2>
        {message && (
          <div
            className={`text-center mb-4 py-2 px-4 rounded-lg ${
              error ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-lg font-medium text-gray-700"
            >
              OTP
            </label>
            <input
              type="text"
              name="otp"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-[#605CFF] text-white text-lg font-medium rounded-lg mt-4"
            disabled={loading || otp.length === 0}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Didn&apos;t receive an OTP?
            <button
              className="text-purple-900 font-[600] px-2"
              onClick={async () => {
                try {
                  await axios.post("http://localhost:3001/api/v1/auth/resend-otp", { email });
                  setMessage("OTP resent to your email.");
                  setError(false);
                } catch {
                  setMessage("Error resending OTP. Please try again.");
                  setError(true);
                }
              }}
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
