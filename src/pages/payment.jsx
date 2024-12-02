import React from 'react'
import AdminPayment from './admin/adminPayment/adminPayment'
import NavBar from '@/components/navBar/Navbar'
import ClientPayment from './user/userPayment/clientPayment'

const payment = () => {
    return (
        <div>

            <NavBar />
            {/* if admin is logged in */}
            {/* <AdminPayment/> */}
            {/* if client is logged in */}
            <ClientPayment />

        </div>
    )
}

export default payment
