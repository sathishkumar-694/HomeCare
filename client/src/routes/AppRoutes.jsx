import React from "react";
import { Routes, Route } from "react-router-dom";

// Common Components
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

// User Pages
import Home from "../pages/Home";
import Services from "../pages/Services";
import DomainDetails from "../pages/DomainDetails";
import Login from "../pages/Login";
import Register from "../pages/SignUp";
import Contact from "../pages/Contact";
import About from "../pages/About";
import VendorRegister from "../pages/vendorRegister";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import Support from "../pages/Support";
import Dashboard from "../pages/Dashboard";
import PaymentPage from "../pages/paymentPage";
import BookingSuccess from "../pages/BookingSuccess";

// Admin Pages
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import AdminUsers from "../pages/AdminUsers";
import AdminVendors from "../pages/AdminVendors";
import AdminQueries from "../pages/Queries";

// Auth Protection
import PrivateRoute from "../auth/privateRoute";

function AppRoutes() {
  return (
    <>
      {/* ✅ Navbar visible for general users */}
      <NavBar />

      <Routes>
        {/* 🏠 General Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* 🧰 Services */}
        <Route path="/services" element={<Services />} />
        <Route path="/domain/:domainName" element={<DomainDetails />} />

        {/* 🔐 Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/vendor-register" element={<VendorRegister />} />

        {/* 👤 User Pages */}
        <Route path="/users/:username" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/support" element={<Support />} />

        {/* 📊 Dashboards */}
        <Route path="/user-dashboard" element={<Dashboard />} />
        <Route path="/vendor-dashboard" element={<Dashboard />} />

        {/* 💳 Payment Flow */}
        <Route path="/payment/:serviceId" element={<PaymentPage />} />
        <Route path="/payment-success" element={<BookingSuccess />} />

        {/* 👑 Admin Section */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/vendors" element={<AdminVendors />} />
        <Route path="/admin/queries" element={<AdminQueries />} />
      </Routes>

      {/* ✅ Footer always visible */}
      <Footer />
    </>
  );
}

export default AppRoutes;
