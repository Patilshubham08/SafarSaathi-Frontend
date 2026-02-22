import React, { useState } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import api from '../../api/axios';
import { LayoutDashboard, PlusCircle, ShoppingBag, PieChart, Loader2 } from 'lucide-react';

const VendorOverview = () => (
    <div className="bg-black/20 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] text-white">
        <h3 className="text-3xl font-stylish font-black mb-4">Vendor Command Center</h3>
        <p className="text-white/60 text-lg font-medium">Welcome back! Here you can craft extraordinary journeys.</p>
    </div>
);

const CreatePackage = () => {
    const [loading, setLoading] = useState(false);
    const [pkg, setPkg] = useState({
        packageName: '',
        description: '',
        price: '',
        imageUrl: '',
        highlights: '',
        restaurants: ''
    });

    const handleChange = (e) => {
        setPkg({ ...pkg, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const vendorId = localStorage.getItem("userId");
        const payload = { ...pkg, price: Number(pkg.price) };


        try {
            const resp = await api.post(`/packages/${vendorId}`, payload);
            alert("Package created!");
            setPkg({ packageName: '', description: '', price: '', imageUrl: '', highlights: '', restaurants: '' });
        } catch (err) {
            alert("Failed: " + JSON.stringify(err.response?.data || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">New Journey</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="packageName" placeholder="Package Name" value={pkg.packageName} onChange={handleChange} required className="w-full border p-3 rounded" />
                <input type="number" name="price" placeholder="Price" value={pkg.price} onChange={handleChange} required className="w-full border p-3 rounded" />
                <textarea name="description" placeholder="Description" value={pkg.description} onChange={handleChange} required className="w-full border p-3 rounded" />
                <input name="imageUrl" placeholder="Image URL" value={pkg.imageUrl} onChange={handleChange} required className="w-full border p-3 rounded" />
                <input name="highlights" placeholder="Highlights" value={pkg.highlights} onChange={handleChange} className="w-full border p-3 rounded" />
                <input name="restaurants" placeholder="Restaurants" value={pkg.restaurants} onChange={handleChange} className="w-full border p-3 rounded" />
                <button disabled={loading} className="w-full bg-purple-600 text-white p-3 rounded font-bold">
                    {loading ? "Publishing..." : "Publish Package"}
                </button>
            </form>
        </div>
    );
};

const VendorDashboardLayout = () => (
    <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-lg p-6">
            <nav className="space-y-2">
                <Link to="/vendor" className="block p-3 hover:bg-purple-50 rounded font-bold">Overview</Link>
                <Link to="/vendor/create" className="block p-3 hover:bg-purple-50 rounded font-bold">New Package</Link>
            </nav>
        </aside>
        <main className="flex-1 p-10">
            <Outlet />
        </main>
    </div>
);

const VendorDashboard = () => (
    <Routes>
        <Route element={<VendorDashboardLayout />}>
            <Route index element={<VendorOverview />} />
            <Route path="create" element={<CreatePackage />} />
        </Route>
    </Routes>
);

export default VendorDashboard;
