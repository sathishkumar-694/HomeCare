import React, { useEffect, useState } from "react";
import axios from "axios"; // Switched to axios to be consistent
import { API } from "../routes/api";
import barberImg from "../assets/barber.jpg";
import ConfirmModal from "../Components/ConfirmModal"; // 1. Import the modal

export default function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // --- State for the modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToConfirm, setItemToConfirm] = useState(null);
  const [modalAction, setModalAction] = useState(null); // 'reject' or 'remove'
  // ---------------------------

  useEffect(() => {
    // Using API helper to fetch
    axios.get(API.VENDOR.GET_ALL())
      .then((res) => setVendors(res.data))
      .catch((err) => console.error("Error fetching vendors:", err));
  }, []);

  const approveVendor = (id) => {
    axios.patch(API.VENDOR.APPROVE(id))
      .then(() => {
        setVendors((prev) =>
          prev.map((v) => (v._id === id ? { ...v, status: "approved" } : v))
        );
        setSelectedVendor(null);
      })
      .catch((err) => console.error("Error approving vendor:", err));
  };

  // --- New Modal Functions ---

  // Opens the modal and sets what to do ('reject' or 'remove')
  const openConfirmModal = (vendor, action) => {
    setItemToConfirm(vendor);
    setModalAction(action);
    setIsModalOpen(true);
  };

  // Runs when "Confirm" is clicked
  const handleConfirm = async () => {
    if (!itemToConfirm || !modalAction) return;

    let url;
    if (modalAction === 'reject') {
      url = API.VENDOR.REJECT(itemToConfirm._id);
    } else if (modalAction === 'remove') {
      url = API.VENDOR.REMOVE(itemToConfirm._id);
    } else {
      return; // Unknown action
    }

    try {
      await axios.delete(url);
      setVendors((prev) => prev.filter((v) => v._id !== itemToConfirm._id));
      setSelectedVendor(null);
    } catch (err) {
      console.error(`Error ${modalAction}ing vendor:`, err);
    } finally {
      setIsModalOpen(false);
      setItemToConfirm(null);
      setModalAction(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setItemToConfirm(null);
    setModalAction(null);
  };

  // --- Dynamic modal text ---
  const getModalText = () => {
    const name = <strong>{itemToConfirm?.name}</strong>;
    if (modalAction === 'reject') {
      return {
        title: `Reject ${itemToConfirm?.name}?`,
        message: <>Are you sure you want to reject and delete the vendor {name}?</>,
      };
    }
    if (modalAction === 'remove') {
      return {
        title: `Remove ${itemToConfirm?.name}?`,
        message: <>Are you sure you want to permanently remove the vendor {name}?</>,
      };
    }
    return { title: "Confirm Action", message: "Are you sure?" };
  };

  // Filter vendors based on search term and status
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = searchTerm === "" || 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.shopName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || vendor.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Vendors</h1>

      {/* Search and Filter Controls */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search vendors by name, email, service, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Status Filter */}
          <div className="md:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="text-sm text-gray-600">
          Showing {filteredVendors.length} of {vendors.length} vendors
        </div>
      </div>

      {/* Grid View */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredVendors.map((v) => (
          <div
            key={v._id}
            onClick={() => setSelectedVendor(v)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <img
              src={v.image || barberImg}
              alt={v.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold text-gray-800 truncate">{v.name}</h2>
              <p className="text-gray-600 text-sm truncate">{v.service}</p>
              <span
                className={`inline-block mt-2 px-3 py-0.5 text-xs font-semibold rounded-full ${
                  v.status === "approved"
                    ? "bg-green-100 text-green-600"
                    : v.status === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {v.status || "pending"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Popup */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setSelectedVendor(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>

            {/* ... other vendor details (image, name, etc.) ... */}
            <img
              src={selectedVendor.image || barberImg}
              alt={selectedVendor.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedVendor.name}
            </h2>
            <p className="text-gray-600 mb-1">
              <strong>Service:</strong> {selectedVendor.service}
            </p>
            {/* ... etc. ... */}
             <p className="text-gray-600 mb-3">
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-0.5 text-xs font-semibold rounded ${
                  selectedVendor.status === "approved"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {selectedVendor.status || "pending"}
              </span>
            </p>

            <div className="flex justify-end gap-3 mt-4">
              {selectedVendor.status === "pending" ? (
                <>
                  <button
                    onClick={() => approveVendor(selectedVendor._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => openConfirmModal(selectedVendor, 'reject')}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <button
                  onClick={() => openConfirmModal(selectedVendor, 'remove')}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  Remove Vendor
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reusable Modal Render */}
      <ConfirmModal
        isOpen={isModalOpen}
        title={getModalText().title}
        onClose={closeModal}
        onConfirm={handleConfirm}
      >
        {getModalText().message}
      </ConfirmModal>
    </div>
  );
}