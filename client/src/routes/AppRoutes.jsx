import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

// Pages
import Home from "../pages/Home";
import Services from "../pages/Services";
import ClientPage from "../pages/ClientPage";
import DomainDetails from "../pages/DomainDetails";
import Login from "../pages/Login";
import Register from "../pages/SignUp";
import Contact from "../pages/Contact";
import About from "../pages/About";
import VendorRegister from "../pages/vendorRegister";
import Admin from "../pages/Admin";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import Support from "../pages/Support";
import Dashboard from "../pages/Dashboard";
import PaymentPage from "../pages/paymentPage";      // ✅ renamed for clarity
import BookingSuccess from "../pages/BookingSuccess"; // ✅ success page
import PrivateRoute from "../auth/privateRoute";

function AppRoutes() {
  return (
    <>
      {/* ✅ Navbar always visible */}
      <NavBar />

      <Routes>
        {/* 🏠 General Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* 🧰 Services */}
        <Route path="/services" element={<Services />} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/domain/:domainName" element={<DomainDetails />} />

        {/* 🔐 Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/vendor-register" element={<VendorRegister />} />

        {/* 👑 Admin & User */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/users/:username" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/support" element={<Support />} />

        {/* 📊 Dashboards */}
        <Route path="/user-dashboard" element={<Dashboard />} />
        <Route path="/vendor-dashboard" element={<Dashboard />} />

        {/* 💳 Booking Flow */}
        <Route path="/payment/:serviceId" element={<PaymentPage />} /> {/* ✅ Payment route */}
        <Route path="/payment-success" element={<BookingSuccess />} /> {/* ✅ Success route */}
      </Routes>

      {/* ✅ Footer always visible */}
      <Footer />
    </>
  );
}

export default AppRoutes;
