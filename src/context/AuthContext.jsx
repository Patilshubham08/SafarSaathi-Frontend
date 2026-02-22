import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const login = async (email, password) => {
    try {
      const response = await api.post(
        "/auth/login",
        { email, password }
      );


      const { token, userRole, name, userId } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("userName", name);
      localStorage.setItem("userId", userId);

      setUser({ token, userRole, name, userId });

      return { success: true, userRole };
    } catch (error) {
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
