import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./Components/Footer";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
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
