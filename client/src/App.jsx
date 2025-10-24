import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./Components/Footer";
import { AuthProvider } from "./context/authContext";
import { Toaster } from 'react-hot-toast';
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
        <AppRoutes />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 3000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
