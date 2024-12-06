import ChartBox from '@/components/client/ChartBox';
import HeroCard from '@/components/client/HeroCard';
import React from 'react';
import { HiExclamation } from 'react-icons/hi';
 
const ClientDashboard = () => {
    // Define an array with data for each HeroCard
    const cardsData = [
        {
            head: "Active Queries",
             count: 87,
            status: "",
            btn_text: "View Query",
            path: '/query',
        },
        {
            head: "Payments Status",
            icon: <HiExclamation className="text-red" />,
            count: 45,
            status: "Pending",
            btn_text: "View Payments",
            path: '/payment',
        },
        {
            head: "Service Status",
             status: "Active",
            btn_text: "View Payments",
            path: '/service',
        },
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
        <div className="min-h-screen pt-[20%] md:pt-[10%]  bg-white px-6 pb-4">
            <div className="dashboard_hero">
                <div className="dashboard_hero_card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cardsData.map((card, index) => (
                        <HeroCard
                            key={index}
                            head={card.head}
                            count={card.count}
                            btn_text={card.btn_text}
                            status={card.status}
                            icon={card.icon}  // Make sure this is being passed correctly
                            path={card.path}
                        />
                    ))}
                </div>
                <div className="mt-6">
                    <div className="chart-container w-full h-auto ">
                        <ChartBox chartData={chartData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
