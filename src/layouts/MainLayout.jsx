import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const isAuth = location.pathname === '/login' || location.pathname === '/register';

    const getBgImage = () => {
        if (isAuth) return "url(https://images.unsplash.com/photo-1488646953014-85cb44e25828)";
        return "url(https://images.unsplash.com/photo-1499591934245-40b55745b905)";
    };

    return (
        <div className="min-h-screen relative flex flex-col font-sans selection:bg-blue-600 selection:text-white">
            {!isHome && !isAuth && (
                <div className="fixed inset-0 z-[-1] overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
                        style={{
                            backgroundImage: getBgImage(),
                            filter: "brightness(0.95)"
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-gray-50/90 backdrop-blur-[2px]"></div>
                </div>
            )}

            <Navbar />

            <main className="flex-1 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className={isHome ? "" : "pt-20 pb-12"}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
};


export default MainLayout;
