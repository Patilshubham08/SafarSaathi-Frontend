import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Plane, LogOut, LayoutDashboard, Briefcase } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-black text-blue-600 flex items-center gap-2"
      >
        <Plane className="h-6 w-6" />
        Safar-Saathi
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-6 font-semibold text-gray-700">
        {/* Home always visible */}
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>

        {/* CUSTOMER */}
        {user?.userRole === "CUSTOMER" && (
          <Link
            to="/customer"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <Briefcase className="h-4 w-4" />
            My Bookings
          </Link>
        )}

        {/* VENDOR */}
        {user?.userRole === "VENDOR" && (
          <Link
            to="/vendor"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <LayoutDashboard className="h-4 w-4" />
            Vendor Dashboard
          </Link>
        )}

        {/* AUTH */}
        {!user ? (
          <>
            <Link to="/login" className="hover:text-blue-600">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4 border-l pl-6">
            <span className="text-sm text-gray-500 italic">
              Welcome, {user.name}
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-1 text-red-500 hover:text-red-700 font-bold"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
