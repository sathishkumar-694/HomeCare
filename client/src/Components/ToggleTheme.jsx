import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

function ThemeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.style.backgroundColor = dark ? "#1a202c" : "#f8f9fa";
    document.body.style.color = dark ? "#f8f9fa" : "#1a202c";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      style={{
        padding: "8px 12px",
        borderRadius: "8px",
        backgroundColor: dark ? "#4a5568" : "#e2e8f0",
        color: dark ? "white" : "black",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

export default ThemeToggle;
