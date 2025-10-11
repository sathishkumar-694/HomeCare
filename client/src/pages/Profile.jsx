/*
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Get user data from memory (simulating localStorage)
  const [storedUser] = useState({ id: "user123", role: "user", name: "John Doe", email: "john@example.com" });
  const [token] = useState("sample-token");
  const role = storedUser?.role || "user";

  useEffect(() => {
    // Simulate API call for user profile
    const fetchData = async () => {
      if (!storedUser.id || !token) {
        setLoading(false);
        return;
      }
      
      // Simulated user data
      setTimeout(() => {
        setUser({
          _id: storedUser.id,
          name: storedUser.name,
          email: storedUser.email,
          phone: "+1 234 567 8900",
          address: "123 Main St, City, State"
        });
        setLoading(false);
      }, 500);
    };
    fetchData();
  }, [role, storedUser.id, token]);

  useEffect(() => {
    // Simulate API call for bookings
    const fetchBookings = async () => {
      if (role !== "user" || !storedUser.id || !token) {
        setBookingsLoading(false);
        return;
      }

      // Simulated booking data
      setTimeout(() => {
        setBookings([
          {
            _id: "1",
            shopName: "Elite Salon & Spa",
            service: "Hair Cut & Styling",
            date: "2025-10-15T10:00:00Z",
            time: "10:00 AM",
            status: "confirmed",
            contact: "+1 555-0123",
            location: "123 Beauty Ave",
            notes: "Please use organic products",
            createdAt: "2025-10-08T09:00:00Z"
          },
          {
            _id: "2",
            vendorName: "Green Thumb Landscaping",
            service: "Lawn Maintenance",
            date: "2025-10-20T14:00:00Z",
            time: "2:00 PM",
            status: "pending",
            contact: "+1 555-0456",
            location: "456 Garden Rd",
            createdAt: "2025-10-09T11:00:00Z"
          },
          {
            _id: "3",
            shopName: "Quick Fix Auto",
            service: "Oil Change",
            date: "2025-10-05T09:00:00Z",
            time: "9:00 AM",
            status: "completed",
            contact: "+1 555-0789",
            location: "789 Auto St",
            notes: "Synthetic oil preferred",
            createdAt: "2025-10-01T08:00:00Z"
          }
        ]);
        setBookingsLoading(false);
      }, 700);
    };

    fetchBookings();
  }, [storedUser.id, role, token]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSave = async () => {
    // Simulate save
    alert("Profile updated successfully!");
    setIsEditing(false);
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

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <div className="space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={user.name || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{user.name || "N/A"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{user.email || "N/A"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={user.phone || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{user.phone || "N/A"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={user.address || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{user.address || "N/A"}</p>
            )}
          </div>
        </div>
      </div>

      {role === "user" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">My Booking History</h2>
          
          {bookingsLoading ? (
            <div className="text-center py-8 text-gray-500">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400 mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <p className="text-gray-600 text-lg font-medium">No bookings yet</p>
              <p className="text-gray-500 text-sm mt-2">
                Your booking history will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking, index) => (
                <div 
                  key={booking._id || index} 
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {booking.shopName || booking.vendorName || "Service Provider"}
                      </h3>
                      {booking.service && (
                        <p className="text-gray-600 text-sm mt-1">{booking.service}</p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status || "Pending"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {booking.date && (
                      <div>
                        <p className="text-gray-500 text-xs">Booking Date</p>
                        <p className="font-medium text-gray-800">{formatDate(booking.date)}</p>
                      </div>
                    )}
                    {booking.time && (
                      <div>
                        <p className="text-gray-500 text-xs">Time</p>
                        <p className="font-medium text-gray-800">{booking.time}</p>
                      </div>
                    )}
                    {booking.contact && (
                      <div>
                        <p className="text-gray-500 text-xs">Vendor Contact</p>
                        <p className="font-medium text-gray-800">{booking.contact}</p>
                      </div>
                    )}
                    {booking.location && (
                      <div>
                        <p className="text-gray-500 text-xs">Location</p>
                        <p className="font-medium text-gray-800">{booking.location}</p>
                      </div>
                    )}
                  </div>

                  {booking.notes && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-gray-500 text-xs">Your Notes</p>
                      <p className="text-gray-700 text-sm mt-1">{booking.notes}</p>
                    </div>
                  )}

                  {booking.createdAt && (
                    <div className="mt-2 text-xs text-gray-400">
                      Booked on: {formatDate(booking.createdAt)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../routes/api";

export default function Profile() {
  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Assuming your user is stored in localStorage after login
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!storedUser?._id) {
      setLoading(false);
      return;
    }

    setUser({
      _id: storedUser._id,
      name: storedUser.name,
      email: storedUser.email,
      phone: storedUser.phone,
      address: storedUser.address,
    });
    setLoading(false);
  }, [storedUser]);

  // ✅ Fetch actual bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      if (!storedUser?._id) {
        setBookingsLoading(false);
        return;
      }

      try {
        const res = await axios.get(API.BOOKING.USER_BOOKINGS(storedUser._id));
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchBookings();
  }, [storedUser._id]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await axios.put(API.USER.PROFILE(user._id), user);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
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

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Profile Section (unchanged UI) */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <div className="space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Profile Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["name", "email", "phone", "address"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {field}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={user[field] || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{user[field] || "N/A"}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Live Booking History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">My Booking History</h2>
        {bookingsLoading ? (
          <div className="text-center text-gray-500 py-6">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-gray-500 py-6">No bookings yet.</div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{b.service}</h3>
                    <p className="text-sm text-gray-600">{b.vendorName || b.shopName}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      b.status
                    )}`}
                  >
                    {b.status || "Pending"}
                  </span>
                </div>
                <p className="text-sm text-gray-700">
                  📍 {b.location || "No location provided"}
                </p>
                <p className="text-xs text-gray-500">
                  Booked on {formatDate(b.createdAt)} • Scheduled for {formatDate(b.date)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
