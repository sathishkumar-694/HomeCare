import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { API } from "../routes/api.js";
import axios from "axios";

export default function VendorDashboard() {
  const { user, isVendor } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (isVendor()) {
      fetchVendorBookings();
    }
  }, [isVendor]);

  const fetchVendorBookings = async () => {
    try {
      const res = await axios.get(API.BOOKING.VENDOR_BOOKINGS(user._id));
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching vendor bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await axios.put(API.BOOKING.UPDATE_STATUS(bookingId), { status });
      setBookings(prev => 
        prev.map(booking => 
          booking._id === bookingId ? { ...booking, status } : booking
        )
      );
    } catch (err) {
      console.error("Error updating booking status:", err);
      alert("Failed to update booking status");
    }
  };

  const filteredBookings = filter === "all" 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  if (!isVendor()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">This page is only accessible to vendors.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome, {user.name}!
          </h1>
          <p className="text-lg text-gray-600">
            Manage your service requests and bookings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {bookings.length}
            </div>
            <div className="text-gray-600">Total Bookings</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {bookings.filter(b => b.status === "pending").length}
            </div>
            <div className="text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {bookings.filter(b => b.status === "completed").length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {bookings.filter(b => b.status === "cancelled").length}
            </div>
            <div className="text-gray-600">Cancelled</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === "all"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            All Bookings
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === "pending"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === "completed"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("cancelled")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === "cancelled"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Cancelled
          </button>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No bookings found</h3>
            <p className="text-gray-500">
              {filter === "all" 
                ? "You don't have any service requests yet." 
                : `No ${filter} bookings found.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {booking.serviceName}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      <strong>Client:</strong> {booking.clientName}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <strong>Time:</strong> {booking.time}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <strong>Location:</strong> {booking.location}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <strong>Contact:</strong> {booking.clientContact}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong>Price:</strong> ₹{booking.price}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : booking.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  
                  {booking.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateBookingStatus(booking._id, "completed")}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        Mark Complete
                      </button>
                      <button
                        onClick={() => updateBookingStatus(booking._id, "cancelled")}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  
                  {booking.status === "completed" && (
                    <div className="text-center">
                      <span className="text-green-600 font-semibold">
                        ✅ Service Completed
                      </span>
                    </div>
                  )}
                  
                  {booking.status === "cancelled" && (
                    <div className="text-center">
                      <span className="text-red-600 font-semibold">
                        ❌ Service Cancelled
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
