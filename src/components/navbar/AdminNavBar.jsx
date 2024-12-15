"use client";
import React, { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router"; // Import useRouter for navigation

const AdminNavbar = () => {
  const tabs = [
    { name: "Dashboard", link: "/admin/admindashboard/dashboard" },
    { name: "Query", link: "/admin/adminquery/query" },
    { name: "User", link: "/admin/adminuser/user" },
    { name: "Payment", link: "/admin/adminpayment/payment" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0].link); // Default to Dashboard
  const router = useRouter(); // Initialize router for navigation

  // Set active tab on page load
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    } else {
      setActiveTab(tabs[0].link); // Default to Dashboard
    }
  }, [tabs]);

  // Save active tab to localStorage and update state
  const handleTabClick = (tabLink) => {
    setActiveTab(tabLink);
    localStorage.setItem("activeTab", tabLink);
  };

  // Handle logout by removing the adminToken and redirecting
  const handleLogout = async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      console.warn("No token found. Redirecting to login.");
      router.push("/");
      return;
    }


    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      localStorage.removeItem("adminToken");
      router.push("/");
    }
  };

  return (
    <div>
      {/* Navbar for Desktop */}
      <div className="items-center justify-between hidden px-6 py-4 bg-white md:flex fixed w-full top-0 z-[1000]">
        <div className="text-2xl font-bold text-[#267B60] cursor-pointer">
          <Link href="/admin/admindashboard/dashboard">PixelPath Admin</Link>
        </div>

        <div className="flex items-center justify-between gap-6 px-2 py-2 border-2 border-gray-300 rounded-[10px] shadow-md w-[406px]">
          {tabs.map((item) => (
            <Link key={item.name} href={item.link} passHref>
              <div
                onClick={() => handleTabClick(item.link)}
                className={`cursor-pointer px-2 py-2 text-black rounded-[8px] ${
                  activeTab === item.link
                    ? "bg-[rgba(38,123,96,0.8)] text-white"
                    : "bg-transparent"
                }`}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </div>

        <div className="relative">
          <div
            className="cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "#00ad4b", fontSize: "20px" }}
              className="w-5 h-5 rounded-full items-center"
            />
          </div>

          {isProfileOpen && (
            <div className="absolute top-14 right-0 text-gray-800 bg-gray-200 shadow-lg rounded-md p-2 w-48">
              <ul>
                <li
                  className="cursor-pointer py-2 px-4 hover:text-red-500 hover:bg-gray-200"
                  onClick={handleLogout} // Handle logout on click
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Navbar for Mobile */}
      <div className="md:hidden flex justify-between items-center px-6 py-5 z-[6000] bg-[#267B60] shadow-md fixed w-full top-0 ">
        <div className="text-2xl font-bold text-white">
          <Link href="/admin/admindashboard/dashboard">PixelPath Admin</Link>
        </div>
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="cursor-pointer z-[1200]" // Ensure button is above other elements
        >
          {isMenuOpen ? <HiX size={30} color="white" /> : <HiMenu size={30} color="white" />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={` transition-all duration-300 block md:hidden fixed w-full z-[5000] pt-[15%] ease-in-out overflow-hidden text-gray-800 bg-white shadow-md ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4 py-4 text-gray-800 z-[5000]">
          {tabs.map((item) => (
            <Link key={item.name} href={item.link} passHref>
              <div
                onClick={() => {
                  handleTabClick(item.link);
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 text-[16px] cursor-pointer rounded-md ${
                  activeTab === item.link
                    ? "bg-[rgba(38,123,96,0.8)] text-white"
                    : "text-[#555555]"
                }`}
              >
                {item.name}
              </div>
            </Link>
          ))}
          <div
            className="mt-4 cursor-pointer text-gray-700"
            onClick={handleLogout} // Handle logout on click
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
