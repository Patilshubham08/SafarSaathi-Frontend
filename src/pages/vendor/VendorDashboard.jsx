import React, { useState } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import axios from 'axios';

/* ================= OVERVIEW ================= */
const VendorOverview = () => (
    <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-bold mb-2">Vendor Portal</h3>
        <p className="text-gray-500">Manage your travel packages.</p>
    </div>
);

/* ================= CREATE PACKAGE (DB MATCHING) ================= */
const CreatePackage = () => {
    const [pkg, setPkg] = useState({
        packageName: '',
        description: '',
        price: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        setPkg({ ...pkg, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const vendorId = localStorage.getItem("userId");
        if (!vendorId) {
            alert("Vendor not logged in");
            return;
        }

        const payload = {
            packageName: pkg.packageName,
            description: pkg.description,
            price: Number(pkg.price),
            imageUrl: pkg.imageUrl
        };

        console.log("SENDING:", payload);

        try {
            const token = localStorage.getItem("token");

await axios.post(
    `http://localhost:8080/api/packages/${vendorId}`,
    payload,
    {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
);


            alert("✅ Package created successfully");
            setPkg({ packageName: '', description: '', price: '', imageUrl: '' });
        } catch (err) {
            console.error(err);
            alert("Package creation failed");
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Create New Package</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="packageName"
                    placeholder="Package Name"
                    value={pkg.packageName}
                    onChange={handleChange}
                    required
                    className="w-full border p-3 rounded"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={pkg.description}
                    onChange={handleChange}
                    required
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={pkg.price}
                    onChange={handleChange}
                    required
                    className="w-full border p-3 rounded"
                />

                <input
                    name="imageUrl"
                    placeholder="Image URL"
                    value={pkg.imageUrl}
                    onChange={handleChange}
                    required
                    className="w-full border p-3 rounded"
                />

                <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
                    Create Package
                </button>
            </form>
        </div>
    );
};

/* ================= LAYOUT ================= */
const VendorDashboardLayout = () => (
    <div className="flex min-h-screen">
        <aside className="w-64 bg-white shadow p-4">
            <nav className="space-y-2">
                <Link to="/vendor" className="block px-3 py-2 hover:bg-purple-50 rounded">Overview</Link>
                <Link to="/vendor/create" className="block px-3 py-2 hover:bg-purple-50 rounded">New Package</Link>
                <Link to="/vendor/bookings" className="block px-3 py-2 hover:bg-purple-50 rounded">Bookings</Link>
            </nav>
        </aside>
        <main className="flex-1 p-6 bg-gray-100">
            <Outlet />
        </main>
    </div>
);

/* ================= ROUTES ================= */
const VendorDashboard = () => (
    <Routes>
        <Route element={<VendorDashboardLayout />}>
            <Route index element={<VendorOverview />} />
            <Route path="create" element={<CreatePackage />} />
            <Route path="bookings" element={<div>Bookings coming soon</div>} />
        </Route>
    </Routes>
);

export default VendorDashboard;
