import Link from "next/link";
import React from "react";

const Landing = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen bg-gradient-to-r from-[#605CFF99] to-[#267B60] text-white">
      <h2 className="font-[700] text-[30px] px-4">Welcome to Pixelpath CRM Portal!</h2>
      <div className="relative flex w-80 h-14 shadow-lg rounded-md overflow-hidden">
        {/* Left - Client Login */}
        <Link
          href="/user/userlogin/login"
          className="w-1/2 flex justify-center items-center bg-[#605CFF99] text-white font-semibold hover:brightness-110 transition-all duration-300"
        >
          Client Login
        </Link>
        {/* Right - Admin Login */}
        <Link
          href="/admin/adminlogin/login"
          className="w-1/2 flex justify-center items-center bg-[#267B60] text-white font-semibold hover:brightness-110 transition-all duration-300"
        >
          Admin Login
        </Link>
         
      </div>
      <Link
          href="/dashboard"
          className="w-1/2 flex justify-center items-center bg-gray-599 text-white font-semibold hover:brightness-110 transition-all duration-300"
        >
        Continue as Guest
        </Link>
    </div>
  );
};

export default Landing;
