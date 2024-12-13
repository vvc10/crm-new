import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"; // ShadCN Dialog Components
import axios from "axios";
import Link from "next/link";

const ClientQuery = () => {
  const [queryData, setQueryData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    query_type: "technical",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // For modal visibility
  const [selectedQuery, setSelectedQuery] = useState(null); // Store the selected query for modal

  const [filter, setFilter] = useState("all"); // Filter state (all, new, in progress)

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        const user_id = localStorage.getItem("user_id"); // Get user ID from localStorage
        if (!token || !user_id) {
          setError("Authentication token or user ID missing. Please log in again.");
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/queries/user`, // Assuming user ID is part of the URL
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Fetching data::", response.data);
        setQueryData(response.data);
      } catch (err) {
        setError("Failed to fetch queries. Please try again later.");
        console.error(err);
      }
    };

    fetchQueries();
  }, []);


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const token = localStorage.getItem("auth-token");
    
    if (!token) {
      setError("Authentication token missing. Please log in again.");
      setLoading(false);
      return;
    }
  
    try {
      console.log(formData); // Check the values being sent
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/queries/create`,
        { ...formData }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        setQueryData((prev) => [
          ...prev,
          { ...formData, status: "new", created_at: new Date().toISOString() },
        ]);
        setFormData({ title: "", description: "", query_type: "technical" }); // Set default query_type
        setOpenDialog(false);
      } else {
        setError(`Failed to submit query: ${response.data.message || "Unknown error"}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit query. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Filter queries based on status
  const filteredQueries = queryData.filter((query) => {
    if (filter === "new") return query.status === "new";
    if (filter === "in progress") return query.status === "in progress";
    return true; // Show all if no filter
  });

  return (
    <div className="min-h-screen pt-[20%] md:pt-[10%] bg-white px-6 pb-4">
      <div className="space-y-6">
        <div className="flex flex-row w-full">
          <h1 className="text-[20px] text-black font-bold w-[70%]">
            Queries
            <span className="mx-3 text-[18px] text-gray-600">({filteredQueries.length})</span>
          </h1>
          <div className="flex flex-row gap-4 items-end ml-auto text-right">
            {/* Filter Buttons */}
            <div className="space-x-2">
              <Button onClick={() => setFilter("all")} className="bg-gray-200 text-gray-700 hover:bg-gray-300">All</Button>
              <Button onClick={() => setFilter("new")} className="bg-gray-200 text-gray-700 hover:bg-gray-300">New</Button>
              <Button onClick={() => setFilter("in_progress")} className="bg-gray-200 text-gray-700 hover:bg-gray-300">In Progress</Button>
            </div>

            {/* New Query Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="text-gray-200 bg-[#605cff]">New Query</Button>
              </DialogTrigger>

              <DialogContent className="p-6 space-y-6">
                <DialogTitle>Submit a New Query</DialogTitle>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-gray-700">
                  <div>
                    <label htmlFor="title" className="block text-sm mb-2 font-medium text-gray-700">
                      Query Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="block w-full h-14 border border-gray-300 text-gray-700 rounded-lg px-4"
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm mb-2 font-medium text-gray-700">
                      Query Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="block w-full h-28 border border-gray-300 text-gray-700 rounded-lg px-4 py-2"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="query_type" className="block mb-2 text-sm font-medium text-gray-700">
                      Query Type
                    </label>
                    <select
                      id="query_type"
                      name="query_type"
                      value={formData.query_type}
                      onChange={handleChange}
                      className="w-fit p-2 border rounded-lg"
                    >
                      <option value="technical">Technician Visit</option>
  <option value="service">Service Cancellation</option>
  <option value="protection">Protection Plan</option>
  <option value="other">Other (Describe above)</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-fit mt-4 text-gray-200 bg-[#605cff]" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Query"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

        </div>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display Queries */}
        <div className="grid gap-2 md:grid-rows-1 md:grid-cols-3">
          {filteredQueries.length === 0 ? (
            <p className="text-gray-500">No queries found.</p>
          ) : (
            filteredQueries.map((query, index) => (
              <div key={index}>
                <Card className="bg-oc-purple w-[300px] text-gray-700" onClick={() => {
                  setSelectedQuery(query);
                  setOpenDialog(true);
                }}>
                  <CardHeader>
                    <CardTitle className="items-center">{query.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="opacity-[80%]">{query.query_type}</h4>
                      <p>{query.description}</p>
                      <div className="w-full text-right">
                        <p className="font-[400] text-[15px] text-purple-700 border-[1px] w-fit px-3 py-1 border-purple-700 rounded-full">
                          {query.status}
                        </p>
                      </div>


                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for Query Details */}
      {selectedQuery && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="px-4 py-4 space-y-6">
            <DialogTitle>Query Details</DialogTitle>
            <DialogDescription>
              <div className="text-[16px] text-gray-700 gap-2 flex flex-col">
                <p><strong>Title:</strong> {selectedQuery.title}</p>
                <p><strong>Description:</strong> {selectedQuery.description}</p>
                <p><strong>Query Type:</strong> {selectedQuery.query_type}</p>
                <p><strong>Status:</strong> {selectedQuery.status}</p>
                {selectedQuery.amount && <p><strong>Amount to be paid:</strong> {selectedQuery.amount}</p>}
                {selectedQuery.payment_link && (
                  <p className="mt-2 opacity-80"> Payment link is activated, you can pay now</p>

                )}
              </div>


            </DialogDescription>
            <DialogClose>
              <Button className="bg-gray-200 hover:bg-gray-300 text-gray-600 mx-2">Close</Button>

              {selectedQuery.payment_link && (
                <Button className="bg-purple-800 hover:bg-purple-700 text-gray-600 mx-2">
                  <Link href={selectedQuery.payment_link} target="_blank" rel="noopener noreferrer" className="text-gray-200 ">
                    Pay Now
                  </Link>
                </Button>
              )}

            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ClientQuery;
