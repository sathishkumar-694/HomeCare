// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/vendors")
      .then((res) => res.json())
      .then((data) => setVendors(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Shop</th>
            <th className="border p-2">Service</th>
            <th className="border p-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => (
            <tr key={v._id}>
              <td className="border p-2">{v.ownerName}</td>
              <td className="border p-2">{v.shopName}</td>
              <td className="border p-2">{v.service}</td>
              <td className="border p-2">{v.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
