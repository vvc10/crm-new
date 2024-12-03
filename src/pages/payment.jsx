import React from 'react'
import AdminPayment from './admin/adminpayment/payment'
import ClientPayment from './user/userPayment/clientPayment'
import ClientNavbar from '@/components/navBar/ClientNavbar'

const payment = () => {
    return (
        <div>

            <ClientNavbar />
            <ClientPayment />

        </div>
    )
}

export default payment
