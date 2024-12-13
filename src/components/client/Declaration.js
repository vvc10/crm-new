import { useState } from "react";

const DeclarationPage = ({ handleConfirmPayment }) => {
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPaymentDetailsChecked, setIsPaymentDetailsChecked] = useState(false);

  const isConfirmed = isTermsChecked && isPaymentDetailsChecked;
  const [signature, setSignature] = useState("");  // Add state for the signature

  const handleSignatureChange = (e) => {
    setSignature(e.target.value);
  };
  return (
    <div className="declaration-page space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Declaration</h3>
      <p className="mt-4">
          <strong>Terms & Conditions:</strong>
          <br />
          By submitting this payment, you agree to the following terms and conditions:
          <br /><br />

          <strong>Service Confirmation:</strong><br />
          You are requesting the services offered by Support Service, including but not limited to technician visits, service cancellations, or protection plans, as outlined in the Service Details section above. These services will be rendered in accordance with the terms specified.
          <br /><br />

          <strong>Authorization for Payment:</strong><br />
          By submitting this payment, you authorize Support Service to charge the above Debit/Credit card for the services requested. You further confirm that:
          <ul>
            <li>You have approved this transaction, and you will hold Support Service harmless with respect to these instructions.</li>
            <li>You understand that the payment may be split into multiple charges if required, but the total amount will remain equal to the amount authorized above.</li>
            <li>You acknowledge and accept that Support Service and/or its partners may process the transaction in multiple splits, and you will not dispute or charge back any transactions made by Support Service for the authorized amount.</li>
            <li>You do not have concerns regarding the split transactions, as long as the total charge remains equal to the authorized amount.</li>
          </ul>
          <br /><br />

          <strong>No Cancellation and Refunds:</strong><br />
          Once the payment is confirmed, and the services are rendered, no cancellations or changes can be made afterward. All charges are final, and no refunds will be issued for services provided.
          <br /><br />

          <strong>Service Fees and Charges:</strong><br />
          All charges are final once the service is confirmed and payment is processed. Fees for the services are detailed above and are non-refundable unless explicitly stated in the service agreement. If a cancellation is required, please refer to the cancellation policy.
          <br /><br />

          <strong>Dispute Resolution:</strong><br />
          In the event of a dispute regarding services rendered or charges made, you agree to contact Support Service within 30 days of the service date. Disputes will be addressed in accordance with our dispute resolution policy, which includes mediation or arbitration, depending on the nature of the dispute.
          <br /><br />

          <strong>Refund Policy:</strong><br />
          Refunds for services are considered on a case-by-case basis, particularly if the service has not been rendered as agreed or if the technician’s visit has not occurred. If applicable, refunds will only be processed after a formal dispute process is completed. Please review our full refund policy on our website for further details.
          <br /><br />

          <strong>Protection Plan & Service Coverage:</strong><br />
          If purchasing a protection plan, please review the terms and conditions of the protection plan. The plan includes coverage for the specified services as outlined during the initial request. Any misuse or fraudulent claims related to the protection plan may result in the immediate termination of the service and potential legal action.
          <br /><br />

          <strong>Privacy Policy:</strong><br />
          Your personal and payment information is collected securely in accordance with US privacy laws. We will never share or sell your information to third parties without your consent. For full details, please refer to our Privacy Policy.
          <br /><br />

          <strong>Agreement:</strong><br />
          By submitting this payment, you agree to the above terms and conditions and authorize the payment to be processed.
        </p>
      

      {/* Signature Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your e-Sign</label>
        <input
          type="text"
          value={signature}
          onChange={handleSignatureChange}
          placeholder="Type Your Sign"
          className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <p className="text-sm text-gray-500 mt-2">
          Signature min length is 4 & max is 28 Characters.
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          checked={isTermsChecked}
          onChange={(e) => setIsTermsChecked(e.target.checked)}
        />
        <label htmlFor="terms" className="text-sm text-gray-700">
          I agree to the <strong>Terms and Conditions</strong>.
        </label>
      </div>

      <div className="flex items-center space-x-2 pb-2">
        <input
          type="checkbox"
          id="paymentDetails"
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          checked={isPaymentDetailsChecked}
          onChange={(e) => setIsPaymentDetailsChecked(e.target.checked)}
        />
        <label htmlFor="paymentDetails" className="text-sm text-gray-700">
          I confirm that the <strong>payment details provided</strong> are correct and valid.
        </label>
      </div>

      <button
        onClick={() => isConfirmed && handleConfirmPayment()}
        className={`w-full bg-green-600 text-white px-4 py-2 rounded-md mt-4 ${
          isConfirmed ? "hover:bg-green-700" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={!isConfirmed}
      >
        Confirm and Proceed
      </button>
    </div>
  );
};

export default DeclarationPage;
