import React from 'react'
import AdminUser from './admin/adminUser/adminUser'
import NavBar from '@/components/navBar/Navbar'
import ClientPayment from './user/userPayment/clientPayment'

const user = () => {
    return (
        <div>
            <NavBar />
            {/* if admin is logged in */}
            {/* <AdminUser /> */}
            {/* if client is logged in */}
            <ClientPayment />
        </div>
    )
}

export default user
