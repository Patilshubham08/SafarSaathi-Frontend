import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Plane, LogOut, LayoutDashboard, Briefcase, Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
  ];

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#FFD700" : "white",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.3s ease",
  });

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isScrolled ? "10px 60px" : "20px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: isScrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.1)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          color: isScrolled ? "#008cff" : "white",
          fontSize: "28px",
          fontWeight: "900",
          letterSpacing: "-1.5px",
          display: "flex",
          alignItems: "center"
        }}>
          Safar<span style={{ color: isScrolled ? "#005eff" : "#60a5fa" }}>Saathi</span>
        </div>
      </Link>

      <div className="hidden md:flex" style={{ alignItems: "center", gap: "40px" }}>
        <div style={{ display: "flex", gap: "30px" }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: isScrolled ? (location.pathname === link.path ? "#008cff" : "#4b5563") : "white",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px",
                transition: "color 0.3s ease",
              }}
            >
              {link.name}
            </Link>
          ))}

          {user && (
            <Link
              to={user.userRole === "CUSTOMER" ? "/customer" : "/vendor"}
              style={{
                color: isScrolled ? "#008cff" : "white",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {user.userRole === "CUSTOMER" ? "My Trips" : "Dashboard"}
            </Link>
          )}
        </div>

        {!user ? (
          <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
            <Link
              to="/login"
              style={{
                color: isScrolled ? "#008cff" : "white",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "800",
                textTransform: "uppercase"
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                background: "linear-gradient(to right, #008cff, #005eff)",
                color: "white",
                padding: "10px 25px",
                borderRadius: "30px",
                fontWeight: "800",
                textDecoration: "none",
                fontSize: "13px",
                textTransform: "uppercase",
                boxShadow: "0 4px 15px rgba(0, 140, 255, 0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              Create Account
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: isScrolled ? "#9ca3af" : "rgba(255,255,255,0.6)", fontSize: "10px", fontWeight: "900", textTransform: "uppercase" }}>
                {user.userRole}
              </div>
              <div style={{ color: isScrolled ? "#1f2937" : "white", fontSize: "15px", fontWeight: "800" }}>
                {user.name}
              </div>
            </div>
            <button
              onClick={logout}
              className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-2.5 rounded-xl transition-all duration-300"
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>


      <button
        className="md:hidden"
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer"
        }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isMobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(20px)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            borderBottom: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{ ...linkStyle(link.path), fontSize: "18px" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {!user ? (
            <>
              <Link to="/login" style={{ ...linkStyle("/login"), fontSize: "18px" }} onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              <Link to="/register" style={{ color: "#FFD700", fontWeight: "700", textDecoration: "none", fontSize: "18px" }} onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              style={{
                background: "#FF3B30",
                color: "white",
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                fontWeight: "700",
                fontSize: "16px"
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

