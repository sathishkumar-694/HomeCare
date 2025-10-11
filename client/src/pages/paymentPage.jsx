import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Helper function to get auth details from localStorage
// In a real app, you might use React Context for this.
const getAuthDetails = () => {
  const auth = localStorage.getItem("auth");
  if (auth) {
    return JSON.parse(auth);
  }
  return { token: null, user: null };
};

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the service data passed from the previous page
  // We assume `location.state` contains all needed info: 
  // { _id, name, service, price, date, time }
  const service = location.state;

  // Handle case where user navigates directly to this page
  if (!service) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service data not found.</h2>
          <button onClick={() => navigate("/")} className="text-blue-600">
            Go back to the homepage
          </button>
        </div>
      </div>
    );
  }
  
  // ✅ MODIFIED: Function to handle payment and create booking
  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    const { token } = getAuthDetails();

    if (!token) {
      setError("You must be logged in to make a booking.");
      setLoading(false);
      return;
    }

    // Prepare the data for the backend
    // Ensure your `service` object from `location.state` has all these fields
    const bookingData = {
      shop: service._id,       // The ID of the provider/shop
      service: service.service, // The name of the service
      date: service.date,      // The selected date
      time: service.time,      // The selected time
      amount: service.price    // The amount paid
    };

    try {
      // Make the API call to your backend's "create booking" endpoint
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create booking.');
      }

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
            <p className="font-semibold text-gray-900">{new Date(service.date).toLocaleDateString()} at {service.time}</p>
          </div>
        </div>
        
        {/* Amount */}
        <div className="flex justify-between items-center text-xl mb-6">
            <p className="text-gray-600">Total Amount:</p>
            <p className="font-bold text-green-600">₹{service.price}</p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={loading} // Disable button while processing
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Pay Now & Confirm Booking'}
        </button>
      </div>
    </div>
  );
}