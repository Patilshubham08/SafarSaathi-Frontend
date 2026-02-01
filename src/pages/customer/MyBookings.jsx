import React from 'react';
import axios from 'axios';
import { Trash2, Calendar, MapPin, Wallet } from 'lucide-react';

const MyBookings = ({ bookings, refresh }) => {
    
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            try {
                // 1. Backend Call
                await axios.delete(`http://localhost:8080/api/trips/${id}`);
                
                // 2. Local feedback
                alert("Trip cancelled successfully.");
                
                // 3. Trigger parent refresh to update UI and Overview count
                refresh(); 
            } catch (err) {
                console.error("Delete Error:", err);
                alert("Error cancelling trip. It might have been already removed.");
                // Refresh anyway to clear any 'ghost' data
                refresh();
            }
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black text-gray-800 tracking-tight">My Journeys</h2>
                    <p className="text-gray-500 font-medium mt-1">Manage your upcoming and past adventures</p>
                </div>
                <div className="text-right">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Trips</span>
                    <p className="text-2xl font-black text-blue-600">{bookings.length}</p>
                </div>
            </div>

            {bookings.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-20 text-center">
                    <p className="text-gray-400 text-lg font-medium italic">Your itinerary is empty. Time to book a trip!</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {bookings.map((trip) => (
                        <div key={trip.tripId} className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center group">
                            
                            {/* Trip Info Section */}
                            <div className="space-y-4">
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                                        trip.tripStatus === 'SCHEDULED' ? 'bg-blue-100 text-blue-700' : 
                                        trip.tripStatus === 'CANCELLED' ? 'bg-red-100 text-red-700' : 
                                        'bg-green-100 text-green-700'
                                    }`}>
                                        {trip.tripStatus}
                                    </span>
                                    <h3 className="text-2xl font-bold text-blue-900 mt-2">{trip.tripName}</h3>
                                </div>

                                <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-semibold">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-blue-400" />
                                        {trip.packageName || "Custom Trip"}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-blue-400" />
                                        {trip.startDate || "TBD"}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Wallet size={16} className="text-blue-400" />
                                        ₹{trip.budget}
                                    </div>
                                </div>
                            </div>

                            {/* Actions Section */}
                            <div className="mt-6 md:mt-0 flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                                <button 
                                    onClick={() => handleDelete(trip.tripId)}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-2xl font-bold transition-all"
                                >
                                    <Trash2 size={18} />
                                    <span>Cancel Trip</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;