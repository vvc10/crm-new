"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import DeclarationPage from "@/components/client/Declaration";
import PaymentDetailsModal from "@/pages/user/userpayment/paymentdetails";

export default function ClientPayment({ handleConfirmPayment }) {
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    transactionId: "",
    amountPaid: "",
    expiryDate: "",
    cvv: "",
    zip: "",
  });
  const [isDeclaration, setIsDeclaration] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeclarationAccepted, setIsDeclarationAccepted] = useState(false);
  const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      name: "John Doe",
      amountPaid: "$100",
      transactionId: "TX12345",
      expiryDate: "2024-12-10",
      cvv: "123",
      zip: "110001",
      date: "2024-12-05",
    },
    {
      id: 2,
      name: "Jane Smith",
      amountPaid: "$250",
      transactionId: "TX67890",
      expiryDate: "2024-12-15",
      cvv: "456",
      zip: "110002",
      date: "2024-12-04",
    },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeclarationAccept = () => {
    if (isConfirmed) {
      setIsDeclarationAccepted(true);
    }
  };

  const handleViewDetails = (payment) => {
    setIsModalOpen(false);
    setSelectedPaymentDetails(payment);
  };

  const handleCloseDetailsModal = () => {
    setSelectedPaymentDetails(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newPayment = {
      id: paymentHistory.length + 1,
      name: formData.name,
      amountPaid: `$${formData.amountPaid}`,
      transactionId: formData.transactionId,
      expiryDate: formData.expiryDate,
      cvv: formData.cvv,
      zip: formData.zip,
      date: new Date().toISOString().split("T")[0],
    };
    setPaymentHistory([newPayment, ...paymentHistory]);
    setIsPaymentSuccess(true);
    setIsModalOpen(false);
    setIsDeclarationAccepted(false);
    setFormData({
      name: "",
      transactionId: "",
      amountPaid: "",
      expiryDate: "",
      cvv: "",
      zip: "",
    });
    setIsConfirmed(false);
  };

  const filteredPayments = paymentHistory.filter((payment) =>
    payment.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-[20%] md:pt-[8%] min-h-screen bg-gray-50 px-6 pb-4">
      <div className="space-y-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Payment History
          </h2>
          <button
            className="px-4 py-2 rounded-lg font-medium bg-indigo-600 text-white"
            onClick={() => setIsModalOpen(true)}
          >
            New Payment
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div>
            <div className="mb-4 flex flex-col md:flex-row justify-between">
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
                    Amount Paid
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
                      className={`border-b ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {payment.name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {payment.amountPaid}
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg px-6 pt-6 h-[80%] md:h-[90%] max-w-md mx-auto overflow-y-auto relative">
            {!isDeclarationAccepted ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Declaration
                </h3>
                <DeclarationPage
                  handleConfirmPayment={() => setIsConfirmed(true)}
                />
                <div className="sticky bottom-0 bg-white py-2">
                  <button
                    onClick={handleDeclarationAccept}
                    className={`mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:ring-4 focus:ring-green-500 ${
                      isConfirmed ? "" : "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!isConfirmed}
                  >
                    Accept Declaration
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Payment Details
                </h3>
                <div className="space-y-4">
                  {["name", "amountPaid", "transactionId", "date" ].map((field) => (
                    <input
                      key={field}
                      type="text"
                      name={field}
                      placeholder={field.split(/(?=[A-Z])/).join(" ")}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg"
                    />
                  ))}

                  <div className="sticky bottom-0 bg-white py-2 flex justify-between items-center">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="w-[48%] bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:ring-4 focus:ring-gray-500"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="w-[48%] bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500"
                    >
                      Submit Payment
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {selectedPaymentDetails && (
        <PaymentDetailsModal
          payment={selectedPaymentDetails}
          onClose={handleCloseDetailsModal}
        />
      )}
    </div>
  );
}
