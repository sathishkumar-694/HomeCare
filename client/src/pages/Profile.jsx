import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { API } from "../routes/api";
import { AuthContext } from "../context/authContext";

export default function Profile() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user && isAuthenticated && user._id) {
      console.log("Profile - User data available:", user);
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
      console.log("Profile - No user data or not authenticated:", { user, isAuthenticated });
      setLoading(false);
    }
  }, [user, isAuthenticated]);

  const fetchUserBookings = async () => {
    if (!user?._id) {
      console.log("No user ID available for fetching bookings");
      setBookingsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Fetching bookings for user:", user._id);
      const res = await axios.get(API.BOOKING.USER_BOOKINGS(user._id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Bookings fetched successfully:", res.data);
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

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(API.USER.PROFILE(profileData._id), profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update localStorage with the new user data
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      // Update the auth context
      window.dispatchEvent(new Event("storage"));

      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
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
      <div className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
              <p className="text-gray-600">Manage your personal information</p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
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
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Profile Inputs */}
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

        {/* Booking History */}
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
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
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
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status || "Pending"}
                    </span>
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
    </div>
  );
}