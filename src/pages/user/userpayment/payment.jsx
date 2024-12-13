"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import DeclarationPage from "@/components/client/Declaration";
import axios from "axios";

export default function ClientPayment() {
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    transactionId: "",
    amountPaid: "",
  });
  const [isDeclarationAccepted, setIsDeclarationAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [user_id, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize user_id and authToken on component mount
  useEffect(() => {
    const fetchedUserId = localStorage.getItem("user_id");
    const fetchedAuthToken = localStorage.getItem("auth-token");

    if (fetchedUserId) setUserId(fetchedUserId);
    if (fetchedAuthToken) setAuthToken(fetchedAuthToken);
  }, []);

  // Fetch payment history
  useEffect(() => {
    if (user_id && authToken) {
      const fetchPayments = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/payments/user/${user_id}`,
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
          if (response.data) setPaymentHistory(response.data);
        } catch (error) {
          console.error("Error fetching payment history:", error);
        }
      };
      fetchPayments();
    }
  }, [user_id, authToken]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Add this function inside your component
  const handleDeclarationAccept = () => {
    setIsDeclarationAccepted(true);
  };

  // Submit new payment
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user_id || !authToken) {
      alert("User ID and auth token are required.");
      return;
    }

    const newPayment = {
      user_id: Number(user_id),
      name: formData.name,
      amount_paid: parseFloat(formData.amountPaid).toFixed(2),
      transaction_id: formData.transactionId,
      status: "Success",
      payment_date: new Date().toISOString().split("T")[0],
      signature: formData.name,
      terms_accepted: 1,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/payments/`,
        newPayment,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (response.data) {
        const paymentId = response.data.paymentId; // Assuming the response includes the `id`
        console.log(response.data);
        console.log("Created Payment ID:", paymentId);


        setPaymentHistory([response.data, ...paymentHistory]);
        setIsPaymentSuccess(true);
        setIsModalOpen(false);
        setFormData({ name: "", transactionId: "", amountPaid: "" });
      }
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  // Open view modal with payment details
  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setIsViewModalOpen(true);
  };

  // Filter payments by search query
  const filteredPayments = paymentHistory.filter(
    (payment) =>
      payment.name &&
      payment.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const getStatusColor = (status) => {
    switch (status) {
        case "Success":
            return "bg-green-100 text-green-700";
        case "Pending":
            return "bg-yellow-100 text-yellow-700";
        case "Failed":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};


  return (
    <div className="min-h-screen pt-[20%] md:pt-[10%] bg-white px-6 pb-4">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Payment History</h2>
          <button
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
            onClick={() => setIsModalOpen(true)}
          >
            New Payment
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <input
            type="text"
            placeholder="Search Payments"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border text-gray-800 rounded-lg mb-4"
          />
          <table className="min-w-full table-auto border-collapse text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 mx-auto text-left">Name</th>
                <th className="px-4 py-2 mx-auto text-left">Amount</th>
                <th className="px-4 py-2 mx-auto text-left">Date</th>
                <th className="px-4 py-2 mx-auto text-left">Status</th>
                <th className="px-4 py-2 mx-auto text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500">
                    No payments found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b h-[50px]">
                    <td>{payment.name}</td>
                    <td>{payment.amount_paid}</td>
                    <td>{payment.payment_date}</td>
                    <td>
                      <div 
                        className={`col-span-1 ${getStatusColor(payment.status)}  w-fit px-3 py-1 rounded-full text-[14px]`}>
                        {payment.status}
                      </div>

                    </td>
                    <td>
                      <button
                        className="bg-indigo-600 text-gray-100 shadow-md px-4 py-2 my-3 flex justify-center items-center rounded-[10px]"
                        onClick={() => handleViewDetails(payment)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Payment Modal */}


      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white h-[80%] md:h-[80%] overflow-y-scroll text-gray-700 rounded-lg shadow-lg px-6 pt-6 max-w-md mx-auto relative">
            {!isDeclarationAccepted ? (
              <div>
                <DeclarationPage handleConfirmPayment={() => setIsConfirmed(true)} />
                <button
                  onClick={() => {
                    if (isConfirmed) {
                      handleDeclarationAccept();
                    }
                  }}
                  className={`mt-4 w-full bg-green-600 text-white py-2 rounded-lg ${isConfirmed ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                    }`}
                  disabled={!isConfirmed}
                >
                  Accept Declaration
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    htmlFor="transactionId"
                  >
                    Transaction ID
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                    type="text"
                    id="transactionId"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    htmlFor="amountPaid"
                  >
                    Amount Paid
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                    type="number"
                    id="amountPaid"
                    name="amountPaid"
                    value={formData.amountPaid}
                    onChange={handleChange}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg"
                >
                  Submit Payment
                </Button>
              </form>
            )}
            <Button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-700"
            >
              X
            </Button>
          </div>
        </div>
      )}

      {/* View Payment Details Modal */}
      {isViewModalOpen && selectedPayment && (
        <div className="fixed inset-0 bg-black text-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            <p><strong>Name:</strong> {selectedPayment.name}</p>
            <p><strong>Transaction ID:</strong> {selectedPayment.transaction_id}</p>
            <p><strong>Amount Paid:</strong> {selectedPayment.amount_paid}</p>
            <p><strong>Payment Date:</strong> {selectedPayment.payment_date}</p>
            <p><strong>Status:</strong> {selectedPayment.status}</p>
            <button
              className="mt-4 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg"
              onClick={() => setIsViewModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

