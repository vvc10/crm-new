"use client";
import React, { useEffect, useState } from "react";
import ClientDashboard from "@/pages/user/userdashboard/dashboard";
import ClientNavbar from "@/components/navbar/ClientNavbar";

const Dashboard = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);  
  }, []);

  if (!isClient) {
    return null;  
  }

  return (
    <div>
     <ClientNavbar/>
      <ClientDashboard />
    </div>
  );
};

export default Dashboard;
