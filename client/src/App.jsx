import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./Components/Footer";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  useEffect(() => {
    // Clear invalid or partial login data on initial load
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    try {
      if (!token || !user) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
