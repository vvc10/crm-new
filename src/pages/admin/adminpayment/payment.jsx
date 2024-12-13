import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AdminNavbar from '@/components/navbar/AdminNavBar';
import { jsPDF } from 'jspdf';
import { IoDownloadOutline, IoEye } from 'react-icons/io5';
import axios from 'axios';
import DeclarationAdmin from '@/pages/admin/adminpayment/declarationadmin';

const AdminPayment = () => {
    const [payments, setPayments] = useState([]);
    const [selectedPayments, setSelectedPayments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);
    const [isDeclarationModalOpen, setIsDeclarationModalOpen] = useState(false);
    const [selectedDeclaration, setSelectedDeclaration] = useState(null);
    const [selectedSignature, setSelectedSignature] = useState(null);
    const [selectedTermsAccepted, setSelectedTermsAccepted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                if (!token) {
                    console.error("No token found");
                    return;
                }

                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/payments/admin`, {
                    timeout: 10000,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                setPayments(response.data);
                console.log(response.data);
                console.log(process.env.NEXT_PUBLIC_BACKEND_API_URL);

                const total = response.data.reduce((total, payment) => {
                    return total + (Number(payment.amount_paid) || 0);
                }, 0);

                setTotalAmount(total);
            } catch (error) {
                console.error("Error fetching payments:", error);
            }
        };

        fetchPayments();
    }, []);

    const handleCheckboxChange = (id) => {
        setSelectedPayments((prevState) =>
            prevState.includes(id)
                ? prevState.filter((item) => item !== id)
                : [...prevState, id]
        );
    };


    const openStatusModal = (payment) => {
        setSelectedPayment(payment);
        setNewStatus(payment.status); // Pre-fill with current status
        setIsStatusModalOpen(true);
    };

    const closeStatusModal = () => {
        setIsStatusModalOpen(false);
        setSelectedPayment(null);
        setNewStatus("");
    };

    const handleStatusUpdate = async () => {
        if (!selectedPayment || !newStatus) return;

        setLoading(true); // Show loading indicator

        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                console.error("No token found");
                return;
            }

            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/payments/update-payment-status/${selectedPayment.id}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setPayments((prevPayments) =>
                    prevPayments.map((payment) =>
                        payment.id === selectedPayment.id
                            ? { ...payment, status: newStatus }
                            : payment
                    )
                );
                closeStatusModal();
            } else {
                throw new Error("Unexpected response");
            }
        } catch (error) {
            setError("Failed to update the payment status. Please try again.");
            alert(error.message || error);
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };






    const handleViewDetails = (payment) => {
        setSelectedPaymentDetails(payment);
        setIsModalOpen(true);
    };


    const generatePDFForSelected = () => {
        if (selectedPayments.length === 0) {
            alert("Please select at least one payment.");
            return;
        }

        const doc = new jsPDF();
        selectedPayments.forEach((payment, index) => {
            const selectedPayment = payments.find(p => p.id === payment);
            if (selectedPayment) {
                doc.text(`Transaction ID: ${selectedPayment.transaction_id}`, 10, 10 + (index * 60));
                doc.text(`User: ${selectedPayment.name}`, 10, 20 + (index * 60));
                doc.text(`Amount Paid: ₹${selectedPayment.amount_paid}`, 10, 30 + (index * 60));
                doc.text(`Status: ${selectedPayment.status}`, 10, 40 + (index * 60));
                doc.text(`Terms Accepted: ${selectedPayment.terms_accepted ? 'Yes' : 'No'}`, 10, 50 + (index * 60));
                doc.text(`Signature: ${selectedPayment.signature}`, 10, 60 + (index * 60));
                if (index < selectedPayments.length - 1) doc.addPage();
            }
        });
        doc.save('selected_payments.pdf');
    };


    const filteredPayments = payments.filter((payment) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            (payment.name && payment.name.toLowerCase().includes(searchLower)) ||
            (payment.email && payment.email.toLowerCase().includes(searchLower)) ||
            (payment.transaction_id && payment.transaction_id.toLowerCase().includes(searchLower))
        );
    });

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

    const handleViewDeclaration = (declaration, signature, termsAccepted) => {
        setSelectedDeclaration(declaration);
        setSelectedSignature(signature);
        setSelectedTermsAccepted(termsAccepted);
        setIsDeclarationModalOpen(true);
    };

    return (
        <>
            <AdminNavbar />
            <div className="pt-[20%] md:pt-[10%] min-h-screen bg-white px-4 sm:px-6">
                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-white p-4 rounded-lg shadow-none relative z-[1000]">
                        <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-0">
                            Payments
                            <span className="ml-2 text-gray-600 text-sm md:text-lg">
                                ({filteredPayments.length})
                            </span>
                        </h1>
                        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                            <Button
                                onClick={generatePDFForSelected}
                                className="text-gray-200 bg-green-700 hover:bg-green-600 text-sm md:text-base"
                            >
                                <IoDownloadOutline />
                                <span className="visible md:visible sm:inline">Download Payments</span>
                            </Button>
                            <input
                                type="text"
                                placeholder="Search here"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                            />
                            <span className="text-sm md:text-lg font-bold text-gray-700">
                                Total: ₹{totalAmount}
                            </span>
                        </div>
                    </div>

                    {/* Payments Table */}
                    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
                        <div className="hidden md:grid md:grid-cols-9 mb-4 font-semibold text-gray-600 border-b pb-2">
                            <div className="col-span-1">Select</div>
                            <div className="col-span-2">User</div>
                            <div className="col-span-1">Transaction ID</div>
                            <div className="col-span-2">Email</div>
                            <div className="col-span-1">Amount</div>
                            <div className="col-span-1">Status</div>
                            <div className="col-span-1">Declaration</div>
                        </div>
                        {filteredPayments.map((payment) => (
                            <div
                                key={payment.transaction_id}
                                className="flex flex-col md:grid md:grid-cols-9 items-start md:items-center py-4 px-4 bg-white border rounded-md shadow-sm mb-4 hover:shadow-lg transition-all duration-200"
                            >
                                <div className="col-span-1 flex items-center mb-2 md:mb-0">
                                    <input
                                        type="checkbox"
                                        checked={selectedPayments.includes(payment.transaction_id)}
                                        onChange={() => handleCheckboxChange(payment.transaction_id)}
                                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                </div>
                                <div className="col-span-2 text-gray-700 text-sm md:text-base">{payment.name}</div>
                                <div className="col-span-1 text-gray-500 text-sm md:text-base">{payment.transaction_id}</div>
                                <div className="col-span-2 text-gray-500 text-sm md:text-base">{payment.email}</div>
                                <div className="col-span-1 text-gray-700 text-sm md:text-base flex items-center">
                                    ₹{payment.amount_paid}
                                    <Button
                                        onClick={() => handleViewDetails(payment)}
                                        className="ml-2 bg-gray-50 hover:bg-gray-100 text-green-700 hover:text-green-800 shadow-none"
                                    >
                                        <IoEye />
                                    </Button>
                                </div>
                                <div onClick={() => openStatusModal(payment)}
                                    className={`col-span-1 ${getStatusColor(payment.status)}  w-fit px-3 py-1 rounded-full m-auto text-[14px]`}>
                                    {payment.status}
                                </div>
                                <div className="col-span-1">
                                    <Button
                                        onClick={() =>
                                            handleViewDeclaration(payment.declaration, payment.signature, payment.terms_accepted)
                                        }
                                        className="bg-green-700 hover:bg-green-800 text-gray-100 py-1 px-4 w-fit m-auto flex rounded-md"
                                    >
                                        Declaration
                                    </Button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                {isStatusModalOpen && selectedPayment && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-[2000]">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-lg font-semibold mb-4">Update Payment Status</h2>

                            <p className="mb-2">Payment ID: {selectedPayment.id}</p>
                            <p className="mb-2">Transaction ID: {selectedPayment.transaction_id}</p>
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="Success">Success</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Failed">Failed</option>
                                </select>
                            </div>
                            <div className="mt-4 flex justify-end space-x-4">
                                <Button onClick={closeStatusModal} className="bg-gray-200 hover:bg-gray-300 text-gray-700">
                                    Cancel
                                </Button>
                                <Button onClick={handleStatusUpdate} className="bg-green-500 hover:bg-green-600 text-white">
                                    Update
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Payment Details Modal */}
                {isModalOpen && selectedPaymentDetails && (
                    <div className="fixed inset-0 text-gray-700 bg-gray-500 bg-opacity-50 flex justify-center items-center z-[2000]">
                        <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2">
                            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                            <div className="space-y-2">
                                <p><strong>Transaction ID:</strong> {selectedPaymentDetails.transaction_id}</p>
                                <p><strong>Name:</strong> {selectedPaymentDetails.name}</p>
                                <p><strong>Email:</strong> {selectedPaymentDetails.email}</p>
                                <p><strong>Amount Paid:</strong> ₹{selectedPaymentDetails.amount_paid}</p>
                                <p><strong>Status:</strong> {selectedPaymentDetails.status}</p>
                                <p><strong>Signature:</strong> {selectedPaymentDetails.signature}</p>
                                <p><strong>Terms Accepted:</strong> {selectedPaymentDetails.terms_accepted ? 'Yes' : 'No'}</p>
                            </div>
                            <div className='w-full text-right items-end'>
                                <Button
                                    onClick={() => setIsModalOpen(false)}
                                    className="mt-4 w-fit text-gray-700 justify-end bg-gray-100 hover:bg-gray-200"
                                >
                                    Close
                                </Button>
                            </div>

                        </div>
                    </div>
                )}
                {error && <div className="text-red-500 absolute top-10 right-4">{error}</div>}
                {/* Declaration Modal */}
                {isDeclarationModalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-[2000]">
                        <div className="bg-white text-gray-700 p-8 rounded-lg shadow-lg w-full md:w-1/2 h-[80%] md:h-[80%] overflow-y-scroll">
                            <DeclarationAdmin selectedTermsAccepted={selectedTermsAccepted} setIsDeclarationModalOpen={setIsDeclarationModalOpen} selectedSignature={selectedSignature} />

                            <Button
                                onClick={() => setIsDeclarationModalOpen(false)}
                                className="mt-4 w-full text-gray-600 bg-gray-100 hover:bg-gray-200"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminPayment;
