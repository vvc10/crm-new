"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ClientPayment() {
  const [activeTab, setActiveTab] = useState("history"); // State for tabs
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    zip: "",
  });
  const [isDeclaration, setIsDeclaration] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([
    { id: 1, name: "John Doe", amount: "$100", date: "2024-12-05" },
    { id: 2, name: "Jane Smith", amount: "$250", date: "2024-12-04" },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDeclaration(true);
  };

  const handleConfirmPayment = () => {
    setIsPaymentSuccess(true);
    setIsDeclaration(false);
  };

  const handleViewDetails = (payment) => {
    setSelectedPaymentDetails(payment);
    setIsModalOpen(true);
  };

  const filteredPayments = paymentHistory.filter((payment) =>
    payment.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-[20%] md:pt-[8%] min-h-screen bg-gray-50 px-6 pb-4">
      <div className="space-y-8">
        {/* Tabs */}
      

        {/* Active Tab Content */}
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Payment History Table */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Payment History
            </h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search Payments"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-2 text-center text-sm text-gray-500"
                    >
                      No results found
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment, idx) => (
                    <tr
                      key={payment.id}
                      className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                    >
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {payment.name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {payment.amount}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {payment.date}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        <Button
                          onClick={() => handleViewDetails(payment)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && selectedPaymentDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Payment Details
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Name:</strong> {selectedPaymentDetails.name}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Amount:</strong> {selectedPaymentDetails.amount}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {selectedPaymentDetails.date}
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
