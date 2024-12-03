"use client";


import React from 'react'
import AdminDashboard from './admin/admindashboard/dashboard'
import ClientDashboard from './user/userDashboard/clientDashboard';
import ClientNavbar from '@/components/navBar/ClientNavbar';

const main = () => {
  return (
    <div className=''>
      <ClientNavbar />
      <ClientDashboard />
    </div>
  )
}

export default main
