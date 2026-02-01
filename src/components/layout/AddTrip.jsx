import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Plane, IndianRupee, ImageIcon, FileText } from 'lucide-react';

const AddTrip = () => {
    const [pkg, setPkg] = useState({
        packageName: '',
        price: '',
        description: '',
        imageUrl: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPkg({ ...pkg, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Adjust this URL to match your @RequestMapping for PackagesController
            await axios.post('http://localhost:8080/api/packages', pkg);
            alert("Package added successfully!");
            navigate('/admin'); // Redirect back to the dashboard
        } catch (error) {
            console.error("Error adding package:", error);
            alert("Failed to add package.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
                <Plane className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-800">Add New Trip Package</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Trip Name</label>
                    <input type="text" name="packageName" required value={pkg.packageName} onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. Kerala Backwaters" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
                        <div className="relative">
                            <IndianRupee className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                            <input type="number" name="price" required value={pkg.price} onChange={handleChange}
                                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="25000" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                        <div className="relative">
                            <ImageIcon className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                            <input type="text" name="imageUrl" required value={pkg.imageUrl} onChange={handleChange}
                                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="https://..." />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <textarea name="description" rows="4" required value={pkg.description} onChange={handleChange}
                            className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Describe the journey details..." />
                    </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">
                    Create Package
                </button>
            </form>
        </div>
    );
};

export default AddTrip;