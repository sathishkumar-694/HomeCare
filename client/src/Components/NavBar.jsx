import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ToggleTheme";

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#3b82f6" : "inherit", // blue for active link
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
        backgroundColor:
          localStorage.getItem("theme") === "dark" ? "#1a202c" : "#ffffff",
        color:
          localStorage.getItem("theme") === "dark" ? "#f8f9fa" : "#1a202c",
        transition: "all 0.3s ease",
      }}
    >
      {/* Left side: logo or app name */}
      <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>HomeCare</h1>

      {/* Center: navigation links */}
      <div style={{ display: "flex", gap: "16px" }}>
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
        <NavLink to="/login" style={linkStyle}>
          Login
        </NavLink>
      </div>

      {/* Right side: theme toggle */}
      </nav>
  );
}

export default Navbar;
