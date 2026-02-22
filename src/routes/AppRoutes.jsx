import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Public/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import PackageList from '../pages/customer/PackageList';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/customer/*"
                    element={
                        <ProtectedRoute allowedRoles={['Customer']}>
                            <CustomerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/vendor/add-package"
                    element={
                        <ProtectedRoute allowedRoles={['Vendor']}>
                            <AddPackage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/vendor/packages"
                    element={
                        <ProtectedRoute allowedRoles={['Vendor']}>
                            <PackageList />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;