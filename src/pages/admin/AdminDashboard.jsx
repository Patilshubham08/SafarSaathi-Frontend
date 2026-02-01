import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Users, Package, LayoutDashboard, PlusCircle, Trash2, Edit3, ShieldCheck } from 'lucide-react';
import AddTrip from './AddTrip';       
import PackageList from './PackageList'; 

// --- 1. Overview Component ---
const AdminOverview = () => {
    const [stats, setStats] = useState({ users: 0, packages: 0 });

    useEffect(() => {
        // Fetch quick counts for the dashboard cards
        const fetchStats = async () => {
            try {
                const [uRes, pRes] = await Promise.all([
                    axios.get('http://localhost:8080/api/users'),
                    axios.get('http://localhost:8080/api/packages')
                ]);
                setStats({ users: uRes.data.length, packages: pRes.data.length });
            } catch (err) { console.error("Stats fetch failed", err); }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800">Admin Command Center</h3>
                <p className="text-gray-500">Monitor and manage the Safar-Saathi ecosystem.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Stats */}
                <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-200">
                    <Users className="h-8 w-8 mb-4 opacity-80" />
                    <p className="text-sm font-medium uppercase tracking-wider opacity-80">Total Users</p>
                    <h4 className="text-4xl font-black">{stats.users}</h4>
                    <Link to="users" className="inline-block mt-4 text-sm font-bold bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition">Manage Users →</Link>
                </div>

                {/* Package Stats */}
                <div className="bg-purple-600 p-6 rounded-2xl text-white shadow-lg shadow-purple-200">
                    <Package className="h-8 w-8 mb-4 opacity-80" />
                    <p className="text-sm font-medium uppercase tracking-wider opacity-80">Active Packages</p>
                    <h4 className="text-4xl font-black">{stats.packages}</h4>
                    <div className="flex gap-2 mt-4">
                        <Link to="packages" className="text-sm font-bold bg-white/20 px-3 py-1 rounded hover:bg-white/30">View All</Link>
                        <Link to="add-trip" className="text-sm font-bold bg-white/20 px-3 py-1 rounded hover:bg-white/30">+ New</Link>
                    </div>
                </div>

                {/* Security/Admin Role Info */}
                <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-lg shadow-emerald-200">
                    <ShieldCheck className="h-8 w-8 mb-4 opacity-80" />
                    <p className="text-sm font-medium uppercase tracking-wider opacity-80">System Status</p>
                    <h4 className="text-xl font-bold">Secure Access</h4>
                    <p className="text-xs mt-2 opacity-80">Your Vendor/Admin credentials are active.</p>
                </div>
            </div>
        </div>
    );
};

// --- 2. User Management Component ---
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:8080/api/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error("Fetch failed", err));
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this user permanently?")) {
            await axios.delete(`http://localhost:8080/api/users/${id}`);
            setUsers(users.filter(u => u.userId !== id));
        }
    };

    return (
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" /> Registered Accounts
                </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase">User</th>
                            <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-4 text-right text-xs font-black text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user.userId} className="hover:bg-blue-50/30 transition">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                                        user.userRole === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 
                                        user.userRole === 'VENDOR' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                        {user.userRole || 'CUSTOMER'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => handleDelete(user.userId)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- 3. Sidebar Layout ---
const AdminDashboardLayout = () => (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <aside className="w-full md:w-64 bg-slate-900 text-white p-6">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="bg-blue-500 p-2 rounded-lg">
                    <Plane className="h-6 w-6 text-white" />
                </div>
                <span className="font-black text-xl tracking-tighter italic">Safar-Saathi</span>
            </div>
            <nav className="space-y-1">
                <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition font-medium">
                    <LayoutDashboard className="h-5 w-5 opacity-70" /> Overview
                </Link>
                <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition font-medium">
                    <Users className="h-5 w-5 opacity-70" /> User Management
                </Link>
                <Link to="/admin/packages" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition font-medium">
                    <Package className="h-5 w-5 opacity-70" /> Trip Packages
                </Link>
                <Link to="/admin/add-trip" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition font-medium">
                    <PlusCircle className="h-5 w-5 opacity-70" /> Add New Trip
                </Link>
            </nav>
        </aside>
        <main className="flex-1 p-8">
            <Outlet />
        </main>
    </div>
);

// --- 4. Main Route Config ---
const AdminDashboard = () => (
    <Routes>
        <Route element={<AdminDashboardLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="add-trip" element={<AddTrip />} />
            <Route path="packages" element={<PackageList />} />
        </Route>
    </Routes>
);

export default AdminDashboard;