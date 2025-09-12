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
import Login from "../Pages/Login";
import Register from "../pages/SignUp";
import Contact from "../pages/Contact";
import About from "../pages/About"
import vendorRegister from "../pages/vendorRegister";
import Admin from "../pages/Admin";
import PrivateRoute from "../auth/privateRoute";
function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<NavBar/>}/>
        <Route path="/services" element={<Services />} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/domain/:domainName" element={<DomainDetails />} />
        <Route path="/ServiceCard" element ={<ServiceCard/>}/>
        <Route path="/Layout" element = {<Layout/>}/>
        <Route path = "/Footer" element ={<Footer/>}/>
        <Route path="/Login" element = {<Login/>}/>
        <Route path = "/SignUp" element ={<Register/>}/>
        <Route path = "/Footer" element = {<Footer/>}/>
        <Route path ="/Contact" element={<Contact/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/vendorRegister" element={<vendorRegister/>}/>
        <Route path="/admin" element={<Admin />}/>
      </Routes>

  );
}

export default AppRoutes;
