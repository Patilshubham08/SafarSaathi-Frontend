import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import { Trash2, Star, Clock, MapPin, Shield, ArrowRight, Loader2, Palmtree } from 'lucide-react';

const PackageList = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadPackages();
    }, []);

    const loadPackages = async () => {
        try {
            const result = await api.get('/packages');
            setPackages(result.data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                    <p className="font-bold text-gray-500 uppercase tracking-widest">Searching Best Deals...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-10 pb-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-gray-900 mb-2">Exclusive Holiday Packages</h1>
                    <p className="text-gray-500 font-medium">Explore the world with our curated travel experiences</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg, idx) => (
                        <div
                            key={pkg.packageId}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                            onClick={() => navigate(`/packages/${pkg.packageId}`)}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={pkg.imageUrl || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800"}
                                    alt={pkg.packageName}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-blue-600 shadow-sm">
                                    Top Rated
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                                            {pkg.packageName}
                                        </h3>
                                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                                            <MapPin size={12} />
                                            <span>Premium Destination</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Per Person</p>
                                        <p className="text-2xl font-black text-blue-600">₹{pkg.price}</p>
                                    </div>
                                </div>

                                <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                                    {pkg.description}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-1.5 text-gray-400">
                                            <Clock size={16} />
                                            <span className="text-xs font-bold uppercase tracking-tighter">5D/4N</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-400">
                                            <Shield size={16} />
                                            <span className="text-xs font-bold uppercase tracking-tighter">Verified</span>
                                        </div>
                                    </div>
                                    <button className="text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                        Details <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {packages.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <Palmtree className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-800">No packages found</h3>
                        <p className="text-gray-500 mt-2">Check back later for new exciting deals!</p>
                    </div>
                )}
            </div>
        </div>
    );
};


export default PackageList;
