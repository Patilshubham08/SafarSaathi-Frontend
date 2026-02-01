import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import { Trash2 } from 'lucide-react';

const PackageList = ({ refresh }) => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadPackages();
    }, []);

    const loadPackages = async () => {
        try {
            // ✅ FIX 1: correct endpoint (NO /api twice)
            const result = await api.get('/packages');
            setPackages(result.data);
        } catch (error) {
            console.error("Error loading packages:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookNow = async (pkg) => {
        if (!user) {
            alert("Please login to book a trip!");
            navigate('/login');
            return;
        }

        const tripPayload = {
            tripName: pkg.packageName,
            budget: pkg.price,
            tripStatus: "SCHEDULED",
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0]
        };

        try {
            await api.post(
    `/trips/${user.userId}?packageId=${pkg.packageId}`,
    tripPayload,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
);


            alert(`Success! You have booked ${pkg.packageName}.`);
            navigate('/customer/my-bookings');
        } catch (err) {
            console.error("Booking Error:", err);
            alert("Booking failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this package?")) {
            try {
                await api.delete(`/packages/${id}`);
                loadPackages();
            } catch (error) {
                alert("Could not delete package.");
            }
        }
    };

    if (loading) {
        return <div className="text-center py-20">Loading packages...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-10 text-center">
                Available Travel Packages
            </h1>

            {packages.length === 0 && (
                <p className="text-center text-gray-500">
                    No packages available
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                    <div
                        key={pkg.packageId}
                        className="bg-white rounded-3xl shadow p-6"
                    >
                        <img
                            src={pkg.imageUrl}
                            alt={pkg.packageName}
                            className="h-40 w-full object-cover rounded-xl mb-4"
                        />

                        <h3 className="text-xl font-bold mb-2">
                            {pkg.packageName}
                        </h3>

                        <p className="text-gray-600 mb-2">
                            ₹{pkg.price}
                        </p>

                        <p className="text-sm text-gray-500 mb-4">
                            {pkg.description}
                        </p>

                        {/* ✅ CUSTOMER */}
                        {user?.userRole === 'CUSTOMER' && (
                            <button
                                onClick={() => handleBookNow(pkg)}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Book
                            </button>
                        )}

                        {/* ✅ VENDOR */}
                        {user?.userRole === 'VENDOR' && (
                            <button
                                onClick={() => handleDelete(pkg.packageId)}
                                className="text-red-500 ml-4"
                            >
                                <Trash2 />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PackageList;
