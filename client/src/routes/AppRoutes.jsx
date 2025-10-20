import React from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

// Public/User Pages
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
import RoleSelection from "../pages/RoleSelection";
import MyBookings from "../pages/MyBookings";

// Admin Pages
import AdminLogin from "../pages/AdminLogin"; // 1. Fixed this component name
import AdminDashboard from "../pages/AdminDashboard";
import AdminVendors from "../pages/AdminVendors";
import AdminUsers from "../pages/AdminUsers";
import Queries from "../pages/Queries"; // 2. Fixed this component name
import AdminBookings from "../pages/AdminBookings";

function AppRoutes() {
  return (
    <Routes>
      {/* 🌐 Public/User Routes (with NavBar + Footer) */}
      <Route
        path="/*"
        element={
          <>
            <NavBar />
            <Routes>
              <Route path="/role-selection" element={<RoleSelection />} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/domain" element={<DomainDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/vendor-register" element={<VendorRegister />} />
              <Route path="/users/:username" element={<Users />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/support" element={<Support />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/payment-success" element={<BookingSuccess />} />
            </Routes>
            <Footer />
          </>
        }
      />

      {/* 👑 Admin Routes (No NavBar + Footer) */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* 3. This is the corrected admin layout structure */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<AdminBookings />} /> {/* Default page */}
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="vendors" element={<AdminVendors />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="queries" element={<Queries />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;