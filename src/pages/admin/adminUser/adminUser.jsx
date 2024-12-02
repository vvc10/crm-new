import React, { useState } from 'react'
import { Button } from "@/components/ui/button"

const AdminUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState({
        serviceType: "",
        descript: "",
        badge: ""
    });
    
    const [users, setUsers] = useState([
        {
            id: "#1234",
            name: "John Doe",
            email: "john@example.com",
            queries: 1,
        },
        {
            id: "#5678",
            name: "Jane Doe",
            email: "jane@example.com",
            queries: 1,
        }
    ]);

    const openModal = () => {
        setIsModalOpen(true);
        setSelectedQuery({
            serviceType: "",
            descript: "",
            badge: ""
        }); // Reset the form values when opening the modal
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedQuery({
            ...selectedQuery,
            [name]: value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            id: `#${Math.floor(Math.random() * 10000)}`, // Random ID generation
            name: selectedQuery.serviceType,
            email: `${selectedQuery.serviceType.toLowerCase()}@example.com`, // Placeholder email
            queries: 0, // Default queries for new users
        };
        setUsers([...users, newUser]);
        closeModal();
    };

    return (
        <div className="mt-[8%] h-full bg-white px-6 py-6">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex justify-between">
                    <h1 className="text-[20px] font-bold">Users
                        <span className='mx-3 text-[18px] text-gray-600'>({users.length})</span>
                    </h1>
                    <Button className="px-6 bg-[#267B60] hover:bg-green-900" onClick={openModal}>Add User</Button>
                </div>

                {/* Custom Table */}
                <div className="space-y-6"> {/* Gap between rows */}
                    <div className="grid grid-cols-4 font-bold text-gray-600 border-b pb-2">
                        <div>User</div>
                        <div>ID</div>
                        <div>Email</div>
                        <div>Queries</div>
                    </div>
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="grid grid-cols-4 items-center bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm border border-gray-200 px-4 py-4 transition-all duration-200"
                        >
                            <div>{user.name}</div>
                            <div>{user.id}</div>
                            <div>{user.email}</div>
                            <div>{user.queries}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for Add User */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
                        <h2 className="text-xl font-bold">Add User</h2>
                        <form className="space-y-4 mt-4" onSubmit={handleFormSubmit}>
                            {/* User Name */}
                            <div>
                                <label htmlFor="serviceType" className="block text-gray-600">User Name</label>
                                <input
                                    id="serviceType"
                                    name="serviceType"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    value={selectedQuery.serviceType}
                                    onChange={handleInputChange}
                                    placeholder="Enter user name"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="descript" className="block text-gray-600">Description</label>
                                <textarea
                                    id="descript"
                                    name="descript"
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    value={selectedQuery.descript}
                                    onChange={handleInputChange}
                                    placeholder="Enter description"
                                />
                            </div>

                            {/* Badge */}
                            <div>
                                <label htmlFor="badge" className="block text-gray-600">Status</label>
                                <input
                                    id="badge"
                                    name="badge"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    value={selectedQuery.badge}
                                    onChange={handleInputChange}
                                    placeholder="Enter status"
                                />
                            </div>

                            {/* Submit Button */}
                            <Button
                                className="w-full bg-[#267B60] hover:bg-green-900"
                                type="submit"
                            >
                                Add User
                            </Button>
                        </form>

                        {/* Close Modal */}
                        <Button
                            className="mt-4 w-full bg-gray-300 hover:bg-gray-400"
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

export default AdminUser;
