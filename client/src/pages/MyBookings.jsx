import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { API } from "../routes/api.js";
import axios from "axios";

const MyBookings = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && isAuthenticated && user._id) {
      console.log("MyBookings - User data available:", user);
      fetchUserBookings();
    } else {
      console.log("MyBookings - No user data or not authenticated:", { user, isAuthenticated });
      setLoading(false);
    }
  }, [user, isAuthenticated]);

  const fetchUserBookings = async () => {
    if (!user?._id) {
      console.log("No user ID available for fetching bookings");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Fetching bookings for user:", user._id);
      const res = await axios.get(API.BOOKING.USER_BOOKINGS(user._id), {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Bookings fetched successfully:", res.data);
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching user bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to view your bookings</h2>
          <a href="/login" className="text-blue-600">Go to Login</a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Bookings</h1>
          <p className="text-gray-600">Track all your service bookings</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-6">You haven't booked any services yet.</p>
            <a 
              href="/services" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Services
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {booking.service}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      Provider: {booking.shop?.name || "Service Provider"}
                    </p>
                    <p className="text-gray-600 mb-1">
                      Location: {booking.shop?.address || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      Amount: ₹{booking.amount || 0}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status || "Pending"}
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Booked on:</strong> {formatDate(booking.createdAt)}</p>
                      <p><strong>Scheduled for:</strong> {formatDate(booking.date)} at {booking.time}</p>
                    </div>
                    <div>
                      <p><strong>Booking ID:</strong> {booking._id.slice(-8)}</p>
                      <p><strong>Status:</strong> {booking.status || "Pending"}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;