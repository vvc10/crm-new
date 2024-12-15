import React from 'react'
import ClientPayment from '@/pages/user/userpayment/payment'
import ClientNavbar from '@/components/navbar/ClientNavbar'
import ProtectedRoute from '@/app/ProtectedRoute'

const User = () => {
    return (
        <ProtectedRoute>
            <div>
                <ClientNavbar />
                <ClientPayment />
            </div>
        </ProtectedRoute>


    )
}

export default User
