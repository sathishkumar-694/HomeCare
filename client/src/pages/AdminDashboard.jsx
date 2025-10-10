// src/pages/AdminDashboard.jsx
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <h2 className="text-2xl font-bold text-center py-4 border-b border-gray-700">Admin Panel</h2>
        <nav className="flex-1 flex flex-col gap-2 p-4">
          <Link to="/admin/vendors" className="hover:bg-gray-700 p-2 rounded">Vendors</Link>
          <Link to="/admin/users" className="hover:bg-gray-700 p-2 rounded">Active Users</Link>
          <Link to="/admin/queries" className="hover:bg-gray-700 p-2 rounded">Queries</Link>
        </nav>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 py-2 mx-4 mb-4 rounded">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet /> {/* dynamically loads sub-pages */}
      </main>
    </div>
  );
}
