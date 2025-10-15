import React, { useEffect, useState } from "react";
import { API } from "../routes/api";
import barberImg from "../assets/barber.jpg"
export default function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);

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
        setSelectedVendor(null);
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
        setSelectedVendor(null);
      })
      .catch((err) => console.error("Error rejecting vendor:", err));
  };

  const removeVendor = (id) => {
    fetch(`http://localhost:5000/api/admin/vendors/${id}/remove`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setVendors((prev) => prev.filter((v) => v._id !== id));
        setSelectedVendor(null);
      })
      .catch((err) => console.error("Error removing vendor:", err));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Vendors</h1>

      {/* Grid View */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {vendors.map((v) => (
          <div
            key={v._id}
            onClick={() => setSelectedVendor(v)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <img
              src={v.image || barberImg}
              alt={v.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold text-gray-800 truncate">{v.name}</h2>
              <p className="text-gray-600 text-sm truncate">{v.service}</p>
              <span
                className={`inline-block mt-2 px-3 py-0.5 text-xs font-semibold rounded-full ${
                  v.status === "approved"
                    ? "bg-green-100 text-green-600"
                    : v.status === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {v.status || "pending"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Popup */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setSelectedVendor(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>

            <img
              src={
                selectedVendor.image ||
                barberImg
              }
              alt={selectedVendor.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedVendor.name}
            </h2>
            <p className="text-gray-600 mb-1">
              <strong>Service:</strong> {selectedVendor.service}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Shop:</strong> {selectedVendor.shopName}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Location:</strong> {selectedVendor.location}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Email:</strong> {selectedVendor.email || "N/A"}
            </p>
            <p className="text-gray-600 mb-3">
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-0.5 text-xs font-semibold rounded ${
                  selectedVendor.status === "approved"
                    ? "bg-green-100 text-green-600"
                    : selectedVendor.status === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {selectedVendor.status || "pending"}
              </span>
            </p>

            <div className="flex justify-end gap-3 mt-4">
              {selectedVendor.status === "pending" ? (
                <>
                  <button
                    onClick={() => approveVendor(selectedVendor._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectVendor(selectedVendor._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <button
                  onClick={() => removeVendor(selectedVendor._id)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  Remove Vendor
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
