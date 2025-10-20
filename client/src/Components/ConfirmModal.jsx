import React from "react";

// This is a generic modal. It doesn't know *what* it's confirming.
// It just shows a message and reports back when a button is clicked.

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children, // 'children' will let us pass in any message
}) {
  if (!isOpen) return null; // Don't render anything if it's not open

  return (
    // Main overlay
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      {/* Modal content */}
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>

        {/* Message (passed in as children) */}
        <p className="text-gray-600 mb-6">{children}</p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose} // Just calls the onClose function from props
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm} // Just calls the onConfirm function from props
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}