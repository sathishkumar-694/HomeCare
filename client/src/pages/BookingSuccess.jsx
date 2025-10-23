import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-gray-100">
        <div className="mb-6">
          {/* Icon changed to a "pending" clock */}
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Received!</h2>
          <p className="text-gray-600">Your request is pending vendor confirmation.</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Status:</span>
            {/* Status is Pending */}
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              Pending
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Payment:</span>
            {/* Payment is awaiting vendor confirmation */}
            <span className="text-gray-600 font-semibold">Awaiting Confirmation</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/profile")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate("/services")}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
          >
            Book Another Service
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          You will be notified in your profile to complete the payment once the vendor confirms.
        </p>
      </div>
    </div>
  );
}