import React from 'react'
import ClientNavbar from '@/components/navbar/ClientNavbar'
import ClientPayment from '@/pages/user/userpayment/payment'
import ProtectedRoute from '@/app/ProtectedRoute'

const Payment = () => {
    return (
        <ProtectedRoute>
        <div>

            <ClientNavbar />
            <ClientPayment />

        </div>
        </ProtectedRoute>
    )
}

export default Payment
