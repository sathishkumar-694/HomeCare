// src/components/Layout.jsx
import React from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children, showFooter = true }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
