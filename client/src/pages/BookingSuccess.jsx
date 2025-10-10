import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookingSuccess() {
  const navigate = useNavigate();
  const payment = JSON.parse(localStorage.getItem("payment")) || {};

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Booking Confirmed 🎉</h2>
        <p className="text-gray-700 mb-2">
          Booking ID: <strong>{payment.bookingId || "N/A"}</strong>
        </p>
        <p className="text-gray-700 mb-2">
          Payment Status: <strong>{payment.status}</strong>
        </p>
        <p className="text-gray-600 mb-6">Date: {payment.time}</p>

        <button
          onClick={() => navigate("/client")}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Back to Services
        </button>
      </div>
    </div>
  );
}
