import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { Sun, Moon } from "lucide-react"; // Removed Bell

function Navbar() {
  const navigate = useNavigate();
  const { user, logout, isAdmin, isVendor } = useContext(AuthContext);
  const [dropdown, setDropdown] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");
  const handleLogout = () => {
    logout();
    setDropdown(false);
    navigate("/");
  };

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    
    document.body.style.backgroundColor = newTheme === "dark" ? "#1a202c" : "#f8f9fa";
    document.body.style.color = newTheme === "dark" ? "#f8f9fa" : "#1a202c";
  };

  // --- Notification handlers removed (handleBellClick, handleNotificationClick) ---
  
  const handleAvatarClick = () => {
    setDropdown(!dropdown);
    // setShowNotificationDropdown(false); // Removed
  };

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#3b82f6" : "inherit",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
    padding: "8px 12px",
    transition: "color 0.2s ease",
  });

  const dropdownButtonStyle = {
    width: "100%",
    padding: "12px 16px",
    textAlign: "left",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "inherit",
    fontSize: "14px",
    transition: "background-color 0.2s ease",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        backgroundColor: isDark ? "#1a202c" : "#ffffff",
        color: isDark ? "#f8f9fa" : "#1a202c",
        transition: "all 0.3s ease",
        borderBottom: isDark ? "1px solid #2d3748" : "1px solid #e2e8f0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        onClick={() => navigate("/")}
        style={{ 
          fontSize: "24px", 
          fontWeight: "bold", 
          cursor: "pointer",
          background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        HomeCare
      </h1>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {/* ... (Your NavLinks are correct) ... */}
        <NavLink to="/" style={linkStyle}>Home</NavLink>
        <NavLink to="/about" style={linkStyle}>About</NavLink>
        <NavLink to="/services" style={linkStyle}>Services</NavLink>
        <NavLink to="/contact" style={linkStyle}>Contact</NavLink>

        {!user && (
          <>
            <NavLink to="/login" style={linkStyle}>Login</NavLink>
            <NavLink to="/signup" style={linkStyle}>Sign Up</NavLink>
          </>
        )}

        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
            {/* --- Notification Bell and Dropdown REMOVED --- */}

            <div style={{ position: "relative" }}>
              <div
                onClick={handleAvatarClick}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                  userSelect: "none",
                  fontSize: "16px",
                  boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
                }}
              >
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>

              {dropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "48px",
                    right: "0",
                    backgroundColor: isDark ? "#2d3748" : "#fff",
                    border: isDark ? "1px solid #4a5568" : "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    width: "180px",
                    zIndex: 100,
                    color: isDark ? "#f8f9fa" : "#1a202c",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ padding: "8px 12px", borderBottom: "1px solid #e2e8f0" }}>
                    <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                      {user.name || "User"}
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>
                      {user.email}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setDropdown(false);
                    }}
                    style={dropdownButtonStyle}
                    onMouseEnter={(e) => e.target.style.backgroundColor = isDark ? "#4a5568" : "#f3f4f6"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                  >
                    View Profile
                  </button>
                  
                  {isVendor() && (
                    <button
                      onClick={() => {
                        navigate("/vendor-dashboard");
                        setDropdown(false);
                      }}
                      style={dropdownButtonStyle}
                      onMouseEnter={(e) => e.target.style.backgroundColor = isDark ? "#4a5568" : "#f3f4f6"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                    >
                      Vendor Dashboard
                    </button>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    style={{
                      ...dropdownButtonStyle,
                      color: "#ef4444",
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = isDark ? "#4a5568" : "#f3f4f6"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;