import React from "react";

const PaymentDetailsModal = ({ payment, onClose }) => {
  if (!payment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-gray-700 rounded-lg shadow-lg px-6 pt-6 pb-4 max-w-md mx-auto relative">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
        <div className="space-y-2">
          <div>
            <span className="font-medium">Name:</span> {payment.name}
          </div>
          <div>
            <span className="font-medium">Amount:</span> {payment.amountPaid}
          </div>
          <div>
            <span className="font-medium">Date:</span> {payment.date}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
