// src/pages/admin/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import { Images, Film, Users, Mountain } from 'lucide-react';

const API_DOCS_URL ='http://localhost:5000/api/documentations';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        total: 0,
        events: 0,
        trips: 0,
        meetGreet: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndProcessData = async () => {
        try {
            const response = await fetch(API_DOCS_URL);
            if (!response.ok) throw new Error('Failed to fetch data from server.');

            const documentations = await response.json();
            if (Array.isArray(documentations)) {
            const categoryCounts = documentations.reduce(
                (acc, doc) => {
                if (doc.category === 'Event') acc.events++;
                else if (doc.category === 'Trip') acc.trips++;
                else if (doc.category === 'Meet & Greet') acc.meetGreet++;
                return acc;
                },
                { events: 0, trips: 0, meetGreet: 0 }
            );

            setStats({
                total: documentations.length,
                ...categoryCounts,
            });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchAndProcessData();
    }, []);

    const chartData = [
        { name: 'Event', count: stats.events },
        { name: 'Trip', count: stats.trips },
        { name: 'Meet & Greet', count: stats.meetGreet },
    ];

    // Hitung nilai maksimum untuk menyesuaikan sumbu Y
    const maxValue = Math.max(stats.events, stats.trips, stats.meetGreet, 0);

    if (loading) return <p className="text-gray-400">Loading Dashboard Statistics...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <>
        {/* Dashboard Header */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Dashboard
        </h1>

        {/* Statistic Cards */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                Total Works
                </CardTitle>
                <Images className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                Events
                </CardTitle>
                <Film className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.events}</div>
            </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                Trips
                </CardTitle>
                <Mountain className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.trips}</div>
            </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                Meet & Greet
                </CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.meetGreet}</div>
            </CardContent>
            </Card>
        </div>

        {/* Bar Chart */}
        <div className="grid gap-4 md:gap-8 mt-8">
            <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
                <CardTitle>Works by Category</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="w-full h-[300px] sm:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f6d68a" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ffb347" stopOpacity={0.2} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                        domain={[0, maxValue + 1]} // otomatis menyesuaikan data tertinggi
                    />
                    <Tooltip
                        contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #4b5563',
                        borderRadius: '0.5rem',
                        }}
                        cursor={{ fill: 'rgba(255, 179, 71, 0.1)' }}
                    />
                    <Bar dataKey="count" fill="url(#colorUv)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                </div>
            </CardContent>
            </Card>
        </div>
        </>
    );
}