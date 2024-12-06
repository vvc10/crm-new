import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AdminNavbar from "@/components/navbar/AdminNavBar";
import { MdDelete, MdOutlineDelete } from "react-icons/md";
import { jsPDF } from "jspdf";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoDownloadOutline } from "react-icons/io5";

const AdminUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState({
        queryId: "",
        name: "",
        email: "",
        contact: "",
        address: "",
        location: "",
        descript: "",
        queryType: "",
        dateToVisit: "",
    });

    const [users, setUsers] = useState([
        {
            id: "#1234",
            name: "John Doe",
            email: "john@example.com",
            contact: "123-456-7890",
            address: "123 Main St",
            location: "New York",
            queries: 1,
            descript: "Technical support needed.",
            queryType: "Technical",
            dateToVisit: "2024-12-10",
            solved: false,
        },
        {
            id: "#5678",
            name: "Jane Doe",
            email: "jane@example.com",
            contact: "987-654-3210",
            address: "456 Elm St",
            location: "Los Angeles",
            queries: 1,
            descript: "General query about services.",
            queryType: "General",
            dateToVisit: "2024-12-12",
            solved: false,
        },
    ]);

    const [selectedUsers, setSelectedUsers] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
        setSelectedQuery({
            queryId: "",
            name: "",
            email: "",
            contact: "",
            address: "",
            location: "",
            descript: "",
            queryType: "",
            dateToVisit: "",
        });
    };

    const closeModal = () => setIsModalOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedQuery({ ...selectedQuery, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            id: `#${Math.floor(Math.random() * 10000)}`,
            ...selectedQuery,
            solved: false,
        };
        setUsers([...users, newUser]);
        closeModal();
    };

    const handleDeleteUser = (userId) => {
        setUsers(users.filter((user) => user.id !== userId));
    };

    const handleMarkAsSolved = (userId) => {
        setUsers(users.map((user) =>
            user.id === userId ? { ...user, solved: true } : user
        ));
    };

    const handleCheckboxChange = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const handleDeleteSelectedUsers = () => {
        setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
        setSelectedUsers([]);
    };

    const downloadPDF = (userList) => {
        const doc = new jsPDF();
        userList.forEach((user, index) => {
            doc.text(`User Details: ${user.name}`, 10, 10 + index * 90);
            doc.text(`ID: ${user.id}`, 10, 20 + index * 90);
            doc.text(`Email: ${user.email}`, 10, 30 + index * 90);
            doc.text(`Contact: ${user.contact}`, 10, 40 + index * 90);
            doc.text(`Address: ${user.address}`, 10, 50 + index * 90);
            doc.text(`Location: ${user.location}`, 10, 60 + index * 90);
            doc.text(`Query Description: ${user.descript}`, 10, 70 + index * 90);
            doc.text(`Query Type: ${user.queryType}`, 10, 80 + index * 90);
            doc.text(`Date to Visit: ${user.dateToVisit}`, 10, 90 + index * 90);
            if (index < userList.length - 1) {
                doc.addPage();
            }
        });
        doc.save("users_details.pdf");
    };

    return (
        <>
            <AdminNavbar />
            <div className="pt-[20%] md:pt-[10%] min-h-screen bg-white px-6">
                <div className="space-y-6 text-gray-700">
                    {/* Header */}
                    <div className="flex flex-col gap-8 md:gap-2 text-left md:flex-row justify-between items-center">
                        <h1 className="text-2xl font-[400] text-left w-[100%] md:w-auto text-gray-800">
                            Users <span className="text-lg text-gray-500">({users.length})</span>
                        </h1>
                        <div className="flex items-center space-x-4">
                            <Button onClick={openModal} className=" bg-op-green text-gray-700">
                                <AiOutlineUserAdd /> Add User
                            </Button>
                            <Button
                                onClick={() => downloadPDF(users.filter((user) => selectedUsers.includes(user.id)))}
                                className="bg-green-600 text-white"
                            >
                                <IoDownloadOutline /> Download PDF
                            </Button>

                        </div>
                    </div>

                    {/* User Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white shadow rounded-lg">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600">
                                    <th className="py-3 px-4">Select</th>
                                    <th className="py-3 px-4">Name</th>
                                    <th className="py-3 px-4">ID</th>
                                    <th className="py-3 px-4">Email</th>
                                    <th className="py-3 px-4">Contact</th>
                                    <th className="py-3 px-4">Address</th>
                                    <th className="py-3 px-4">Location</th>
                                    <th className="py-3 px-4">Query Description</th>
                                    <th className="py-3 px-4">Query Type</th>
                                    <th className="py-3 px-4">Date to Visit</th>
                                    <th className="py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 text-center flex flex-row gap-2">
                                            {selectedUsers.includes(user.id) && (
                                                <Button
                                                    onClick={handleDeleteSelectedUsers}
                                                    className="text-red-600 text-[24px] bg-transparent cursor-pointer"
                                                >
                                                    <MdOutlineDelete />
                                                </Button>
                                            )}

                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user.id)}
                                                onChange={() => handleCheckboxChange(user.id)}
                                            />
                                        </td>

                                        <td className="py-2 px-4">{user.name}</td>
                                        <td className="py-2 px-4">{user.id}</td>
                                        <td className="py-2 px-4">{user.email}</td>
                                        <td className="py-2 px-4">{user.contact}</td>
                                        <td className="py-2 px-4">{user.address}</td>
                                        <td className="py-2 px-4">{user.location}</td>
                                        <td className="py-2 px-4">{user.descript}</td>
                                        <td className="py-2 px-4">{user.queryType}</td>
                                        <td className="py-2 px-4">{user.dateToVisit}</td>
                                        <td className="py-2 px-4 flex space-x-2">
                                            <Button
                                                onClick={() => handleMarkAsSolved(user.id)}
                                                className={`text-green-800 shadow-none ${user.solved
                                                    ? "border-2 border-gray-200 cursor-not-allowed"
                                                    : "border-2 border-op-green hover:bg-op-green"
                                                    }`}
                                                disabled={user.solved}
                                            >
                                                {user.solved ? "Solved" : "Mark as Solved"}
                                            </Button>
                                            <Button
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="hover:opacity-80 text-red-500"
                                            >
                                                <MdDelete />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center overflow-x-scroll overflow-y-hidden justify-center z-50">
                        <div className="bg-white text-gray-700 px-6 pt-6 rounded-lg shadow-lg h-[80%] overflow-x-scroll  w-[90%] md:w-[60%]">
                            <h2 className="text-lg font-bold mb-4">Add User</h2>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                {[
                                    { name: "name", type: "text", label: "Name" },
                                    { name: "email", type: "email", label: "Email" },
                                    { name: "contact", type: "text", label: "Contact" },
                                    { name: "address", type: "text", label: "Address" },
                                    { name: "location", type: "text", label: "Location" },
                                    { name: "descript", type: "text", label: "Query Description" },
                                    { name: "queryType", type: "text", label: "Query Type" },
                                    { name: "dateToVisit", type: "date", label: "Date to Visit" },
                                ].map((input) => (
                                    <div key={input.name} className="space-y-1">
                                        <label
                                            htmlFor={input.name}
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            {input.label}
                                        </label>
                                        <input
                                            id={input.name}
                                            name={input.name}
                                            type={input.type}
                                            value={selectedQuery[input.name]}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-lg"
                                        />
                                    </div>
                                ))}

                            </form>
                            <div className="flex justify-end w-full gap-2 py-3 bg-white sticky bottom-0">
                                <Button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-400 text-white"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-green-600 text-white">
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminUser;
