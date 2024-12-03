import React from 'react'
import AdminUser from './admin/adminuser/user'
import NavBar from '@/components/navBar/Navbar'
import ClientPayment from './user/userPayment/clientPayment'
import ClientNavbar from '@/components/navBar/ClientNavbar'

const user = () => {
    return (
        <div>
            <ClientNavbar />
            <ClientPayment />
        </div>
    )
}

export default user
