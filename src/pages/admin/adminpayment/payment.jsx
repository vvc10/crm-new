import React from 'react'
import { Button } from '@/components/ui/button'
import AdminNavbar from '@/components/navBar/AdminNavBar'


const AdminPayment = () => {
    const payments = [
        {
            id: "#1234",
            name: "John Doe",
            email: "john@example.com",
            payment: 1000,
        },
        {
            id: "#5678",
            name: "Jane Doe",
            email: "jane@example.com",
            payment: 1000,
        }
    ]


  return (
    <>
        <AdminNavbar/>
        <div className="mt-[6%] h-[100vh] bg-white px-6 py-6">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex justify-between">
                    <h1 className="text-[20px] text-black font-bold">Payments 
                    <span className='mx-3 text-[18px] text-gray-600'>({payments.length})</span>
                    </h1>
                    {/* <Button className="px-6 bg-[#267B60] hover:bg-green-900">Add User</Button> */}
                </div>

                {/* Custom Table */}
                <div className="space-y-6"> {/* Gap between rows */}
                    <div className="grid grid-cols-4 font-bold text-gray-600 border-b pb-2">
                        <div>User</div>
                        <div>ID</div>
                        <div>Email</div>
                        <div>Paid</div>
                    </div>
                    {payments.map((user) => (
                        <div
                            key={user.id}
                            className="grid grid-cols-4 items-center text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm border border-gray-200 px-4 py-4 transition-all duration-200"
                        >
                            <div>{user.name}</div>
                            <div>{user.id}</div>
                            <div>{user.email}</div>
                            <div>{user.payment}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>

  )
}

export default AdminPayment
