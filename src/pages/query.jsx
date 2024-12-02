"use client";

import React from 'react'
 import NavBar from '@/components/navBar/Navbar'
import ClientQuery from '@/pages/user/userQuery/clientQuery';

const Query = () => {
    return (
        <div>
            <NavBar />
            {/* if admin is logged in */}
            {/* <AdminQuery /> */}
            {/* if client is logged in */}
            <ClientQuery />
        </div>
    )
}

export default Query
