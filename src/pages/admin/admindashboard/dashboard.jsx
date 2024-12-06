'use client'
import ChartBox from '@/components/admin/ChartBox';
import HeroCard from '@/components/admin/HeroCard';
import AdminNavbar from '@/components/navBar/AdminNavBar';
import React from 'react';

const AdminDashboard = () => {
    // Define an array with data for each HeroCard
    const cardsData = [
        { head: "Total Users", count: 1200, btn_text: "View Users", path:'/admin/adminuser/user' },
        { head: "Active Queries", count: 87, btn_text: "Resolve Now", path:'/admin/adminquery/query' },
        { head: "Payments Processed", count: 45, btn_text: "View Payments", path:'/admin/adminpayment/payment' },
        // { head: "Completed Tasks", count: 342, btn_text: "View Tasks" },
    ];

    const chartData = [
        { name: 'Jan', queries: 40 },
        { name: 'Feb', queries: 30 },
        { name: 'Mar', queries: 70 },
        { name: 'Apr', queries: 50 },
        { name: 'May', queries: 60 },
        { name: 'Jun', queries: 20 },
        { name: 'Jul', queries: 80 },
        { name: 'Aug', queries: 30 },
        { name: 'Sep', queries: 90 },
        { name: 'Oct', queries: 40 },
        { name: 'Nov', queries: 50 },
        { name: 'Dec', queries: 20 },
    ];



    return (
        <>
            <AdminNavbar />
            <div className='min-h-screen pt-[20%] md:pt-[10%]   bg-white px-6'>
                <div className='dashboard_hero'>
                    <div className='dashboard_hero_card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {cardsData.map((card, index) => (
                            <HeroCard
                                key={index}
                                head={card.head}
                                count={card.count}
                                btn_text={card.btn_text}
                                path={card.path}
                            />
                        ))}

                    </div>
                    <div className='mt-6'>
                        <ChartBox chartData={chartData} />
                    </div>
                </div>
            </div>
        </>

    );
};

export default AdminDashboard;
