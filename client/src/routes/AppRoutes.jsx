import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../Components/NavBar"
import Home from "../pages/Home";
import Services from "../pages/Services";
import ClientPage from "../pages/ClientPage";
import DomainDetails from "../pages/DomainDetails";
import DomainCard from "../Components/DomainCard";
import ServiceCard from "../Components/ServiceCard";
import Layout from "../Components/Layout";
import Footer from "../Components/Footer";
import Login from "../pages/Login";
import Register from "../pages/SignUp";
import Contact from "../pages/Contact";
import About from "../pages/About"
import vendorRegister from "../pages/vendorRegister";
import Admin from "../pages/Admin";
import Users from "../pages/Users"
import PrivateRoute from "../auth/privateRoute";
import Profile from "../pages/Profile";
import Support from "../pages/Support";
import Dashboard from "../pages/Dashboard"; // new dashboard page

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<NavBar/>}/>
      <Route path="/Users/:username" element={<Users/>}/> 
      <Route path="/services" element={<Services />} />
      <Route path="/client" element={<ClientPage />} />
      <Route path="/domain/:domainName" element={<DomainDetails />} />
      <Route path="/ServiceCard" element={<ServiceCard/>}/>
      <Route path="/Layout" element={<Layout/>}/>
      <Route path="/Footer" element={<Footer/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/SignUp" element={<Register/>}/>
      <Route path="/Contact" element={<Contact/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/vendorRegister" element={<vendorRegister/>}/>
      <Route path="/admin" element={<Admin />}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/support" element={<Support />} />

      {/* New dashboard routes */}
      <Route path="/user-dashboard" element={<Dashboard />} />
      <Route path="/vendor-dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRoutes;