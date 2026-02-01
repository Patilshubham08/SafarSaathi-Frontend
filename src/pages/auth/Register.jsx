import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Mail, Lock, User, Briefcase, Loader2 } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userRole: 'CUSTOMER' // Initialized as all-caps to match Java Enum
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // ✅ URL matches your backend log path: /api/users/register
            await axios.post('http://localhost:8080/auth/register', formData);

            
            alert("Registration Successful! Redirecting to login...");
            navigate('/login');
        } catch (error) {
            console.error("Registration Error:", error);
            // Show the specific error message from the backend if available
            alert(error.response?.data?.message || "Registration failed. Please check your details.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
            <div className="w-full max-w-lg bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                
                <div className="text-center mb-8">
                    <div className="inline-flex p-4 bg-blue-50 rounded-2xl mb-4 text-blue-600">
                        <UserPlus size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">Create Account</h2>
                    <p className="text-gray-500 font-medium">Start your journey with Safar-Saathi</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                        <div className="relative">
                            <input 
                                type="text" required
                                className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 pl-12 transition-all"
                                placeholder="Enter your name"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                            <User className="absolute left-4 top-4 text-gray-400" size={20} />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                        <div className="relative">
                            <input 
                                type="email" required
                                className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 pl-12 transition-all"
                                placeholder="name@example.com"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                            <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
                        </div>
                    </div>

                    {/* Role Selection - CRITICAL FIX FOR 400 ERROR */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 ml-1">I want to...</label>
                        <div className="relative">
                            <select 
                                className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 pl-12 appearance-none font-bold text-blue-600 cursor-pointer"
                                value={formData.userRole}
                                onChange={(e) => setFormData({...formData, userRole: e.target.value})}
                            >
                                {/* ✅ Values MUST be all-caps: CUSTOMER and VENDOR */}
                                <option value="CUSTOMER">Book Trips (Customer)</option>
                                <option value="VENDOR">Organize Trips (Vendor)</option>
                            </select>
                            <Briefcase className="absolute left-4 top-4 text-gray-400" size={20} />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                        <div className="relative">
                            <input 
                                type="password" required
                                className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 pl-12 transition-all"
                                placeholder="••••••••"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                            <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex justify-center items-center gap-2 disabled:bg-blue-300"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Creating Account...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm font-semibold text-gray-500">
                    Already part of the family?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;