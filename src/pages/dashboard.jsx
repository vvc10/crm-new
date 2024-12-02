"use client";


import React from 'react'
import AdminDashboard from './admin/adminDashboard/adminDashboard'
import NavBar from '@/components/navBar/Navbar';
import ClientDashboard from './user/userDashboard/clientDashboard';

const main = () => {
  return (
    <div className=''>
      <NavBar />
      {/* if admin is logged in */}
      {/* <AdminDashboard /> */}
      {/* if client is logged in */}
      <ClientDashboard/>
    </div>
  )
}

export default main
