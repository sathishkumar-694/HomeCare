import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../routes/api";
import ConfirmModal from "../Components/ConfirmModal"; // Import the modal

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // --- State for the modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null); // Stores the user object to delete

  // --- Fetches all users on page load ---
  useEffect(() => {
    axios
      .get(API.USER.GET_ALL())
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // --- Fetches bookings for a specific user ---
  const fetchUserBookings = async (userId) => {
    try {
      const res = await axios.get(API.BOOKING.USER_BOOKINGS(userId));
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  // --- Opens the detail popup modal ---
  const openUserDetails = (user) => {
    setSelectedUser(user);
    fetchUserBookings(user._id);
  };

  // --- Opens the delete confirmation modal ---
  const openDeleteModal = (user) => {
    setItemToDelete(user);
    setIsModalOpen(true);
  };

  // --- Runs when "Confirm" is clicked in the delete modal ---
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      // --- THIS IS THE CORRECTED API CALL ---
      await axios.delete(API.USER.DELETE(itemToDelete._id));

      setUsers((prev) => prev.filter((u) => u._id !== itemToDelete._id));
      setSelectedUser(null);
    } catch (err) {
      console.error("Error removing user:", err);
    } finally {
      setIsModalOpen(false); // Close the modal
      setItemToDelete(null); // Clear the item
    }
  };

  // Filter users based on search term and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === "" || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Active Users</h1>

      {/* Search and Filter Controls */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Role Filter */}
          <div className="md:w-48">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="text-sm text-gray-600">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      {/* --- Main User Grid --- */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredUsers.map((u) => (
          <div
            key={u._id}
            onClick={() => openUserDetails(u)} // This opens the detail popup
            className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden"
          >
            {u.profilePicture ? (
              <img
                src={u.profilePicture}
                alt={u.name}
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
                <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
              </div>
            )}
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

      {/* --- User Detail Popup Modal --- */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
            
            {selectedUser.profilePicture ? (
              <img
                src={selectedUser.profilePicture}
                alt={selectedUser.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-lg mb-4 relative">
                <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
              </div>
            )}
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
            
            {/* Booking history section */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Booking History</h3>
              {bookings.length === 0 ? (
                <p className="text-gray-500 text-sm">No previous bookings found.</p>
              ) : (
                <ul className="space-y-2">
                  {bookings.map((b) => (
                    <li key={b._id} className="border p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition">
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

            {/* Remove Button */}
            <div className="flex justify-end mt-5">
              <button
                onClick={() => openDeleteModal(selectedUser)} // Pass the whole user object
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Remove User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Reusable Delete Confirmation Modal --- */}
      <ConfirmModal
        isOpen={isModalOpen}
        title={`Delete ${itemToDelete?.name}?`}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      >
        Are you sure you want to permanently delete the user{' '}
        <strong>{itemToDelete?.name}</strong>? This action cannot be undone.
      </ConfirmModal>
    </div>
  );
}