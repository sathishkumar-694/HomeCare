/*
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/vendor")  // ✅ Removed 's'
      .then((res) => res.json())
      .then((data) => setVendors(data))
      .catch((err) => console.error("Error fetching vendors:", err));
  }, []);

  const approveVendor = (id) => {
    fetch(`http://localhost:5000/api/admin/vendors/${id}/approve`, {  // ✅ Using admin route
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        setVendors((prev) =>
          prev.map((v) => (v._id === id ? { ...v, status: "approved" } : v))
        );
      })
      .catch((err) => console.error("Error approving vendor:", err));
  };

  const rejectVendor = (id) => {
    fetch(`http://localhost:5000/api/admin/vendors/${id}/reject`, {  // ✅ Using admin route
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setVendors((prev) => prev.filter((v) => v._id !== id));
      })
      .catch((err) => console.error("Error rejecting vendor:", err));
  };

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
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => (
            <tr key={v._id}>
              <td className="border p-2">{v.name}</td>
              <td className="border p-2">{v.shopName}</td>
              <td className="border p-2">{v.service}</td>
              <td className="border p-2">{v.location}</td>
              <td className="border p-2">
                {v.status || "pending"}
              </td>
              <td className="border p-2">
                {v.status === "pending" ? (
                  <>
                    <button
                      onClick={() => approveVendor(v._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectVendor(v._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-green-600 font-semibold">Approved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
*/
import React, { useEffect, useState } from "react";
import { API } from "../routes/api";

export default function AdminVendors() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetch(API.VENDOR.GET_ALL())
      .then((res) => res.json())
      .then((data) => setVendors(data))
      .catch((err) => console.error("Error fetching vendors:", err));
  }, []);

  const approveVendor = (id) => {
    fetch(`http://localhost:5000/api/admin/vendors/${id}/approve`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        setVendors((prev) =>
          prev.map((v) => (v._id === id ? { ...v, status: "approved" } : v))
        );
      })
      .catch((err) => console.error("Error approving vendor:", err));
  };

  const rejectVendor = (id) => {
    fetch(`http://localhost:5000/api/admin/vendors/${id}/reject`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setVendors((prev) => prev.filter((v) => v._id !== id));
      })
      .catch((err) => console.error("Error rejecting vendor:", err));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Vendors</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Shop</th>
            <th className="border p-2">Service</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => (
            <tr key={v._id}>
              <td className="border p-2">{v.name}</td>
              <td className="border p-2">{v.shopName}</td>
              <td className="border p-2">{v.service}</td>
              <td className="border p-2">{v.location}</td>
              <td className="border p-2">{v.status || "pending"}</td>
              <td className="border p-2">
                {v.status === "pending" ? (
                  <>
                    <button
                      onClick={() => approveVendor(v._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectVendor(v._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-green-600 font-semibold">Approved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
