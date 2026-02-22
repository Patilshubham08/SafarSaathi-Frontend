import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, Shield, Check, Utensils, Info, ArrowLeft, Loader2 } from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const PackageDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        fetchPackage();
    }, [id]);

    const fetchPackage = async () => {
        try {
            const response = await api.get(`/packages/${id}`);
            setPkg(response.data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleBook = async (tier, price) => {
        if (!user) {
            navigate('/login');
            return;
        }

        setBookingLoading(true);
        const tripPayload = {
            tripName: `${pkg.packageName} (${tier})`,
            budget: price,
            tripStatus: "SCHEDULED",
            packageTier: tier,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0]
        };

        try {
            const tripResponse = await api.post(`/trips/${user.userId}?packageId=${pkg.packageId}`, tripPayload);
            const createdTrip = tripResponse.data;
            const tripId = createdTrip.tripId;

            const orderResponse = await api.post('/payments/create-order', {
                amount: price,
                userId: user.userId
            });

            const { razorpayOrderId, amount, currency, keyId } = orderResponse.data;

            const options = {
                key: keyId,
                amount: amount,
                currency: currency,
                name: "Safar Saathi",
                description: `Booking for ${pkg.packageName}`,
                order_id: razorpayOrderId,
                handler: async function (response) {
                    try {
                        await api.post('/payments/verify-payment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            tripId: tripId.toString()
                        });

                        alert("Payment Successful! Your trip is booked.");
                        navigate('/customer/my-bookings');
                    } catch (verifyError) {
                        const errorMessage = verifyError.response?.data?.message || "Payment verification failed.";
                        alert(errorMessage);
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.phone || ""
                },
                theme: {
                    color: "#2563EB"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                alert("Payment Failed: " + response.error.description);
            });
            rzp.open();

        } catch (error) {
            alert("Could not start booking process. Please try again.");
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (!pkg) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <Info size={48} className="text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-gray-800">Package not found</h2>
            <button onClick={() => navigate('/packages')} className="mt-4 text-blue-600 font-bold uppercase text-xs">Returns to Packages</button>
        </div>
    );

    const tiers = [
        {
            name: "BASIC",
            price: pkg.price,
            features: ["Standard Room", "Breakfast Included", "City Tour", "Shared Transport"],
            color: "border-gray-200",
            bg: "bg-gray-50",
            buttonStyle: "bg-gray-800 text-white"
        },
        {
            name: "RICH",
            price: Math.round(pkg.price * 1.5),
            features: ["Premium Room", "All Meals Included", "Private Tour", "Airport Transfer", "Spa Access"],
            color: "border-blue-200",
            bg: "bg-blue-50/50",
            popular: true,
            buttonStyle: "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
        },
        {
            name: "LUXURY",
            price: Math.round(pkg.price * 2.5),
            features: ["Suite with View", "Fine Dining", "Dedicated Guide", "Luxury Private Car", "Premium Butler", "All Inclusive"],
            color: "border-purple-200",
            bg: "bg-purple-50/50",
            buttonStyle: "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative h-[55vh] overflow-hidden">
                <img
                    src={pkg.imageUrl || "https://images.unsplash.com/photo-1501785888041-af3ef285b470"}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                <div className="absolute top-10 left-10 z-20">
                    <button
                        onClick={() => navigate('/packages')}
                        className="flex items-center gap-2 text-white bg-black/30 backdrop-blur-md px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all font-bold text-sm"
                    >
                        <ArrowLeft size={18} /> Back
                    </button>
                </div>

                <div className="absolute bottom-12 left-10 md:left-20 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Handpicked</span>
                            <span className="flex items-center gap-1 text-white text-sm font-bold">
                                <Star size={14} className="text-yellow-400 fill-current" /> 4.9 (2k+ Bookings)
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                            {pkg.packageName}
                        </h1>
                        <div className="flex gap-4 items-center text-white/80 font-bold text-sm">
                            <span className="flex items-center gap-2">
                                <MapPin size={18} className="text-blue-400" /> Premium Experience
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                            <span className="flex items-center gap-2">
                                <Clock size={18} className="text-blue-400" /> 5 Days / 4 Nights
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-10">
                        <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
                                <Info className="text-blue-600" size={24} /> Overview
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed font-medium">
                                {pkg.description || "Experience the vacation of a lifetime. Our meticulously planned itinerary ensures you see the best sights while enjoying ultimate comfort. From luxury stays to expert-guided tours, every detail is taken care of."}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                                {[
                                    { icon: <Check size={20} />, label: 'All Meals' },
                                    { icon: <Check size={20} />, label: 'Sightseeing' },
                                    { icon: <Check size={20} />, label: 'Stay' },
                                    { icon: <Check size={20} />, label: 'Flights' }
                                ].map(item => (
                                    <div key={item.label} className="flex flex-col items-center gap-3">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                            {item.icon}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
                                <Utensils className="text-blue-600" size={24} /> Best Eateries Nearby
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(pkg.restaurants || "The Grand Buffet, Ocean View Bistro, Spices of India, The Terrace").split(',').map(res => (
                                    <div key={res} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all">
                                        <h4 className="text-gray-800 font-bold text-lg group-hover:text-blue-600 transition-colors">{res.trim()}</h4>
                                        <p className="text-gray-400 text-xs font-bold uppercase mt-1">Gourmet Experience • ★★★★☆</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="lg:sticky lg:top-24 h-fit">
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                            <h2 className="text-xl font-black text-gray-800 mb-6 text-center uppercase tracking-widest">Pricing Options</h2>
                            <div className="space-y-4">
                                {tiers.map(tier => (
                                    <div
                                        key={tier.name}
                                        className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer ${tier.color} ${tier.bg} hover:border-blue-400 group`}
                                        onClick={() => handleBook(tier.name, tier.price)}
                                    >
                                        {tier.popular && (
                                            <span className="absolute -top-2.5 right-4 bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Recommended</span>
                                        )}
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-xs font-black text-gray-500 tracking-widest">{tier.name}</span>
                                            <span className="text-xl font-black text-gray-900">₹{tier.price}</span>
                                        </div>
                                        <ul className="space-y-1.5 mb-5 opacity-70 group-hover:opacity-100 transition-opacity">
                                            {tier.features.slice(0, 3).map(f => (
                                                <li key={f} className="text-gray-600 text-[11px] font-bold flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-blue-400"></div> {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={() => handleBook(tier.name, tier.price)}
                                            className={`w-full py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${tier.buttonStyle}`}
                                        >
                                            Select {tier.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <p className="text-center text-[10px] text-gray-400 font-bold mt-6 uppercase tracking-widest">Safe & Secure Bookings</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};


export default PackageDetail;
