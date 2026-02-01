import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    const name = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");

    if (token && userRole) {
      setUser({
        token,
        userRole,
        name,
        userId,
      });
    }
    setLoading(false);
  }, []);

  // ✅ CLEAN LOGIN (NO OVER-VALIDATION)
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        { email, password }
      );

      console.log("RAW LOGIN RESPONSE:", response.data);

      const { token, userRole, name, userId } = response.data;

      // STORE
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("userName", name);
      localStorage.setItem("userId", userId);

      setUser({ token, userRole, name, userId });

      return { success: true, userRole };
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
