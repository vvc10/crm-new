'use client';

import ChartBox from '@/components/admin/ChartBox';
import HeroCard from '@/components/admin/HeroCard';
import AdminNavbar from '@/components/navbar/AdminNavBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [queries, setQueries] = useState([]);
    const [payments, setPayments] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);



    const fetchPayments = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                console.error("No token found");
                return;
            }

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/payments/admin`, {
                timeout: 10000,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            setPayments(response.data);
        } catch (error) {
            console.error("Error fetching payments:", error);
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchQueries = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/queries/admin/new`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
            });
            setQueries(response.data);
        } catch (error) {
            console.error("Error fetching queries:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchQueryStats = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/queries/stats`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
            });
            setChartData(response.data); // Response should include monthly query stats
        } catch (error) {
            console.error("Error fetching query stats:", error.message);
        }
    };

    useEffect(() => {
        fetchPayments();
        fetchUsers();
        fetchQueries();
        fetchQueryStats();
    }, []);

    const cardsData = [
        { head: "Total Users", count: users.length, btn_text: "View Users", path: '/admin/adminuser/user' },
        { head: "Active Queries", count: queries.length, btn_text: "Resolve Now", path: '/admin/adminquery/query' },
        { head: "Payments Processed", count: payments.length, btn_text: "View Payments", path: '/admin/adminpayment/payment' },
    ];

    return (
        <>
            <AdminNavbar />
            <div className="min-h-screen pt-[20%] md:pt-[10%] bg-white px-6">
                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <span className="text-gray-500">Loading...</span>
                    </div>
                ) : (
                    <div className="dashboard_hero">
                        <div className="dashboard_hero_card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        <div className="mt-6">
                            <ChartBox chartData={chartData} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminDashboard;
