import React from 'react'
import ClientNavbar from '@/components/navbar/ClientNavbar'
import ClientQuery from './user/userquery/query'

const query = () => {
    return (
        <div className='query'>
            <ClientNavbar />
            <ClientQuery />
        </div>
    )
}

export default query
