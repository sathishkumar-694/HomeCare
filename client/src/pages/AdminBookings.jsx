import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../routes/api";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API.ADMIN.BOOKINGS())
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => console.error("Error fetching bookings:", err))
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div className="p-6">Loading bookings...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">All Bookings</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Vendor</th>
              <th className="px-5 py-3">Service</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="bg-white border-b border-gray-200">
                <td className="px-5 py-4 text-sm">
                  {/* Assumes backend populates 'user' */}
                  {booking.user?.name || "N/A"}
                </td>
                <td className="px-5 py-4 text-sm">
                  {/* FIXED: Changed from .shop to .vendor */}
                  {/* Assumes backend populates 'vendor' */}
                  {booking.vendor?.name || "N/A"}
                </td>
                <td className="px-5 py-4 text-sm">
                  {/* Updated to use serviceName */}
                  {booking.serviceName || booking.service || "N/A"}
                </td>
                <td className="px-5 py-4 text-sm">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="px-5 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}