import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { API } from "../routes/api";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  
  const navigate = useNavigate();
  const toastTimer = React.useRef(null);

  useEffect(() => {
    return () => clearTimeout(toastTimer.current);
  }, []);

  useEffect(() => {
    if (user && isAuthenticated && user._id) {
      setProfileData({
        _id: user._id,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
      setLoading(false);
      fetchUserBookings();
    } else {
      setLoading(false);
    }
  }, [user, isAuthenticated]);

  const fetchUserBookings = async () => {
    if (!user?._id) {
      setBookingsLoading(false);
      return;
    }
    try {
      // --- BUG FIX ---
      const token = sessionStorage.getItem("token"); // Changed to sessionStorage
      // ---------------
      const res = await axios.get(API.BOOKING.USER_BOOKINGS(user._id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data); 
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setBookingsLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const showToast = (message, type = "success") => {
    clearTimeout(toastTimer.current);
    setToast({ show: true, message, type });
    toastTimer.current = setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 5000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // --- BUG FIX ---
      const token = sessionStorage.getItem("token"); // Changed to sessionStorage
      // ---------------
      const res = await axios.put(API.USER.PROFILE(profileData._id), profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // --- BUG FIX ---
      sessionStorage.setItem("user", JSON.stringify(res.data.user)); // Changed to sessionStorage
      // ---------------
      
      // This storage event is fine, it notifies other components
      window.dispatchEvent(new Event("storage")); 
      
      showToast("Profile updated successfully!", "success");
      setIsEditing(false);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to update profile";
      showToast(errorMsg, "error");
    } finally {
      setSaving(false);
    }
  };

  const handlePayNow = (bookingId, amount) => {
    navigate(`/finalize-payment/${bookingId}`, { state: { amount: amount } });
  };

  // --- COLOR CHANGE HERE ---
  const getBookingStatus = (booking) => {
    const { status, paymentStatus } = booking; 
    
    if (status === "pending") {
      return { text: "Pending Approval", color: "bg-yellow-100 text-yellow-800" };
    }
    if (status === "confirmed") {
      if (paymentStatus === "pending") {
        // Changed colors
        return { text: "Confirmed - Awaiting Payment", color: "bg-blue-200 text-blue-900" }; 
      }
      if (paymentStatus === "completed") {
        // Changed colors
        return { text: "Confirmed & Paid", color: "bg-indigo-200 text-indigo-900" };
      }
    }
    if (status === "completed") {
      return { text: "Completed", color: "bg-green-100 text-green-800" };
    }
    if (status === "cancelled") {
      // Changed colors
      return { text: "Cancelled", color: "bg-red-200 text-red-900" };
    }
    return { text: status, color: "bg-gray-100 text-gray-800" };
  };
  // -------------------------

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    clearTimeout(toastTimer.current);
    setToast({ show: false, message: "", type: "success" });
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    clearTimeout(toastTimer.current);
    setToast({ show: false, message: "", type: "success" });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to view your profile</h2>
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
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 z-50 max-w-sm rounded-lg shadow-lg p-4 text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          } transition-opacity duration-300`}
        >
          {toast.message}
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
           <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
              <p className="text-gray-600">Manage your personal information</p>
            </div>
            {!isEditing ? (
              <button
                onClick={handleStartEdit}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Edit Profile
              </button>
            ) : (
              <div className="space-x-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { key: "name", label: "Full Name", type: "text" },
              { key: "email", label: "Email Address", type: "email" },
              { key: "phone", label: "Phone Number", type: "text" },
              { key: "address", label: "Address", type: "text" }
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                {isEditing ? (
                  <input
                    type={field.type}
                    name={field.key}
                    value={profileData[field.key] || ""}
                    onChange={handleChange}
                    disabled={field.key === "email"}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      field.key === "email" ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-900">{profileData[field.key] || "Not provided"}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Booking History</h2>
          {bookingsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
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
              {bookings.map((booking) => {
                const statusInfo = getBookingStatus(booking);
                const canPay = booking.status === 'confirmed' && booking.paymentStatus === 'pending';
                
                return (
                  <div
                    key={booking._id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {booking.serviceName} {/* Changed from booking.service */}
                        </h3>
                        <p className="text-gray-600 mb-1">
                          Provider: {booking.vendor?.shopName || booking.vendor?.name || "Service Provider"} 
                        </p>
                         <p className="text-gray-600 mb-1">
                            Location: {booking.vendor?.location || "N/A"}
                          </p>
                        <p className="text-gray-600">
                          Amount: ₹{booking.price || 0} {/* Changed from booking.amount */}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0 md:text-right">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${statusInfo.color}`}
                        >
                          {statusInfo.text}
                        </span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 flex flex-col md:flex-row justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <p><strong>Booked on:</strong> {formatDate(booking.createdAt)}</p>
                        <p><strong>Scheduled for:</strong> {formatDate(booking.date)} at {booking.time}</p>
                      </div>
                      
                      {canPay && (
                        <button 
                          onClick={() => handlePayNow(booking._id, booking.price)} // Changed from booking.amount
                          className="mt-4 md:mt-0 w-full md:w-auto bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                          Pay Now (₹{booking.price || 0}) {/* Changed from booking.amount */}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}