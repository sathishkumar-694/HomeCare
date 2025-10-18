import React, { useEffect, useState, useMemo } from "react"; // Import useMemo
import axios from "axios";
import { API } from "../routes/api";

export default function Profile() {
  // ✅ FIX 1: Use useMemo to get the stored user ONCE.
  // This prevents re-renders from creating a new object and causing loops.
  const storedUser = useMemo(
    () => JSON.parse(localStorage.getItem("user")) || {},
    [] // Empty array means this only runs on component mount
  );
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // This effect now correctly copies the memoized user into state
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
  }, [storedUser]); // This dependency is now stable

  // Fetch actual bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      if (!storedUser?._id) {
        setBookingsLoading(false);
        return;
      }

      try {
        // We need to pass the token for an authorized request
        const res = await axios.get(API.BOOKING.USER_BOOKINGS(storedUser._id), {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchBookings();
  }, [storedUser._id, token]); // Add token as dependency

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      // ✅ FIX 2: Get the updated user back from the API
      const res = await axios.put(API.USER.PROFILE(user._id), user, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update localStorage with the new user data
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Trigger the "storage" event to update the Navbar
      window.dispatchEvent(new Event("storage"));

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

  // ... (Your JSX render code is perfect, no changes needed)
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
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={user[field] || ""}
                  onChange={handleChange}
                  // Disable email editing
                  disabled={field === "email"}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    field === "email" ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              ) : (
                <p className="text-gray-900">{user[field] || "N/A"}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Live Booking History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">My Booking History</h2>
        {bookingsLoading ? (
          <div className="text-center text-gray-500 py-6">
            Loading bookings...
          </div>
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
                    <h3 className="font-semibold text-lg text-gray-800">
                      {b.service}
                    </h3>
                    {/* Your API must populate 'shop' to get this info */}
                    <p className="text-sm text-gray-600">
                      {b.shop?.name || "Service Provider"}
                    </p>
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
                  📍 {b.shop?.address || "No location provided"}
                </p>
                <p className="text-xs text-gray-500">
                  Booked on {formatDate(b.createdAt)} • Scheduled for{" "}
                  {formatDate(b.date)} at {b.time}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}