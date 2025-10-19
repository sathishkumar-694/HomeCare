import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../routes/api";
import { AuthContext } from "../context/authContext";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const service = location.state;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to book a service</h2>
          <button onClick={() => navigate("/login")} className="text-blue-600">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service data not found.</h2>
          <button onClick={() => navigate("/services")} className="text-blue-600">
            Go back to services
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    console.log("Payment attempt - User:", user);
    console.log("Payment attempt - Service:", service);
    console.log("Payment attempt - User ID:", user?.id); // ✅ UPDATED

    if (!user?.id) { // ✅ UPDATED
      setError("User ID is missing. Please login again.");
      setLoading(false);
      return;
    }

    if (!service) {
      setError("Service data is missing. Please try again.");
      setLoading(false);
      return;
    }

    // Prepare the data for the backend
    const bookingData = {
      user: user.id, // ✅ UPDATED
      shop: service._id,
      service: service.service,
      date: service.date,
      time: service.time,
      amount: service.price,
    };

    console.log("Booking data being sent:", bookingData);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API.BOOKING.CREATE(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error response:", errorData);
        throw new Error(errorData.message || "Failed to create booking.");
      }

      const successData = await response.json();
      console.log("Success response:", successData);

      // If successful, redirect to the success page
      navigate("/payment-success");
    } catch (err) {
      console.error("Booking failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Confirm Your Booking
        </h2>

        {/* Service Details */}
        <div className="border-t border-b py-4 mb-6 space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Provider:</p>
            <p className="font-semibold text-gray-900">{service.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Service:</p>
            <p className="font-semibold text-gray-900">{service.service}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Date & Time:</p>
            <p className="font-semibold text-gray-900">
              {new Date(service.date).toLocaleDateString()} at {service.time}
            </p>
          </div>
        </div>

        {/* Amount */}
        <div className="flex justify-between items-center text-xl mb-6">
          <p className="text-gray-600">Total Amount:</p>
          <p className="font-bold text-green-600">₹{service.price}</p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={loading} // Disable button while processing
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Pay Now & Confirm Booking"}
        </button>
      </div>
    </div>
  );
}