"use client";
import React, { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

const ClientNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard"); // Default active tab
  const tabs = ["Dashboard", "Query", "Payment"];

  useEffect(() => {
    // Retrieve active tab from localStorage on component mount
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) setActiveTab(savedTab);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update active tab
    localStorage.setItem("activeTab", tab); // Save active tab to localStorage
  };

  return (
    <div>
      {/* Navbar for Desktop */}
      <div className="flex items-center justify-between px-6 py-4 bg-white hidden md:flex fixed w-full top-0 z-50">
        {/* Left side logo */}
        <div className="text-2xl font-bold text-[#605CFF] cursor-pointer">
          <Link href="/">
           Client Logo
          </Link>

        </div>

        {/* Middle Navigation Links */}
        <div className="flex items-center justify-between gap-6 px-2 py-2 border-2 border-gray-300 rounded-[10px] shadow-md w-[406px]">
          {tabs.map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} passHref>
              <div
                onClick={() => handleTabClick(item)} // Set active tab on click
                className={`cursor-pointer px-2 py-2 text-black rounded-[8px] ${activeTab === item
                    ? "bg-oc-purple text-gray-700"
                    : "bg-transparent"
                  }`}
              >
                {item}
              </div>
            </Link>
          ))}
        </div>

        {/* Right side profile */}
        <div className="relative">
          <div
            className="cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <Image
            height={100}
            width={100}
              src="/profile-icon.png"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute top-14 right-0 bg-white shadow-lg rounded-md p-2 w-48">
              <ul>
                <li className="cursor-pointer py-2 px-4 hover:bg-gray-200">
                  <Link href="/logout">Logout</Link> {/* Link for logout */}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Navbar for Mobile */}
      <div className="md:hidden flex justify-between items-center px-6 py-5 bg-[#267B60] shadow-md fixed w-full top-0 z-50">
        <div className="text-2xl font-bold text-white">AdminLogo</div>
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="cursor-pointer"
        >
          {isMenuOpen ? (
            <HiX size={30} color="white" />
          ) : (
            <HiMenu size={30} color="white" />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden bg-white shadow-md ${isMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          {tabs.map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} passHref>
              <div
                onClick={() => {
                  handleTabClick(item); // Update active tab
                  setIsMenuOpen(false); // Close menu after selection
                }}
                className={`px-4 py-2 text-[16px] cursor-pointer rounded-md ${activeTab === item
                    ? "bg-[rgba(38, 123, 96, 0.8)] text-white"
                    : "text-[#555555]"
                  }`}
              >
                {item}
              </div>
            </Link>
          ))}
          <div className="mt-4 cursor-pointer text-[#267B60]">
            <Link href="/logout">Logout</Link> {/* Link for logout */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientNavbar;
