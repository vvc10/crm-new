"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HiArrowRight } from "react-icons/hi";

const HeroCard = ({ head, count, btn_text, status, icon, path }) => {
  // State to hold client-side data
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set flag to true after first render (client-side)
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a fallback or nothing on the server side to avoid mismatch
    return null;
  }

  return (
    <div className="bg-oc-purple h-[190px] rounded-lg shadow-md items-start px-4 py-4 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="text-lg font-semibold text-gray-700">{head}</div>
        <div className="text-gray-600 flex flex-row gap-2 items-center mt-1">
          <span className="pending_i">{icon}</span>
          {status}
        </div>
      </div>

      {/* Count */}
      {count && (
        <div className="text-3xl font-bold text-[#605CFF] my-4">{count}</div>
      )}

      {/* Button */}
      {path && path !== "/service" && (
        <Link
          href={path}
          className="px-4 py-2 flex justify-between items-center text-left text-[16px] bg-oc-purple w-full text-[#605CFF] rounded-md hover:bg-[#605CFF] hover:text-white transition duration-200"
        >
          <span>{btn_text}</span>
          <HiArrowRight />
        </Link>
      )}
    </div>
  );
};

HeroCard.defaultProps = {
  head: "",
  count: null,
  btn_text: "Click Here",
  status: "",
  icon: null,
  path: "#",
};

export default HeroCard;
