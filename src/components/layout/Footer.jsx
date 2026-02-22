import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#051322] text-white py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="text-2xl font-black tracking-tight">
                            Safar<span className="text-blue-500">Saathi</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your ultimate travel companion. Booking flights, hotels, and memorable experiences has never been easier.
                        </p>
                        <div className="flex gap-4">
                            <Facebook size={20} className="text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                            <Twitter size={20} className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                            <Instagram size={20} className="text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
                            <Youtube size={20} className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest mb-6">Services</h4>
                        <ul className="space-y-4 text-gray-400 text-sm font-medium">
                            <li className="hover:text-white cursor-pointer transition-colors">Flight Booking</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Hotel Reservations</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Holiday Packages</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Train Tickets</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Bus & Cabs</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest mb-6">Company</h4>
                        <ul className="space-y-4 text-gray-400 text-sm font-medium">
                            <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Our Team</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-gray-400 text-sm font-medium">
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="text-blue-500" />
                                <span>jayeshkaradkhele@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="text-blue-500" />
                                <span>9579052681</span>
                            </li>
                            <li className="flex items-center gap-3 leading-relaxed">
                                <MapPin size={16} className="text-blue-500 shrink-0" />
                                <span>Pune</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <p>© 2026 SafarSaathi Clone. All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <span className="hover:text-white cursor-pointer">Safety</span>
                        <span className="hover:text-white cursor-pointer">Reliability</span>
                        <span className="hover:text-white cursor-pointer">Security</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
