import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    // This function correctly reads "token" and "user"
    const syncLoginState = () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          // Handle corrupted JSON in localStorage
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Run once on initial load
    syncLoginState();

    // Listen for login/logout events from other tabs/pages (like Login.jsx)
    window.addEventListener("storage", syncLoginState);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("storage", syncLoginState);
  }, []);

  const handleLogout = () => {
    // --- START: MODIFIED SECTION ---
    // Clear all keys on logout
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("auth"); // Add this for cleanup
    // --- END: MODIFIED SECTION ---

    setUser(null);
    setDropdown(false); // Close dropdown on logout
    navigate("/login");
    
    // Dispatch event so other open tabs also log out
    window.dispatchEvent(new Event("storage"));
  };

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#3b82f6" : "inherit",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
    padding: "8px 12px",
  });

  // Your theme logic is fine, but this is a safer way to read it
  // to avoid errors if the theme isn't set.
  const theme = localStorage.getItem("theme") || "light";
  const isDark = theme === "dark";

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: isDark ? "#1a202c" : "#ffffff",
        color: isDark ? "#f8f9fa" : "#1a202c",
        transition: "all 0.3s ease",
        borderBottom: isDark ? "1px solid #2d3748" : "1px solid #e2e8f0",
      }}
    >
      <h1
        onClick={() => navigate("/")}
        style={{ fontSize: "20px", fontWeight: "bold", cursor: "pointer" }}
      >
        HomeCare
      </h1>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/about" style={linkStyle}>
          About
        </NavLink>
        <NavLink to="/services" style={linkStyle}>
          Services
        </NavLink>
        <NavLink to="/contact" style={linkStyle}>
          Contact
        </NavLink>

        {!user && (
          <NavLink to="/login" style={linkStyle}>
            Login
          </NavLink>
        )}

        {user && (
          <div style={{ position: "relative" }}>
            <div
              onClick={() => setDropdown(!dropdown)}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              {user.name ? user.name[0].toUpperCase() : "U"}
            </div>

            {dropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "44px",
                  right: "0",
                  backgroundColor: isDark ? "#2d3748" : "#fff",
                  border: isDark ? "1px solid #4a5568" : "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  width: "150px",
                  zIndex: 100,
                  color: isDark ? "#f8f9fa" : "#1a202c",
                }}
              >
                <button
                  onClick={() => {
                    navigate("/profile");
                    setDropdown(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "10px",
                    textAlign: "left",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "inherit",
                  }}
                >
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "10px",
                    textAlign: "left",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "#ef4444",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;