import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { API } from "../routes/api.js";
import axios from "axios";

export default function VendorDashboard() {
  const { user, isVendor } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending"); // Default to pending

  useEffect(() => {
    if (isVendor()) {
      fetchVendorBookings();
    }
  }, [isVendor]);

  const fetchVendorBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API.BOOKING.VENDOR_BOOKINGS(user._id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Assume bookings now have `status` AND `paymentStatus`
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching vendor bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- NEW HANDLERS ---

  // 1. Vendor Approves the request
  const handleApprove = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      // This API call tells the backend to:
      // 1. Set status = "confirmed"
      // 2. Set paymentStatus = "pending"
      // 3. Create a notification for the user
      const res = await axios.put(API.BOOKING.APPROVE(bookingId), {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Update state optimistically with the returned booking
      setBookings(prev => 
        prev.map(b => (b._id === bookingId ? res.data.booking : b))
      );
    } catch (err) {
      console.error("Error approving booking:", err);
      alert("Failed to approve booking");
    }
  };

  // 2. Vendor Rejects the request
  const handleReject = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      // This API call tells the backend to:
      // 1. Set status = "cancelled"
      // 2. Create a notification for the user
      const res = await axios.put(API.BOOKING.REJECT(bookingId), {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setBookings(prev => 
        prev.map(b => (b._id === bookingId ? res.data.booking : b))
      );
    } catch (err) {
      console.error("Error rejecting booking:", err);
      alert("Failed to reject booking");
    }
  };

  // 3. Vendor Marks the paid service as complete
  const handleMarkComplete = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      // This API call tells the backend to:
      // 1. Set status = "completed"
      const res = await axios.put(API.BOOKING.COMPLETE(bookingId), {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(prev => 
        prev.map(b => (b._id === bookingId ? res.data.booking : b))
      );
    } catch (err) {
      console.error("Error completing booking:", err);
      alert("Failed to complete booking");
    }
  };


  // --- Helper for status colors & text ---
  const getStatusInfo = (booking) => {
    // Your backend MUST return `status` and `paymentStatus`
    const { status, paymentStatus } = booking;

    if (status === "pending") {
      return { text: "Pending Approval", color: "bg-yellow-100 text-yellow-600" };
    }
    if (status === "confirmed") {
      if (paymentStatus === "pending") {
        return { text: "Awaiting Payment", color: "bg-blue-100 text-blue-600" };
      }
      if (paymentStatus === "completed") {
        return { text: "Confirmed & Paid", color: "bg-indigo-100 text-indigo-600" };
      }
    }
    if (status === "completed") {
      return { text: "Completed", color: "bg-green-100 text-green-600" };
    }
    if (status === "cancelled") {
      return { text: "Cancelled", color: "bg-red-100 text-red-600" };
    }
    return { text: status, color: "bg-gray-100 text-gray-600" };
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

  // --- Updated JSX ---

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

        {/* Stats Cards (Updated) */}
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
          {/* New "Confirmed" Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {bookings.filter(b => b.status === "confirmed").length}
            </div>
            <div className="text-gray-600">Confirmed</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {bookings.filter(b => b.status === "completed").length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
        </div>

        {/* Filter Buttons (Updated) */}
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
          {/* New "Confirmed" Button */}
          <button
            onClick={() => setFilter("confirmed")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === "confirmed"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Confirmed
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

        {/* Bookings List (Updated Logic) */}
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
            {filteredBookings.map((booking) => {
              const statusInfo = getStatusInfo(booking);
              return (
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
                         {/* Make sure your API returns clientName */}
                         <strong>Client:</strong> {booking.clientName || booking.user?.name || "N/A"}
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
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
                      >
                        {statusInfo.text}
                      </span>
                    </div>
                    
                    {/* --- ACTION BUTTONS (New Logic) --- */}
                    
                    {/* 1. Pending: Show Approve/Reject */}
                    {booking.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(booking._id)}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(booking._id)}
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    
                    {/* 2. Confirmed: Check payment status */}
                    {booking.status === "confirmed" && (
                      <>
                        {/* Awaiting payment */}
                        {booking.paymentStatus === "pending" && (
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <span className="text-blue-600 font-semibold">
                              Awaiting client payment...
                            </span>
                          </div>
                        )}
                        
                        {/* Paid, ready for service */}
                        {booking.paymentStatus === "completed" && (
                          <button
                            onClick={() => handleMarkComplete(booking._id)}
                            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                          >
                            Mark as Completed
                          </button>
                        )}
                      </>
                    )}

                    {/* 3. Completed: Show success message */}
                    {booking.status === "completed" && (
                      <div className="text-center">
                        <span className="text-green-600 font-semibold">
                          ✅ Service Completed
                        </span>
                      </div>
                    )}
                    
                    {/* 4. Cancelled: Show cancelled message */}
                    {booking.status === "cancelled" && (
                      <div className="text-center">
                        <span className="text-red-600 font-semibold">
                          ❌ Service Cancelled
                        </span>
                      </div>
                    )}
                    
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
}
