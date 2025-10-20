import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../routes/api";
import ConfirmModal from "../Components/ConfirmModal"; // 1. Import the modal

export default function Queries() {
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);

  // --- State for the modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  // ---------------------------

  useEffect(() => {
    axios
      .get(API.CONTACT.GET_ALL())
      .then((res) => setQueries(res.data))
      .catch((err) => console.error("Error fetching queries:", err));
  }, []);

  // --- New Modal Functions ---

  // Opens the modal and sets the query to delete
  const openDeleteModal = (query) => {
    setItemToDelete(query);
    setIsModalOpen(true);
  };

  // Runs when "Confirm" is clicked
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      // Using the hardcoded URL from your original file
      await axios.delete(`http://localhost:5000/api/admin/queries/${itemToDelete._id}`);
      setQueries((prev) => prev.filter((q) => q._id !== itemToDelete._id));
      setSelectedQuery(null);
    } catch (err) {
      console.error("Error deleting query:", err);
    } finally {
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        User Reviews & Queries
      </h2>

      {/* Grid view for queries */}
      {queries.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">No queries available.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {queries.map((q) => (
            <div
              key={q._id}
              onClick={() => setSelectedQuery(q)}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer border-t-4 border-blue-500"
            >
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {q.name}
              </h3>
              <p className="text-sm text-gray-600 truncate">{q.email}</p>
              <p className="text-gray-700 mt-2 text-sm line-clamp-2">
                {q.message}
              </p>
              <p className="text-xs text-gray-500 mt-3">
                {new Date(q.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Popup Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setSelectedQuery(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>

            {/* ... other query details ... */}
             <div className="mb-4">
               <h2 className="text-2xl font-bold text-gray-800">
                 {selectedQuery.name}
               </h2>
               <p className="text-gray-600">{selectedQuery.email}</p>
               <p className="text-sm text-gray-500 mt-1">
                 {new Date(selectedQuery.createdAt).toLocaleString()}
               </p>
             </div>
             <div className="bg-gray-50 p-3 rounded-lg mb-5">
               <h3 className="text-lg font-semibold mb-2">Message</h3>
               <p className="text-gray-700 whitespace-pre-wrap"></p>
                 {selectedQuery.message}
             </div>

            <div className="flex justify-end">
              <button
                onClick={() => openDeleteModal(selectedQuery)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Delete Query
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reusable Modal Render */}
      <ConfirmModal
        isOpen={isModalOpen}
        title={`Delete Query from ${itemToDelete?.name}?`}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      >
        Are you sure you want to delete the query from <strong>{itemToDelete?.name}</strong>?
      </ConfirmModal>
    </div>
  );
}