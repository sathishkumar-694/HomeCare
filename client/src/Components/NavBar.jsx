import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full bg-[#e6ffd8] border-b border-[#d6f3c6]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-black rounded-sm" aria-hidden />
          <span className="font-semibold text-lg">Home care</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/services" className="hover:underline">Services</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>

          <Link
            to="/signup"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium"
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="bg-white px-4 py-2 rounded-lg border shadow-sm"
          >
            Log In
          </Link>
        </nav>
      </div>
    </header>
  );
}
