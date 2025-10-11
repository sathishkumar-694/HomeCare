import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token") || "";
  const role = storedUser?.role || "user";

  useEffect(() => {
    const fetchData = async () => {
      if (!storedUser.id || !token) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch(`http://localhost:5000/api/${role}s/${storedUser.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [role, storedUser.id, token]);

  useEffect(() => {
    const fetchBookings = async () => {
      // Only fetch bookings for regular users, not vendors
      if (role !== "user" || !storedUser.id || !token) {
        setBookingsLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/bookings/user/${storedUser.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setBookings(data.bookings || data || []);
        setBookingsLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setBookingsLoading(false);
      }
    };

    fetchBookings();
  }, [storedUser.id, role, token]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await fetch(`http://localhost:5000/api/${role}s/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(user),
      });
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
      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        <div className="space-y-3">
          <input
            name="name"
            value={user.name || ""}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 w-full rounded text-sm"
            disabled={!isEditing}
          />
          <input
            name="email"
            value={user.email || ""}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 w-full rounded text-sm"
            disabled={!isEditing}
          />
          {role === "user" && (
            <input
              name="phone"
              value={user.phone || ""}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-2 w-full rounded text-sm"
              disabled={!isEditing}
            />
          )}

          {isEditing ? (
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 text-sm"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">My Bookings</h2>
          
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
      
    </div>
  );
}