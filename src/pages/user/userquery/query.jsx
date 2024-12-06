import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ClientQuery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);

  // State to hold queries
  const [queryData, setQueryData] = useState([
    {
      query: "Leaky Faucet",
      serviceType: "Plumbing",
      descript: "The kitchen faucet is constantly dripping.",
      badge: "pending",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    serviceType: [],
  });


  const openModal = (query) => {
    setSelectedQuery(query);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuery(null);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "serviceType") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        serviceType: checked
          ? [...prevFormData.serviceType, value]
          : prevFormData.serviceType.filter((type) => type !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOtherChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new query to queryData
    setQueryData([
      ...queryData,
      { ...formData, badge: "pending" },
    ]);
    // Clear form
    setFormData({
      query: "",
      serviceType: "",
      descript: "",
    });
  };

  return (
    <div className="min-h-screen pt-[20%] md:pt-[10%] bg-white px-6 pb-4">
      <div className="space-y-8">
        <div className="flex justify-between">
          <h1 className="text-[20px] text-black font-bold">
            Queries
            <span className="mx-3 text-[18px] text-gray-600">({queryData.length})</span>
          </h1>
        </div>

        <div className="grid gap-2 md:grid-rows-1 md:grid-cols-3">
          {queryData.map((card, index) => (
            <div key={index} onClick={() => openModal(card)}>
              <Card className="bg-oc-purple w-[300px] text-black">
                <CardHeader>
                  <CardTitle className="items-center">{card.query}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="opacity-[80%]">{card.serviceType}</h4>
                    <p>{card.descript}</p>
                  </div>
                  <Badge className="justify-end font-[500] rounded-full border-[1px] border-purple-900 text-purple-900 bg-transparent mt-4">
                    {card.badge}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="border-[1px] rounded-[15px] h-fit border-gray-300">
          <div className="bg-white shadow-md rounded-tl-2xl p-6 mx-auto">
            <h2 className="text-xl font-semibold text-gray-700">Submit a New Query</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="query" className="block text-sm font-medium text-gray-700">
                  Query Title
                </label>
                <input
                  type="text"
                  id="query"
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  required
                  className="block w-full h-14 border border-gray-300  text-gray-700  rounded-tl-lg px-4"
                />
              </div>
              <div>
                <label
                  htmlFor="descript"
                  className="block text-sm font-medium text-gray-700"
                >
                  Query Description
                </label>
                <textarea
                  id="descript"
                  name="descript"
                  value={formData.descript}
                  onChange={handleChange}
                  required
                  className="block w-full h-28 border border-gray-300 text-gray-700 rounded-tl-lg px-4 py-2"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="serviceType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Service Type
                </label>
                <div className="space-y-2 mt-2 text-gray-700">


                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="serviceType"
                      value="Technician Visit"
                      checked={formData.serviceType.includes("Technician Visit")}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <span>Technician Visit</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="serviceType"
                      value="Service Cancellation"
                      checked={formData.serviceType.includes("Service Cancellation")}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <span>Service Cancellation</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="serviceType"
                      value="Protection Plan"
                      checked={formData.serviceType.includes("Protection Plan")}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <span>Protection Plan</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="serviceType"
                      value="Other"
                      checked={formData.serviceType.includes("Other")}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <span>Other [Specify]</span>
                  </label>

                  {/* Conditional Input Field */}
                  {formData.serviceType.includes("Other") && (
                    <input
                      type="text"
                      name="otherQuery"
                      value={formData.otherQuery || ""}
                      onChange={handleOtherChange}
                      placeholder="Please specify your query"
                      className="block w-full h-10 mt-2 px-4 text-gray-700 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-fit px-[40px] mx-auto py-2 h-fit bg-[#605CFF] text-white rounded-md hover:bg-[#605CFF] transition"
              >
                Submit Query
              </button>
            </form>
          </div>
        </div>
      </div>

      {isModalOpen && selectedQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-bold">{selectedQuery.query}</h2>
            <p className="mt-2 text-gray-600">Service Type: {selectedQuery.serviceType}</p>
            <p className="mt-2 text-gray-600">Description: {selectedQuery.descript}</p>
            <Badge className="mt-4 bg-[#605CFF] text-white">{selectedQuery.badge}</Badge>
            <Button
              className="mt-4 w-full text-white bg-[#605CFF] hover:bg-[#605CFF]"
              onClick={closeModal}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientQuery;
