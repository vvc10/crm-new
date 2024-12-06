"use client";
import React, { useState } from "react";
import axios from "axios"; // For backend communication
import Link from "next/link"; // Import Link for navigation

const RegisterAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/register-account", formData);
      console.log("Account registered successfully:", response.data);
      // Handle success actions (e.g., show a success message)
    } catch (error) {
      console.error("Error registering account:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#605CFF99] h-[100vh]">
      <div className="w-full max-w-[400px] bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Register Your Account</h2>
        <form onSubmit={handleSubmit}>
          {["name", "email", "contact", "address", "location"].map((field) => (
            <div key={field} className="mb-4">
              <label
                htmlFor={field}
                className="block text-lg font-medium text-gray-700"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-black"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full h-12 bg-[#605CFF] text-white text-lg font-medium rounded-lg mt-4"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?
            <Link className="text-purple-900 font-[600] px-2" href="/user/userlogin/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterAccount;