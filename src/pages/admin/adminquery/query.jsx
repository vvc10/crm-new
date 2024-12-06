import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminNavbar from '@/components/navbar/AdminNavBar';

const AdminQuery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [amount, setAmount] = useState(""); 

  // State to hold new and accepted queries
  const [newQueries, setNewQueries] = useState([
    { query: "Leaky Faucet", serviceType: "Plumbing", descript: "The kitchen faucet is constantly dripping.", badge: "pending" },
    { query: "Broken AC", serviceType: "HVAC", descript: "The living room AC is not cooling.", badge: "in-progress" },
    { query: "Clogged Sink", serviceType: "Plumbing", descript: "The bathroom sink is clogged.", badge: "completed" },
  ]);

  const [acceptedQueries, setAcceptedQueries] = useState([]);

  const openModal = (query) => {
    setSelectedQuery(query);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuery(null);
    setAmount(""); // Reset the amount field
  };

  const acceptQuery = (query) => {

    if (!amount) {
      alert("Please enter an amount before approving the query.");
      return;
    }

    // Remove the query from newQueries and add it to acceptedQueries

    setNewQueries(newQueries.filter(q => q !== query));
    setAcceptedQueries([...acceptedQueries, { ...query, paymentStatus: 'pending' }]);
    setIsModalOpen(false);
    setAmount(""); // Reset amount
  };

  return (
    <>
      <AdminNavbar />
      <div className='pt-[20%] md:pt-[10%] min-h-screen bg-white px-6'>
        <div className="space-y-8">
          <div className="flex justify-between">
            <h1 className="text-[20px] text-black font-bold">Queries
              <span className='mx-3 text-[18px] text-gray-600'>({newQueries.length})</span>
            </h1>
          </div>

          {/* New Queries Section */}
          <div className="space-y-8">
            {/* <h2 className="text-xl font-semibold text-gray-700">New Queries</h2> */}
            <div className="grid gap-4 md:grid-cols-2 text-gray-800">
              {newQueries.map((card, index) => (
                <div key={index}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="items-center">
                        {card.query}
                        <Badge className="justify-end font-[500] text-white bg-green-900 mx-4">{card.badge}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className='opacity-[80%]'>{card.serviceType}</h4>
                        <p>{card.descript}</p>
                        <Button
                          className="w-full text-white bg-[#267B60] hover:bg-green-900"
                          onClick={() => openModal(card)}
                        >
                          View more
                        </Button>
                        {/* <Button
                          className="mt-2 w-full text-white bg-blue-600 hover:bg-blue-800"
                          onClick={() => acceptQuery(card)}
                        >
                          Accept Query
                        </Button> */}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Accepted Queries Section */}

          {acceptedQueries.length > 0 ? (
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-gray-700">Accepted Queries</h2>
              <div className="grid gap-4 md:grid-cols-2 text-gray-800">
                {acceptedQueries.map((card, index) => (
                  <div key={index}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {card.query}
                          <Badge className="font-medium text-white bg-green-900 px-2 py-1">
                            {card.paymentStatus}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h4 className="text-opacity-80">{card.serviceType}</h4>
                          <p>{card.descript}</p>
                          <Button
                            className="w-full text-white bg-[#267B60] hover:bg-green-900"
                            onClick={() => openModal(card)}
                          >
                            View more
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ) : null}


        </div>

        {/* Modal */}
        {isModalOpen && selectedQuery && (
          <div className="fixed inset-0 text-gray-800 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
              <h2 className="text-xl font-bold">{selectedQuery.query}</h2>
              <p className="mt-2 text-gray-600">Service Type: {selectedQuery.serviceType}</p>
              <p className="mt-2 text-gray-600">Description: {selectedQuery.descript}</p>
              <Badge className="mt-4 bg-green-900 text-white">{selectedQuery.badge}</Badge>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Enter Amount</label>
                <input
                  type="number"
                  value={amount}
                  placeholder='Enter amount'
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md px-2 py-3 bg-gray-200 text-gray-500 border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className='flex flex-row gap-2 mt-2'>
                <Button
                  className="text-gray-600 w-[50%] bg-gray-200 hover:bg-gray-200"
                  onClick={closeModal}
                >
                  Close
                </Button>
                <Button
                  className="w-[50%] text-white bg-[#267B60] hover:bg-[#267B60]"
                  onClick={() => acceptQuery(selectedQuery)}
                >
                  Accept Query
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
