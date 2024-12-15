"use client";
import React, { useEffect, useState } from "react";
import ClientDashboard from "@/pages/user/userdashboard/Dashboard";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import ProtectedRoute from "@/app/ProtectedRoute";

const Dashboard = () => {


  return (
    <ProtectedRoute>
      <div>
        <ClientNavbar />
        <ClientDashboard />
      </div>
    </ProtectedRoute>

  );
};

export default Dashboard;
