import ChartBox from '@/components/client/ChartBox';
import HeroCard from '@/components/client/HeroCard';
import React from 'react';

const ClientDashboard = () => {
    // Define an array with data for each HeroCard
    const cardsData = [
         { head: "Active Queries", count: 87, status: "", btn_text: "Resolve Now" },
        { head: "Payments Status", count: 45, status: "Pending", btn_text: "View Payments" },
        { head: "Service Status", count: 45, status: "Active", btn_text: "View Payments" },
        { head: "Service Status", count: 45, status: "Active", btn_text: "View Payments" },

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
        <div className='mt-[6%] h-[100vh] bg-white px-6 py-6'>
            <div className='dashboard_hero'>
                <div className='dashboard_hero_card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                     {cardsData.map((card, index) => (
                        <HeroCard
                            key={index}
                            head={card.head}
                            count={card.count}
                            btn_text={card.btn_text}
                            status={card.status}
                        />
                    ))}

                </div>
                <div className='mt-6'>
                    {/* <ChartBox chartData={chartData} /> */}
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
