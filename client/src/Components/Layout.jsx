import React from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />    {/* Always stays */}
      <main className="flex-1">{children}</main>
      <Footer />    {/* Always stays */}
    </div>
  );
}

export default Layout;
