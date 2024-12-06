"use client";
import React, { useEffect, useState } from "react";
import ClientDashboard from "@/pages/user/userdashboard/Dashboard";
import ClientNavbar from "@/components/navbar/ClientNavbar";

const Dashboard = () => {
 

  return (
    <div>
     <ClientNavbar/>
      <ClientDashboard />
    </div>
  );
};

export default Dashboard;
