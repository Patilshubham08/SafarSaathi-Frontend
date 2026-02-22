import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import MyBookings from './MyBookings';

const CustomerDashboard = () => {
    const { user, logout } = useAuth();
    const [bookings, setBookings] = useState([]);

    const loadBookings = () => {
        if (user?.userId) {
            api.get(`/trips/customer/${user.userId}`)
                .then(res => {
                    setBookings(res.data);
                })
                .catch(err => { });
        }
    };

    useEffect(() => {
        loadBookings();
    }, [user]);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-white border-r p-6 shadow-sm">
                <div className="mb-8">
                    <h2 className="text-xl font-black text-blue-600">Safar-Saathi</h2>
                </div>
                <nav className="space-y-4">
                    <Link to="/customer" className="block font-bold text-gray-700 hover:text-blue-600">Overview</Link>
                    <Link to="/customer/my-bookings" className="block font-bold text-gray-700 hover:text-blue-600">My Bookings</Link>
                    <button
                        onClick={logout}
                        className="mt-10 text-red-500 font-bold hover:bg-red-50 w-full text-left p-2 rounded transition-colors"
                    >
                        Logout
                    </button>
                </nav>
            </aside>

            <main className="flex-1 p-10">
                <Routes>
                    <Route index element={
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-blue-100">
                            <h1 className="text-3xl font-black text-gray-800">Welcome, {user?.name}!</h1>
                            <p className="mt-2 text-gray-500 font-medium">
                                You have <span className="text-blue-600 font-bold">{bookings.length}</span> active journeys.
                            </p>
                        </div>
                    } />

                    <Route path="my-bookings" element={
                        <MyBookings bookings={bookings} refresh={loadBookings} />
                    } />
                </Routes>
            </main>
        </div>
    );
};

export default CustomerDashboard;