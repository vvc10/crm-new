"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

const ClientLogin = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      setError("Please fill in both email and OTP.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      // Log the response data
      console.log("Login response:", data);

      if (response.ok && data.message === "Login successful.") {
        const { user_id, token, name } = data;  // Extracting the necessary fields

        localStorage.setItem("auth-token", token);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("user_id", user_id);

        console.log("Token saved (login):", localStorage.getItem("auth-token"));
        console.log("user id :::", user_id);

        router.push({
          pathname: "/dashboard",
          query: { name, email, user_id: user_id },
        });

      } else if (response.status === 401) {
        setError("Invalid OTP. Please try again.");
      } else if (response.status === 404) {
        setError("User not found. Please check your email.");
      } else {
        setError("An error occurred during login.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Failed to login. Please try again.");
    }
  };

  const handleSendOtp = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/auth/generate-login-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
  
      // Check if the response is valid JSON
      let data = {};
      try {
        data = await response.json();
      } catch (err) {
        // If the response is not valid JSON, log it as a string message
        data = { message: response.statusText };
      }
  
      if (response.ok && data.message === "OTP sent successfully to your email.") {
        setStep(2); // Move to step 2 after OTP is sent
      } else {
        // Handle the error message, ensuring it's from the response body
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError("An error occurred while sending OTP.");
    }
  };
  
  return (
    <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center bg-[#605CFF99]">
      <h2 className="font-[700] text-[24px]">Welcome to Pixelpath CRM Portal!</h2>
      <div className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[549px] bg-white rounded-lg shadow-md p-6 relative">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-300 rounded-t-lg overflow-hidden mb-6">
          <div className={`h-full ${step === 1 ? "w-1/2" : "w-full"} bg-[#605CFF]`}></div>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <>
            <h3 className="text-2xl font-bold mt-4 text-[#555555] text-center">Client Login</h3>
            <h6 className="text-lg text-[#555555] text-center mb-6">Step 1/2</h6>
            <form>
              <div className="mb-4">
                <label className="block text-lg text-[#555555]" htmlFor="email">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-base border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full h-12 bg-[#605CFF] text-white text-lg font-medium rounded-lg mt-4 hover:bg-indigo-700"
              >
                Send OTP
              </button>
              <p className="text-gray-800 mx-auto w-fit py-2">
                Don&apos;t have an account?{" "}
                <Link className="text-purple-900 font-[600] px-2" href="/user/userregistration/register">
                  Register
                </Link>
              </p>
            </form>
            {error && <div className="text-red-600 text-center mt-4">{error}</div>}
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="text-2xl font-bold mt-4 text-[#555555] text-center">Client Login</h3>
            <h6 className="text-lg text-[#555555] text-center mb-6">Step 2/2</h6>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-lg text-[#555555]" htmlFor="otp">
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-2 text-base border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full h-12 bg-[#605CFF] text-white text-lg font-medium rounded-lg mt-4 hover:bg-indigo-700"
              >
                Submit
              </button>
            </form>
            {error && <div className="text-red-600 text-center mt-4">{error}</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default ClientLogin;
