import ClientNavbar from '@/components/navbar/ClientNavbar'
import React from 'react'
import ClientQuery from './user/userquery/query'

const query = () => {
  return (
    <div>
      <ClientNavbar/>
      <ClientQuery/>
    </div>
  )
}

export default query
