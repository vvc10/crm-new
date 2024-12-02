"use client";
import { useState } from "react";


export default function ClientPayment() {
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    zip: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate payment success
    setIsPaymentSuccess(true);
  };

  return (

    <div className="flex mt-[6%] flex-col items-left justify-center w-full h-[100vh] bg-gray-50 text-left px-4">
      <h2 className="text-2xl font-semibold mb-2 px-2 text-gray-800">Secure Payment</h2>
      <p className="text-sm text-gray-500 px-2 mb-6">Your payment is protected by SSL encryption</p>
      
      <div className="rounded-lg px-12 py-12 h-full w-full">

        {!isPaymentSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Card Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Expiry Date, CVV, ZIP */}
            <div className="grid grid-cols-3 gap-4">
              {/* Expiry Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM / YY"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* CVV */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* ZIP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-fit bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Proceed →
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Successful!</h3>
            <button
              onClick={() => setIsPaymentSuccess(false)}
              className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition"
            >
              Make Another Payment
            </button>
          </div>
        )}
      </div>

      <p className="mt-6 text-sm text-gray-500 mx-auto">Secured by Authorize.Net</p>

    </div>
  );
}