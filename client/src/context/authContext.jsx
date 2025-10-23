import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user already logged in
  useEffect(() => {
    // --- CHANGED ---
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");
    // ---------------
    
    console.log("AuthContext - Stored user:", storedUser);
    console.log("AuthContext - Stored token:", storedToken ? "Present" : "Missing");
    
    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser);
        console.log("AuthContext - Parsed user data:", userData);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        // --- CHANGED ---
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        // ---------------
      }
    }
  }, []);

  const login = (userData, token) => {
    console.log("AuthContext - Login called with userData:", userData);
    console.log("AuthContext - Login called with token:", token ? "Present" : "Missing");
    setUser(userData);
    setIsAuthenticated(true);
    // --- CHANGED ---
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", token);
    // ---------------
    console.log("AuthContext - User data stored in sessionStorage");
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // --- CHANGED ---
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role"); // Note: You were removing "role" here, which is fine
    // ---------------
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const isVendor = () => {
    return user?.role === "vendor";
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      isAdmin, 
      isVendor 
    }}>
      {children}
    </AuthContext.Provider>
  );
};