import React, { useState } from 'react';
import api from '../../api/axios';

const AddPackage = () => {
    const [pkg, setPkg] = useState({
        packageName: '',
        description: '',
        price: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        setPkg({
            ...pkg,
            [e.target.name]: e.target.value
        });
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

        try {
            await api.post(`/packages/${vendorId}`, payload);

            alert("Package created successfully");

            setPkg({
                packageName: '',
                description: '',
                price: '',
                imageUrl: ''
            });
        } catch (err) {
            alert(err.response?.data || "Package creation failed");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Create New Package</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
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
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={pkg.imageUrl}
                    onChange={handleChange}
                    required
                    className="w-full border p-3 rounded"
                />

                <button
                    type="submit"
                    className="bg-purple-600 text-white px-6 py-3 rounded font-bold hover:bg-purple-700"
                >
                    Create Package
                </button>
            </form>
        </div>
    );
};

export default AddPackage;
