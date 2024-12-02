import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AdminQuery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);

  const queryData = [
    { query: "Leaky Faucet", serviceType: "Plumbing", descript: "The kitchen faucet is constantly dripping.", badge: "pending" },
    { query: "Broken AC", serviceType: "HVAC", descript: "The living room AC is not cooling.", badge: "in-progress" },
    { query: "Clogged Sink", serviceType: "Plumbing", descript: "The bathroom sink is clogged.", badge: "completed" },
  ];

  const openModal = (query) => {
    setSelectedQuery(query);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuery(null);
  };

  return (
    <div className='mt-[8%] h-full bg-white px-6 py-6'>
      <div className="space-y-8">
        <div className="flex justify-between">
          <h1 className="text-[20px] font-bold">Queries
            <span className='mx-3 text-[18px] text-gray-600'>({queryData.length})</span>
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {queryData.map((card, index) => (
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
                      className="w-full bg-[#267B60] hover:bg-green-900"
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

      {/* Modal */}
      {isModalOpen && selectedQuery && (
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
      )}
    </div>
  );
};

export default AdminQuery;
