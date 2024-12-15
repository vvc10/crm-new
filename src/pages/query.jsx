import React from 'react'
import ClientNavbar from '@/components/navbar/ClientNavbar'
import ClientQuery from './user/userquery/query'
import ProtectedRoute from '@/app/ProtectedRoute'

const query = () => {
    return (
        <ProtectedRoute>
        <div className='query'>
            <ClientNavbar />
            <ClientQuery />
        </div>
        </ProtectedRoute>
    )
}

export default query
