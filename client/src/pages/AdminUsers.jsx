import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../routes/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(API.USER.GET_ALL())
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const fetchUserBookings = async (userId) => {
    try {
      const res = await axios.get(API.BOOKING.USER_BOOKINGS(userId));
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const removeUser = async (id) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}/remove`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setSelectedUser(null);
    } catch (err) {
      console.error("Error removing user:", err);
    }
  };

  const openUserDetails = (user) => {
    setSelectedUser(user);
    fetchUserBookings(user._id);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Active Users</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((u) => (
          <div
            key={u._id}
            onClick={() => openUserDetails(u)}
            className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden"
          >
            <img
              src={u.profilePicture || "https://via.placeholder.com/300x200?text=User"}
              alt={u.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {u.name}
              </h2>
              <p className="text-gray-600 text-sm truncate">{u.email}</p>
              <span className="inline-block mt-2 px-3 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-600">
                {u.role || "client"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>

            <img
              src={
                selectedUser.profilePicture ||
                "https://via.placeholder.com/400x250?text=User"
              }
              alt={selectedUser.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedUser.name}
            </h2>
            <p className="text-gray-600 mb-1">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p className="text-gray-600 mb-3">
              <strong>Joined:</strong>{" "}
              {new Date(selectedUser.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Booking History</h3>
              {bookings.length === 0 ? (
                <p className="text-gray-500 text-sm">No previous bookings found.</p>
              ) : (
                <ul className="space-y-2">
                  {bookings.map((b) => (
                    <li
                      key={b._id}
                      className="border p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <p className="text-sm">
                        <strong>Service:</strong> {b.serviceName}
                      </p>
                      <p className="text-sm">
                        <strong>Vendor:</strong> {b.vendorName}
                      </p>
                      <p className="text-sm">
                        <strong>Date:</strong>{" "}
                        {new Date(b.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm">
                        <strong>Status:</strong>{" "}
                        <span
                          className={`px-2 py-0.5 text-xs rounded ${
                            b.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {b.status}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex justify-end mt-5">
              <button
                onClick={() => removeUser(selectedUser._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Remove User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}