import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTrip = () => {
    const navigate = useNavigate();

    // 1. State for form data and loading status
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        packageName: '',
        description: '',
        price: '',
        imageUrl: '',
        vendorId: '' 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic Validation
        if (!formData.vendorId) {
            alert("Please enter a Vendor ID (Check User Management for your ID)");
            return;
        }

        setLoading(true); // 👈 Start loading spinner effect

        try {
            // URL: http://localhost:8080/api/packages/{vendorId}
            await axios.post(`http://localhost:8080/api/packages/${formData.vendorId}`, {
                packageName: formData.packageName,
                description: formData.description,
                price: parseFloat(formData.price), // Ensure it's a number for Java Double
                imageUrl: formData.imageUrl
            });

            alert('Trip Package Published Successfully! ✈️');
            navigate('/admin/packages'); // Redirect to list view
            
        } catch (error) {
            const errorMsg = error.response ? error.response.data : error.message;
            console.error("400 Error details:", errorMsg);
            alert(`Failed to add trip: ${errorMsg}`);
        } finally {
            setLoading(false); // 👈 Stop loading regardless of result
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10 border border-gray-100">
            <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Add New Destination</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Package Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Package Name</label>
                    <input 
                        type="text" 
                        name="packageName" 
                        required 
                        className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        value={formData.packageName}
                        onChange={handleChange} 
                        placeholder="e.g. Romantic Kerala Backwaters" 
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                    <textarea 
                        name="description" 
                        required 
                        rows="4"
                        className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        value={formData.description}
                        onChange={handleChange} 
                        placeholder="Describe the highlights, itinerary, and inclusions..." 
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Price */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label>
                        <input 
                            type="number" 
                            name="price" 
                            required 
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            value={formData.price}
                            onChange={handleChange} 
                            placeholder="e.g. 25000" 
                        />
                    </div>

                    {/* Vendor ID */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Vendor ID</label>
                        <input 
                            type="number" 
                            name="vendorId" 
                            required 
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            value={formData.vendorId}
                            onChange={handleChange} 
                            placeholder="Your User ID" 
                        />
                    </div>
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Image Link (URL)</label>
                    <input 
                        type="text" 
                        name="imageUrl" 
                        required 
                        className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        value={formData.imageUrl}
                        onChange={handleChange} 
                        placeholder="https://example.com/image.jpg" 
                    />
                    <p className="text-xs text-gray-500 mt-1 italic">Use direct links for best results.</p>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full flex justify-center items-center font-bold py-3 px-4 rounded-md shadow transition duration-200 ${
                            loading 
                            ? 'bg-blue-300 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white active:transform active:scale-95'
                        }`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : 'Publish Trip Package'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTrip;