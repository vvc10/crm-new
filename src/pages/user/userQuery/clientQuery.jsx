import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ClientQuery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);

  const queryData = [
    { query: "Leaky Faucet", serviceType: "Plumbing", descript: "The kitchen faucet is constantly dripping.", badge: "pending" },
  ];

  const openModal = (query) => {
    setSelectedQuery(query);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuery(null);
  };
  const [queries, setQueries] = useState([
    {
      title: "Leaky Faucet",
      service: "Plumbing",
      description: "The kitchen faucet is constantly dripping.",
      status: "Pending",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    serviceType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQueries([...queries, { ...formData, status: "Pending" }]);
    setFormData({
      title: "",
      description: "",
      serviceType: "",
    });
  };
  return (
    <div className='mt-[6%] h-full bg-white px-6 py-6'>
      <div className="space-y-8">
        <div className="flex justify-between">
          <h1 className="text-[20px] text-black font-bold">Queries
            <span className='mx-3 text-[18px] text-gray-600'>({queryData.length})</span>
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {queryData.map((card, index) => (
            <div key={index} className=''>
              <Card className="bg-oc-purple w-fit text-black">
                <CardHeader>
                  <CardTitle className="items-center">
                    {card.query}

                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className='opacity-[80%]'>{card.serviceType}</h4>
                    <p>{card.descript}</p>
                    {/* <Button
                      className="w-full bg-[#267B60] hover:bg-green-900"
                      onClick={() => openModal(card)}
                    >
                      View more
                    </Button> */}
                  </div>
                  <Badge className="justify-end font-[500] rounded-full border-[1px] border-purple-900 text-purple-900 bg-transparent mt-4">{card.badge}</Badge>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div className='border-[1px] rounded-[15px] h-fit border-gray-300'>
          <div
            className="bg-white shadow-md rounded-tl-2xl p-6 mx-auto"
          // style={{
          //   width: "1300px",
          //   height: "653px",
          //   top: "711px",
          //   left: "70px",
          // }}
          >
            <h2 className="text-xl font-semibold text-gray-800">Submit a New Query</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Query Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="block w-full h-14 border border-gray-300 rounded-tl-lg px-4"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Query Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="block w-full h-28 border border-gray-300 rounded-tl-lg px-4 py-2"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="serviceType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Service Type
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  className="block w-full h-14 border border-gray-300 rounded-tl-lg px-4"
                >
                  <option value="">Select Service Type</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Carpentry">Carpentry</option>
                  <option value="Cleaning">Cleaning</option>
                </select>
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


      {/* Modal */}
      {
        isModalOpen && selectedQuery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
              <h2 className="text-xl font-bold">{selectedQuery.query}</h2>
              <p className="mt-2 text-gray-600">Service Type: {selectedQuery.serviceType}</p>
              <p className="mt-2 text-gray-600">Description: {selectedQuery.descript}</p>
              <Badge className="mt-4 bg-green-900 text-white">{selectedQuery.badge}</Badge>
              <Button
                className="mt-4 w-full bg-[#267B60] hover:bg-green-900"
                onClick={closeModal}
              >
                Close
              </Button>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default ClientQuery;
