"use client";

import React from "react";

const PaymentView = () => {
  // Dummy payment data
  const paymentDetails = [
    { id: 1, status: "Success", amount: "₹1500", date: "2024-12-01" },
    { id: 2, status: "Pending", amount: "₹750", date: "2024-11-15" },
    { id: 3, status: "Failed", amount: "₹2000", date: "2024-11-10" },
  ];

  // Uncomment this for backend implementation
  /*
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("/api/get-payments");
        const data = await response.json();
        setPaymentDetails(data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPayments();
  }, []);
  */

  return (
    <div className="min-h-screen bg-blue-50 p-6 mt-20">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Payment Details
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow-md rounded-lg text-sm">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-4 py-2 text-left">Payment ID</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentDetails.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-600">
                  No payments found.
                </td>
              </tr>
            ) : (
              paymentDetails.map((payment, index) => (
                <tr
                  key={payment.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-blue-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2 text-black">{payment.id}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white font-semibold ${
                        payment.status === "Success"
                          ? "bg-green-500"
                          : payment.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-black">{payment.amount}</td>
                  <td className="px-4 py-2 text-black">{payment.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentView;
