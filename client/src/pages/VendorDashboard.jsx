import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { API } from "../routes/api.js";
import axios from "axios";
import toast from 'react-hot-toast';
import { 
  Hourglass, 
  CreditCard, 
  PackageCheck, 
  CheckCircle2, 
  XCircle,
  ThumbsUp,
  ThumbsDown,
  Check
} from "lucide-react";

export default function VendorDashboard() {
  const { user, isVendor } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    if (isVendor()) {
      fetchVendorBookings();
    }
  }, [isVendor]); 

  const fetchVendorBookings = async () => {
    if (!user?._id) {
        console.error("User ID not available for fetching bookings.");
        setLoading(false); 
        return;
    }
    try {
      const token = sessionStorage.getItem("token"); 
      const res = await axios.get(API.BOOKING.VENDOR_BOOKINGS(user._id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching vendor bookings:", err);
      toast.error("Failed to fetch bookings."); 
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      const token = sessionStorage.getItem("token"); 
      const res = await axios.put(API.BOOKING.APPROVE(bookingId), {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(prev => prev.map(b => (b._id === bookingId ? res.data.booking : b)));
      toast.success("Booking Approved!"); 
    } catch (err) {
      console.error("Error approving booking:", err);
      toast.error("Failed to approve booking"); 
    }
  };

  const handleReject = async (bookingId) => {
    try {
      const token = sessionStorage.getItem("token"); 
      const res = await axios.put(API.BOOKING.REJECT(bookingId), {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(prev => prev.map(b => (b._id === bookingId ? res.data.booking : b)));
      toast.success("Booking Rejected"); 
    } catch (err) {
      console.error("Error rejecting booking:", err);
      toast.error("Failed to reject booking"); 
    }
  };

  const handleMarkComplete = async (bookingId) => {
    try {
      const token = sessionStorage.getItem("token"); 
      const res = await axios.put(API.BOOKING.COMPLETE(bookingId), {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(prev => prev.map(b => (b._id === bookingId ? res.data.booking : b)));
      toast.success("Booking Marked as Complete!"); 
    } catch (err) {
      console.error("Error completing booking:", err);
      toast.error("Failed to complete booking"); 
    }
  };

  const getStatusInfo = (booking) => {
    const { status, paymentStatus } = booking;
    if (status === "pending") {
      return { text: "Pending Approval", color: "bg-yellow-100 text-yellow-800", icon: Hourglass };
    }
    if (status === "confirmed") {
      if (paymentStatus === "pending") {
        return { text: "Awaiting Payment", color: "bg-blue-200 text-blue-900 font-medium", icon: CreditCard };
      }
      if (paymentStatus === "completed") {
        return { text: "Confirmed & Paid", color: "bg-indigo-200 text-indigo-900 font-medium", icon: PackageCheck };
      }
    }
    if (status === "completed") {
      return { text: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle2 };
    }
    if (status === "cancelled") {
      return { text: "Cancelled", color: "bg-red-200 text-red-900 font-medium", icon: XCircle };
    }
    return { text: status, color: "bg-gray-100 text-gray-800", icon: Hourglass }; 
  };

  const filteredBookings = filter === "all" ? bookings : bookings.filter(booking => booking.status === filter);

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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, {user?.name || 'Vendor'}!</h1>
          <p className="text-lg text-gray-600">Manage your service requests and bookings</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{bookings.length}</div>
            <div className="text-gray-600">Total Bookings</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{bookings.filter(b => b.status === "pending").length}</div>
            <div className="text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{bookings.filter(b => b.status === "confirmed").length}</div>
            <div className="text-gray-600">Confirmed</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{bookings.filter(b => b.status === "completed").length}</div>
            <div className="text-gray-600">Completed</div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button onClick={() => setFilter("all")} className={`px-6 py-2 rounded-full font-medium transition-all ${filter === "all" ? "bg-purple-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-50"}`}>All Bookings</button>
          <button onClick={() => setFilter("pending")} className={`px-6 py-2 rounded-full font-medium transition-all ${filter === "pending" ? "bg-purple-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-50"}`}>Pending</button>
          <button onClick={() => setFilter("confirmed")} className={`px-6 py-2 rounded-full font-medium transition-all ${filter === "confirmed" ? "bg-purple-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-50"}`}>Confirmed</button>
          <button onClick={() => setFilter("completed")} className={`px-6 py-2 rounded-full font-medium transition-all ${filter === "completed" ? "bg-purple-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-50"}`}>Completed</button>
          <button onClick={() => setFilter("cancelled")} className={`px-6 py-2 rounded-full font-medium transition-all ${filter === "cancelled" ? "bg-purple-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-50"}`}>Cancelled</button>
        </div>
        {filteredBookings.length === 0 ? (
           <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No bookings found</h3>
            <p className="text-gray-500">{filter === "all" ? "You don't have any service requests yet." : `No ${filter} bookings found.`}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((booking) => {
              const statusInfo = getStatusInfo(booking);
              const Icon = statusInfo.icon; 
              return (
                <div key={booking._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="p-6 flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.serviceName}</h3>
                      <p className="text-gray-600 mb-1"><strong>Client:</strong> {booking.clientName || booking.user?.name || "N/A"}</p>
                      <p className="text-gray-600 mb-1"><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                      <p className="text-gray-600 mb-1"><strong>Time:</strong> {booking.time}</p>
                      <p className="text-gray-600 mb-1"><strong>Location:</strong> {booking.location}</p>
                      <p className="text-gray-600 mb-1"><strong>Contact:</strong> {booking.clientContact}</p>
                      <p className="text-gray-600 mb-2"><strong>Price:</strong> ₹{booking.price}</p>
                    </div>
                    <div className="mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                         <Icon size={16} />
                         <span>{statusInfo.text}</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-6 border-t border-gray-100 mt-auto">
                    {booking.status === "pending" && (
                      <div className="flex gap-2">
                        <button onClick={() => handleApprove(booking._id)} className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-1.5 text-sm">
                          <ThumbsUp size={16} /> Approve
                        </button>
                        <button onClick={() => handleReject(booking._id)} className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5 text-sm">
                          <ThumbsDown size={16} /> Reject
                        </button>
                      </div>
                    )}
                    {booking.status === "confirmed" && (
                      <>
                        {booking.paymentStatus === "pending" && (
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                             <span className="text-blue-600 font-semibold flex items-center justify-center gap-1.5 text-sm">
                               <CreditCard size={16}/> Awaiting client payment...
                             </span>
                          </div>
                        )}
                        {booking.paymentStatus === "completed" && (
                          <button onClick={() => handleMarkComplete(booking._id)} className="w-full bg-purple-600 text-white py-2 px-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-1.5 text-sm">
                            <Check size={16}/> Mark as Completed
                          </button>
                        )}
                      </>
                    )}
                    {booking.status === "completed" && (
                      <div className="text-center">
                        <span className="text-green-600 font-semibold flex items-center justify-center gap-1.5 text-sm">
                          <CheckCircle2 size={16} /> Service Completed
                        </span>
                      </div>
                    )}
                    {booking.status === "cancelled" && (
                      <div className="text-center">
                         <span className="text-red-600 font-semibold flex items-center justify-center gap-1.5 text-sm">
                          <XCircle size={16} /> Service Cancelled
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