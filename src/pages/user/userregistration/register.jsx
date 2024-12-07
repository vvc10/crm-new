"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const RegisterAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_number: "",
    address: "",
    location: "",
  });

  const [otp, setOtp] = useState(""); // For OTP input
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false); // Toggle between forms
  const [otpResent, setOtpResent] = useState(false); // To handle OTP resend status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { email, contact_number } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^[0-9]{10}$/;
    return emailRegex.test(email) && contactRegex.test(contact_number);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(false);
    setOtpResent(false); // Reset resend status

    if (!validateForm()) {
      setMessage("Please enter valid email and contact number.");
      setError(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/v1/auth/register", formData);
      setMessage(response.data.message || "OTP sent to your email/contact number.");
      setShowOtpForm(true); // Show OTP verification form
    } catch (error) {
      setMessage("Error during registration. Please try again.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(false);

    try {
      const response = await axios.post("http://localhost:3001/api/v1/auth/verify-otp", { email: formData.email, otp });
      setMessage(response.data.message || "Registration successful!");
      setShowOtpForm(false); // Reset after successful verification
    } catch (error) {
      setMessage("Invalid OTP. Please try again.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setMessage(null);
    setError(false);

    try {
      const response = await axios.post("http://localhost:3001/api/v1/auth/resend-otp", { email: formData.email });
      setMessage("OTP sent again, please check your email/contact number.");
      setOtpResent(true); // Set OTP resent status
    } catch (error) {
      setMessage("Error resending OTP. Please try again.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#605CFF99] h-[100vh]">
      <div className="w-full max-w-[400px] bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          {showOtpForm ? "Verify OTP" : "Register Your Account"}
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
        {!showOtpForm ? (
          <form onSubmit={handleRegisterSubmit}>
            {["name", "email", "contact_number", "address", "location"].map((field) => (
              <div key={field} className="mb-4">
                <label
                  htmlFor={field}
                  className="block text-lg font-medium text-gray-700"
                >
                  {field.replace("_", " ").charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.replace("_", " ")}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-black"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full h-12 bg-[#605CFF] text-white text-lg font-medium rounded-lg mt-4"
              disabled={loading || !validateForm()}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-lg font-medium text-gray-700"
              >
                Enter OTP
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
              disabled={loading || otp.length !== 6}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
        {showOtpForm && !otpResent && (
          <div className="mt-4 text-center">
            <button
              onClick={handleResendOtp}
              className="text-[#605CFF] font-semibold"
              disabled={loading}
            >
              Resend OTP
            </button>
          </div>
        )}
        {!showOtpForm && (
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?
              <Link className="text-purple-900 font-[600] px-2" href="/user/userlogin/login">
                Login
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterAccount;
