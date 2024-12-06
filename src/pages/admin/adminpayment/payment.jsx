import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import AdminNavbar from '@/components/navbar/AdminNavBar';
import { jsPDF } from 'jspdf';
import { IoDownloadOutline, IoEye } from 'react-icons/io5';

const AdminPayment = () => {
    const initialPayments = [
        {
            id: "#1234",
            name: "John Doe",
            email: "john@example.com",
            payment: 1000,
            status: "Success",
            declaration: "Payment for services rendered",
        },
        {
            id: "#5678",
            name: "Jane Doe",
            email: "jane@example.com",
            payment: 1000,
            status: "Pending",
            declaration: "Payment for consultation",
        },
        {
            id: "#9101",
            name: "Sam Smith",
            email: "sam@example.com",
            payment: 500,
            status: "Cancelled",
            declaration: "Refunded for services",
        },
    ];

    const [payments, setPayments] = useState(initialPayments);
    const [selectedPayments, setSelectedPayments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);
    const [isDeclarationModalOpen, setIsDeclarationModalOpen] = useState(false);
    const [selectedDeclaration, setSelectedDeclaration] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleCheckboxChange = (id) => {
        setSelectedPayments((prevState) =>
            prevState.includes(id)
                ? prevState.filter((item) => item !== id)
                : [...prevState, id]
        );
    };

    const handleViewDetails = (payment) => {
        setSelectedPaymentDetails(payment);
        setIsModalOpen(true);
    };
    const generatePDF = () => {
        const doc = new jsPDF();
        payments.forEach((payment, index) => {
            const yPosition = 10 + (index * 60);
            doc.text(`Transaction ID: ${payment.id}`, 10, yPosition);
            doc.text(`User: ${payment.name}`, 10, yPosition + 10);
            doc.text(`Email: ${payment.email}`, 10, yPosition + 20);
            doc.text(`Amount Paid: ₹${payment.payment}`, 10, yPosition + 30);
            doc.text(`Status: ${payment.status}`, 10, yPosition + 40);
            doc.text(`Declaration: ${payment.declaration}`, 10, yPosition + 50);

            // Add a new page if there are more payments to show
            if (index < payments.length - 1) {
                doc.addPage();
            }
        });
        doc.save('all_payments.pdf');
    };


    const generatePDFForSelected = () => {
        const doc = new jsPDF();
        selectedPayments.forEach((payment, index) => {
            const selectedPayment = payments.find(p => p.id === payment);
            if (selectedPayment) {
                doc.text(`Transaction ID: ${selectedPayment.id}`, 10, 10 + (index * 60));
                doc.text(`User: ${selectedPayment.name}`, 10, 20 + (index * 60));
                doc.text(`Email: ${selectedPayment.email}`, 10, 30 + (index * 60));
                doc.text(`Amount Paid: ₹${selectedPayment.payment}`, 10, 40 + (index * 60));
                doc.text(`Status: ${selectedPayment.status}`, 10, 50 + (index * 60));
                doc.text(`Declaration: ${selectedPayment.declaration}`, 10, 60 + (index * 60));
                if (index < selectedPayments.length - 1) doc.addPage();
            }
        });
        doc.save(`selected_payments.pdf`);
    };

    const TotalAmount = payments.reduce((total, payment) => total + payment.payment, 0);

    const filteredPayments = payments.filter((payment) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            payment.name.toLowerCase().includes(searchLower) ||
            payment.email.toLowerCase().includes(searchLower) ||
            payment.id.toLowerCase().includes(searchLower)
        );
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "Success":
                return "bg-green-100 text-green-700";
            case "Pending":
                return "bg-yellow-100 text-yellow-700";
            case "Cancelled":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const handleViewDeclaration = (declaration) => {
        setSelectedDeclaration(declaration);
        setIsDeclarationModalOpen(true);
    };

    return (
        <>
            <AdminNavbar />
            <div className="pt-[20%] md:pt-[10%] min-h-screen bg-white px-4 sm:px-6">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-white p-4 rounded-lg shadow-none">
                        <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-0">
                            Payments
                            <span className="ml-2 text-gray-600 text-sm md:text-lg">
                                ({filteredPayments.length})
                            </span>
                        </h1>
                        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                            <div className="flex items-center space-x-2">
                                <Button
                                    onClick={() => generatePDF()}
                                    className="text-gray-200 bg-green-700 hover:opacity-80 text-sm md:text-base"
                                >
                                    <IoDownloadOutline />
                                    <span className="visible md:visible sm:inline">Download Payments</span>
                                </Button>
                            </div>
                            <input
                                type="text"
                                placeholder="Search here"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                            />
                            <span className="text-sm md:text-lg font-bold text-gray-700">
                                Total: ₹{TotalAmount}
                            </span>
                        </div>
                    </div>

                    {/* Payments Table */}
                    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
                        <div className="hidden md:grid md:grid-cols-9 mb-4 font-semibold text-gray-600 border-b pb-2">
                            <div className="col-span-1">Select</div>
                            <div className="col-span-2">User</div>
                            <div className="col-span-1">ID</div>
                            <div className="col-span-2">Email</div>
                            <div className="col-span-1">Amount</div>
                            <div className="col-span-1">Status</div>
                            <div className="col-span-1">Declaration</div>
                        </div>
                        {filteredPayments.map((payment) => (
                            <div
                                key={payment.id}
                                className="flex flex-col md:grid md:grid-cols-9 items-start md:items-center py-4 px-4 bg-white border rounded-md shadow-sm mb-4 hover:shadow-lg transition-all duration-200"
                            >
                                <div className="col-span-1 flex items-center mb-2 md:mb-0">
                                    <input
                                        type="checkbox"
                                        checked={selectedPayments.includes(payment.id)}
                                        onChange={() => handleCheckboxChange(payment.id)}
                                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                </div>
                                <div className="col-span-2 text-gray-700 text-sm md:text-base">{payment.name}</div>
                                <div className="col-span-1 text-gray-500 text-sm md:text-base">{payment.id}</div>
                                <div className="col-span-2 text-gray-500 text-sm md:text-base">{payment.email}</div>
                                <div className="col-span-1 text-gray-700 text-sm md:text-base flex items-center">
                                    ₹{payment.payment}
                                    <Button
                                        onClick={() => handleViewDetails(payment)}
                                        className="ml-2 text-green-700 hover:text-green-800 shadow-none"
                                    >
                                        <IoEye />
                                    </Button>
                                </div>
                                <div className={`col-span-1 text-sm text-center w-fit px-4 py-1 rounded-full font-medium ${getStatusColor(payment.status)}`}>
                                    {payment.status}
                                </div>
                                <div
                                    onClick={() => handleViewDeclaration(payment.declaration)}
                                    className="col-span-1 text-sm text-center font-medium bg-green-700 hover:bg-green-800 py-2 px-3 w-fit rounded-lg cursor-pointer"
                                >
                                    Declaration
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Modal for Payment Details */}
            {isModalOpen && selectedPaymentDetails && (
                <div className="fixed inset-0 bg-gray-800 text-gray-700 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Payment Details
                        </h2>
                        <div className="space-y-2">
                            <p>
                                <strong>Transaction ID:</strong> {selectedPaymentDetails.id}
                            </p>
                            <p>
                                <strong>User:</strong> {selectedPaymentDetails.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {selectedPaymentDetails.email}
                            </p>
                            <p>
                                <strong>Amount Paid:</strong> ₹{selectedPaymentDetails.payment}
                            </p>
                            <p>
                                <strong>Status:</strong> {selectedPaymentDetails.status}
                            </p>
                            <p>
                                <strong>Declaration:</strong> {selectedPaymentDetails.declaration}
                            </p>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 text-white hover:bg-gray-700"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Declaration */}
            {isDeclarationModalOpen && selectedDeclaration && (
                <div className="fixed inset-0 bg-gray-800 text-gray-700 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Payment Declaration
                        </h2>
                        <div className="space-y-2">
                            <p>{selectedDeclaration}</p>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button
                                onClick={() => setIsDeclarationModalOpen(false)}
                                className="bg-gray-500 text-white hover:bg-gray-700"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminPayment;
