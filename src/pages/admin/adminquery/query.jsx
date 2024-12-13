import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminNavbar from "@/components/navbar/AdminNavBar";
import { IoMailOutline } from "react-icons/io5";
import axios from "axios";

const AdminQuery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [amount, setAmount] = useState(""); // For setting amount for accepted queries
  const [payment_link, setPaymentLink] = useState(""); // For setting payment link
  const [queries, setQueries] = useState([]); // All queries
  const [filteredQueries, setFilteredQueries] = useState([]); // Queries filtered by status
  const [statusFilter, setStatusFilter] = useState("new"); // Default status filter
  const [loading, setLoading] = useState(false); // Loading state for API calls

  useEffect(() => {
    const fetchQueries = async (status) => {
      setLoading(true); // Show loading indicator
      try {
        let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/queries/admin`;
        if (status !== "all") {
          url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/queries/admin/${status}`;
        }

        const token = localStorage.getItem("adminToken");
        console.log("adminToken", token);

        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in Authorization header
          },
        });

        setQueries(data);
        setFilteredQueries(data);
      } catch (error) {
        console.error("Failed to fetch queries:", error.message);
        alert("Failed to fetch queries. Please try again later.");
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };
    fetchQueries(statusFilter);
  }, [statusFilter]);

  const openModal = (query) => {
    setSelectedQuery(query);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuery(null);
    setAmount(""); // Reset the amount field
    setPaymentLink(""); // Reset the payment link field
  };

  const acceptQuery = async () => {
    if (!amount || !payment_link) {
      alert("Please enter both an amount and a payment link before accepting the query.");
      return;
    }

    try {
      setLoading(true); // Show loading indicator while accepting
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/queries/admin/update-status`,
        {
          queryId: selectedQuery.id, // Pass the selected query's ID
          status: "in_progress", // Mark the query as in_progress
          amount, // Pass the amount entered by the admin
          payment_link, // Pass the payment link entered by the admin
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      // Update the local queries state without reloading
      setQueries((prevQueries) =>
        prevQueries.map((query) =>
          query.id === selectedQuery.id ? { ...query, status: "in_progress", amount, payment_link } : query
        )
      );
      setFilteredQueries((prevFiltered) =>
        prevFiltered.filter((query) => query.id !== selectedQuery.id)
      );

      // Close the modal and reset state
      closeModal();
    } catch (error) {
      console.error("Failed to accept query:", error.message);
      alert("Error accepting the query. Please try again.");
    } finally {
      setLoading(false); // Hide loading indicator after the request completes
    }
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setAmount(""); // Reset amount field on status change
    setPaymentLink(""); // Reset payment link field on status change
    setSelectedQuery(null); // Reset selected query on status change
  };

  return (
    <>
      <AdminNavbar />
      <div className="pt-[20%] md:pt-[10%] min-h-screen bg-white px-6">
        <div className="space-y-8">
          <div className="flex flex-col z-50 md:flex-row justify-between">
            <h1 className="text-[20px] text-black font-bold">Admin Queries</h1>
            <div className="flex gap-4 ">
              {["new", "in_progress", "resolved", "all"].map((status) => (
                <Button
                  key={status}
                  className={`px-4 py-2 ${statusFilter === status ? "bg-green-600 text-white" : "bg-gray-200 text-black"}`}
                  onClick={() => handleStatusChange(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Queries Section */}
          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2 text-gray-800">
              {loading ? (
                <p>Loading queries...</p> // Show loading message
              ) : filteredQueries.length > 0 ? (
                filteredQueries.map((query) => (
                  <div key={query.id}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {query.title}
                           <Badge className="font-[500] text-white bg-green-900 mx-4">
                            {query.status}
                          </Badge>
                        </CardTitle>
                        <h4 className="opacity-[50%] text-[14px] flex flex-row items-center gap-[5px]">
                        <IoMailOutline/> {query.email}
                        </h4>

                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h4 className="opacity-[80%]">{query.query_type}</h4>
                          <p>{query.description}</p>
                          <Button
                            className="w-full text-white bg-[#267B60] hover:bg-green-900"
                            onClick={() => openModal(query)}
                          >
                            View More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))
              ) : (
                <p>No queries found for the selected status.</p>
              )}
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && selectedQuery && (
          <div className="fixed inset-0 text-gray-800 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
              <h2 className="text-xl font-bold">{selectedQuery.title}</h2>
              <p className="mt-2 text-gray-600">Service Type: {selectedQuery.query_type}</p>
              <p className="mt-2 text-gray-600">Description: {selectedQuery.description}</p>
              <p className="mt-2 text-gray-600">Email: {selectedQuery.email}</p> {/* Display email here */}
              <Badge className="mt-4 bg-green-900 text-white">{selectedQuery.status}</Badge>

              {statusFilter === "new" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Enter Amount</label>
                  <input
                    type="number"
                    value={amount}
                    placeholder="Enter amount"
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 block w-full rounded-md px-2 py-3 bg-gray-200 text-gray-500 border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                  <label className="block mt-4 text-sm font-medium text-gray-700">Enter Payment Link</label>
                  <input
                    type="url"
                    value={payment_link}
                    placeholder="Enter payment link"
                    onChange={(e) => setPaymentLink(e.target.value)}
                    className="mt-1 block w-full rounded-md px-2 py-3 bg-gray-200 text-gray-500 border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              )}

              <div className="flex flex-row gap-2 mt-2">
                {selectedQuery?.status === "new" && (
                  <Button
                    className="w-full bg-[#267B60] hover:bg-green-900 text-white"
                    onClick={acceptQuery}
                    disabled={loading}
                  >
                    Accept Query
                  </Button>
                )}

                <Button
                  className="w-full bg-gray-300 hover:bg-gray-200 text-gray-700"
                  onClick={closeModal}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminQuery;
