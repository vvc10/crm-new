import ChartBox from '@/components/client/ChartBox';
import HeroCard from '@/components/client/HeroCard';
import React, { useEffect, useState } from 'react';
import { HiExclamation } from 'react-icons/hi';
import axios from 'axios';

const ClientDashboard = () => {
    const [queryData, setQueryData] = useState([]);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const token = localStorage.getItem("auth-token");
                if (!token) {
                    setError("Authentication token missing. Please log in again.");
                    console.log("No auth token found.");
                    return;
                }

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/queries/user`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setQueryData(response.data || []);  
                setLoading(false); 
            } catch (err) {
                setError("Failed to fetch queries. Please try again later.");
                console.error("Error fetching queries:", err);  
                setLoading(false);  
            }
        };

        fetchQueries();
    }, []);

    const cardsData = [
        {
            head: "Active Queries",
            count: loading ? "Loading..." : queryData.length,
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

    const generateChartData = () => {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const queriesPerMonth = Math.floor(queryData.length / months.length);
        return months.map((month, index) => ({
            name: month,
            queries: queriesPerMonth * (index + 1), // Example logic, customize based on API
        }));
    };

    const chartData = generateChartData();

    return (
        <div className="min-h-screen pt-[20%] md:pt-[10%] bg-white px-6 pb-4">
            <div className="dashboard_hero">
                <div className="dashboard_hero_card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cardsData.map((card, index) => (
                        <HeroCard
                            key={index}
                            head={card.head}
                            count={card.count}
                            btn_text={card.btn_text}
                            status={card.status}
                            icon={card.icon}
                            path={card.path}
                        />
                    ))}
                </div>
                <div className="mt-6">
                    <div className="chart-container w-full h-auto">
                        <ChartBox chartData={chartData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
