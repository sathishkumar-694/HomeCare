import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#3b82f6" : "inherit",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
    padding: "8px 12px",
  });

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: localStorage.getItem("theme") === "dark" ? "#1a202c" : "#ffffff",
        color: localStorage.getItem("theme") === "dark" ? "#f8f9fa" : "#1a202c",
        transition: "all 0.3s ease",
      }}
    >
      <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>HomeCare</h1>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <NavLink to="/" style={linkStyle}>Home</NavLink>
        <NavLink to="/about" style={linkStyle}>About</NavLink>
        <NavLink to="/services" style={linkStyle}>Services</NavLink>
        <NavLink to="/contact" style={linkStyle}>Contact</NavLink>

        {!user && <NavLink to="/login" style={linkStyle}>Login</NavLink>}

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
                  backgroundColor: localStorage.getItem("theme") === "dark" ? "#2d3748" : "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  width: "150px",
                  zIndex: 100,
                }}
              >
                <button
                  onClick={() => { navigate("/profile"); setDropdown(false); }}
                  style={{ width: "100%", padding: "10px", textAlign: "left", border: "none", background: "transparent", cursor: "pointer" }}
                >
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  style={{ width: "100%", padding: "10px", textAlign: "left", border: "none", background: "transparent", cursor: "pointer", color: "#ef4444" }}
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
