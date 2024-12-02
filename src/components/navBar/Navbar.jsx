import React from 'react'
import AdminNavbar from './AdminNavBar'
import ClientNavbar from './ClientNavbar'

const NavBar = () => {
  return (
    <div>
      {/* if admin is logged in */}
      {/* <AdminNavbar />  */}
      
      {/* if user is logged in */}
      <ClientNavbar />
    </div>
  )
}

export default NavBar
