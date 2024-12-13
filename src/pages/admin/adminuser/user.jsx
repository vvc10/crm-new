import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AdminNavbar from "@/components/navbar/AdminNavBar";
import { MdDelete, MdOutlineDelete } from "react-icons/md";
import { jsPDF } from "jspdf";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoDownloadOutline } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";

import axios from "axios";

const AdminUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState({
        queryId: "",
        name: "",
        email: "",
        contact_number: "",
        address: "",
        location: "",
        descript: "",
        queryType: "",
        created_at: "",
    });

    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to get the token from local storage
    const getAdminToken = () => {
        return localStorage.getItem("adminToken") || ""; // Use 'adminToken' instead of hardcoded 'jwt_token'
    };

    // Fetch users from the API
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/users`, {
                headers: {
                    Authorization: `Bearer ${getAdminToken()}`,
                },
            });
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
        setSelectedQuery({
            queryId: "",
            name: "",
            email: "",
            contact_number: "",
            address: "",
            location: "",
            descript: "",
            queryType: "",
            created_at: "",
        });
    };

    const closeModal = () => setIsModalOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedQuery({ ...selectedQuery, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            ...selectedQuery,
            solved: false,
        };

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/users`, newUser, {
                headers: {
                    Authorization: `Bearer ${getAdminToken()}`,
                },
            });
            fetchUsers();
            closeModal();
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${getAdminToken()}`,
                },
            });
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEditUser = async (e) => {
        e.preventDefault();
        const updatedUser = { ...selectedQuery };

        try {
            await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/users/${selectedQuery.queryId}`, updatedUser, {
                headers: {
                    Authorization: `Bearer ${getAdminToken()}`,
                },
            });
            fetchUsers();
            closeModal();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
    const openEditModal = (user) => {
        setSelectedQuery({
            queryId: user.id,
            name: user.name,
            email: user.email,
            contact_number: user.contact_number, // Corrected field
            address: user.address,
            location: user.location,
            descript: user.descript,
            queryType: user.queryType,
            created_at: user.created_at,
        });
        setIsModalOpen(true);
    };


    const handleCheckboxChange = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const handleDeleteSelectedUsers = async () => {
        try {
            await Promise.all(
                selectedUsers.map((userId) =>
                    axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/users/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${getAdminToken()}`,
                        },
                    })
                )
            );
            fetchUsers();
            setSelectedUsers([]);
        } catch (error) {
            console.error("Error deleting selected users:", error);
        }
    };

    const downloadPDF = (userList) => {
        // Check if no users are selected
        if (userList.length === 0) {
            alert("Please select at least one user to download the PDF.");
            return;
        }
    
        const doc = new jsPDF();
        userList.forEach((user, index) => {
            doc.text(`User Details: ${user.name}`, 10, 10 + index * 90);
            doc.text(`ID: ${user.id}`, 10, 20 + index * 90);
            doc.text(`Email: ${user.email}`, 10, 30 + index * 90);
            doc.text(`Contact Number: ${user.contact_number}`, 10, 40 + index * 90); // Corrected label
            doc.text(`Address: ${user.address}`, 10, 50 + index * 90);
            doc.text(`Location: ${user.location}`, 10, 60 + index * 90);
            doc.text(`Query Description: ${user.descript}`, 10, 70 + index * 90);
            doc.text(`Query Type: ${user.queryType}`, 10, 80 + index * 90);
            doc.text(`Date to Visit: ${user.created_at}`, 10, 90 + index * 90);
            if (index < userList.length - 1) {
                doc.addPage();
            }
        });
        doc.save("users_details.pdf");
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <AdminNavbar />
            <div className="pt-[20%] md:pt-[10%] min-h-screen bg-white px-6">
                <div className="space-y-6 text-gray-700">
                    <div className="flex flex-col gap-8 md:gap-2 text-left md:flex-row justify-between items-center z-[1000] md:z-[8000]">
                        <h1 className="text-2xl font-[400] text-left w-[100%] md:w-auto text-gray-800">
                            Users <span className="text-lg text-gray-500">({users.length})</span>
                        </h1>
                        <div className="flex items-center space-x-4 z-[1000] md:z-[5000]">
                            {/* <Button onClick={} className=" bg-op-green text-gray-700">
                                <AiOutlineUserAdd /> Add User
                            </Button> */}
                            <Button
                                onClick={() => downloadPDF(users.filter((user) => selectedUsers.includes(user.id)))}
                                className="bg-green-600 text-white"
                            >
                                <IoDownloadOutline /> Download PDF
                            </Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white shadow rounded-lg">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600">
                                    <th className="py-3 px-4">Select</th>
                                    <th className="py-3 px-4">Name</th>

                                    <th className="py-3 px-4">Email</th>
                                    <th className="py-3 px-4">Contact</th>
                                    <th className="py-3 px-4">Address</th>
                                    <th className="py-3 px-4">Location</th>
                                    <th className="py-3 px-4">Join on</th>

                                    <th className="py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50 even:bg-gray-100 text-sm text-gray-800"
                                    >
                                        <td className="py-2 px-4 text-center">
                                            <input
                                                type="checkbox"
                                                className="rounded text-op-green focus:ring focus:ring-op-green"
                                                checked={selectedUsers.includes(user.id)}
                                                onChange={() => handleCheckboxChange(user.id)}
                                                aria-label={`Select user ${user.name}`}
                                            />
                                        </td>
                                        <td className="py-2 px-4 font-medium">{user.name}</td>
                                        {/* <td className="py-2 px-4">{user.id}</td> */}
                                        <td className="py-2 px-4">{user.email}</td>
                                        <td className="py-2 px-4">{user.contact_number}</td>
                                        <td className="py-2 px-4">{user.address}</td>
                                        <td className="py-2 px-4">{user.location}</td>
                                        <td className="py-2 px-4">{user.created_at}</td>
        
                                        <td className="py-2 px-4 w-fit m-auto items-center flex space-x-2">
                                             
                                            <td className="py-2 px-4 flex space-x-2">

                                                <td className="py-2 px-4 flex space-x-2">
                                                    <Button
                                                        onClick={() => openEditModal(user)}
                                                        className="text-blue-500 bg-gray-100 hover:bg-gray-200 flex items-center gap-1"
                                                    >
                                                      <MdEditDocument/> Edit
                                                    </Button>
                                                    <Button
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="text-red-500 bg-gray-100 hover:bg-gray-200 flex items-center gap-1"
                                            >
                                                <MdDelete size={16} />  
                                                 
                                            </Button>
                                                </td>


                                            </td>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                            <form
                                onSubmit={handleEditUser}
                                className="bg-white p-6 rounded shadow-md w-[90%] md:w-[400px] space-y-4"
                            >
                                <h2 className="text-lg font-semibold">Edit User</h2>
                                <input
                                    type="text"
                                    name="name"
                                    value={selectedQuery.name}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={selectedQuery.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="contact_number" // Updated name attribute
                                    value={selectedQuery.contact_number} // Corrected field
                                    onChange={handleInputChange}
                                    placeholder="Contact Number"
                                    className="w-full px-3 py-2 border rounded"
                                />

                                <input
                                    type="text"
                                    name="address"
                                    value={selectedQuery.address}
                                    onChange={handleInputChange}
                                    placeholder="Address"
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="location"
                                    value={selectedQuery.location}
                                    onChange={handleInputChange}
                                    placeholder="Location"
                                    className="w-full px-3 py-2 border rounded"
                                />
                               
                               
                                <input
                                    type="date"
                                    name="created_at"
                                    value={selectedQuery.created_at}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <div className="flex justify-end space-x-2">
                                    <Button onClick={closeModal} className="bg-gray-400">
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-green-500 text-white">
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default AdminUser;
 