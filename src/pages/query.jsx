"use client";

import React from 'react'
import ClientQuery from '@/pages/user/userQuery/clientQuery';
import ClientNavbar from '@/components/navBar/ClientNavbar';

const Query = () => {
    return (
        <div>
            <ClientNavbar />
            <ClientQuery />
        </div>
    )
}

export default Query
