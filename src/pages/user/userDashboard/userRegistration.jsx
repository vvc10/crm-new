"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";  // Import axios for backend communication

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    location: "",
    queryType: "",
    visitDate: "",
    queryDescription: "",
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false); // To manage form submission loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading state when submitting

    try {
      // Send data to the backend (replace with your backend endpoint)
      const response = await axios.post("/api/submit", formData);
      console.log("Form submitted successfully:", response.data);
      // Reset form or handle success (you can redirect, show success message, etc.)
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);  // Reset loading state after submission
    }
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#605CFF99]">
      <div className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[549px] bg-white rounded-lg shadow-md p-6 relative">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-300 rounded-t-lg overflow-hidden mb-6">
          <div
            className={`h-full ${step === 1
                ? "w-1/3"
                : step === 2
                  ? "w-2/3"
                  : "w-full"
              } bg-[#605CFF]`}
          ></div>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <>
            <h3 className="text-2xl font-bold mt-4 text-[#555555] text-center">
              Client Registration
            </h3>
            <h6 className="text-lg text-[#555555] text-center mb-6">Step 1/3</h6>
            <h5 className="text-xl font-semibold mb-8 text-[#555555] text-center">
              Personal Details
            </h5>
            <form>
              {["name", "email", "contact", "address", "location"].map(
                (field) => (
                  <div key={field} className="mb-4">
                    <label
                      className="block text-lg text-[#555555]"
                      htmlFor={field}
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
                      className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )
              )}
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full h-12 bg-[#605CFF] text-white text-lg font-medium rounded-lg mt-4 hover:bg-indigo-700"
              >
                Next
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="text-2xl font-bold mt-4 text-[#555555] text-center">
              Client Registration
            </h3>
            <h6 className="text-lg text-[#555555] text-center mb-6">Step 2/3</h6>
            <h5 className="text-xl font-semibold mb-8 text-[#555555] text-center">
              Query Details
            </h5>
            <form>
              {/* Query Description */}
              <div className="mb-4">
                <label className="block text-lg text-[#555555]" htmlFor="queryDescription">
                  Query Description
                </label>
                <textarea
                  name="queryDescription"
                  id="queryDescription"
                  rows="4"
                  value={formData.queryDescription}
                  onChange={handleChange}
                  placeholder="Describe your query in detail"
                  className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              {/* Query Type */}
              <div className="mb-4">
                <label className="block text-lg text-[#555555]" htmlFor="queryType">
                  Select Query Type
                </label>
                <select
                  name="queryType"
                  id="queryType"
                  className="w-full h-12 px-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.queryType}
                  onChange={handleChange}
                >
                  <option value="">Select Query</option>
                  <option value="General">General Query</option>
                  <option value="Technical">Technical Issue</option>
                  <option value="Support">Support Query</option>
                </select>
              </div>

              {/* Date to Visit on Site */}
              <div className="mb-4">
                <label className="block text-lg text-[#555555]" htmlFor="visitDate">
                  Date to Visit Site
                </label>
                <input
                  type="date"
                  name="visitDate"
                  id="visitDate"
                  className="w-full h-12 px-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.visitDate}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="text-[#605CFF] font-medium py-2 px-4 border border-[#605CFF] rounded-lg hover:bg-[#605CFF] hover:text-white transition-all duration-200"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-[48%] h-12 bg-[#605CFF] text-white text-lg font-medium rounded-lg mt-4 hover:bg-indigo-700"
                >
                  Next
                </button>
              </div>

            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="text-2xl font-bold mt-4 text-[#555555] text-center">
              Review & Submit
            </h3>
            <h6 className="text-lg text-[#555555] text-center mb-6">Step 3/3</h6>
            <div className="space-y-4 mb-6">
              {/* Displaying All the User Inputs for Review */}
              <div>
                <h5 className="text-xl font-semibold text-[#555555]">Personal Details</h5>
                <p>Name: {formData.name}</p>
                <p>Email: {formData.email}</p>
                <p>Contact: {formData.contact}</p>
                <p>Address: {formData.address}</p>
                <p>Location: {formData.location}</p>
              </div>

              <div>
                <h5 className="text-xl font-semibold text-[#555555]">Query Details</h5>
                <p>Query Description: {formData.queryDescription}</p>
                <p>Query Type: {formData.queryType}</p>
                <p>Visit Date: {formData.visitDate}</p>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full h-12 bg-[#605CFF] text-white text-lg font-medium rounded-lg mt-4 hover:bg-indigo-700"
              disabled={loading}  // Disable button while submitting
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserRegistration;
