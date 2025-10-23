import React, { useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { API } from "../routes/api.js";
import axios from "axios";
import toast from 'react-hot-toast'; // <-- 1. Import toast

export default function FinalizePayment() {
  const { bookingId } = useParams(); 
  const location = useLocation();   
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  
  const amount = location.state?.amount || 0;

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    try {
      // --- 2. BUG FIX & CORRECT API CALL ---
      const token = sessionStorage.getItem("token"); // Use sessionStorage
      
      // Simulate payment gateway success FIRST (in real app)
      // For now, we assume it succeeded and update our backend.
      
      // Call the correct backend endpoint using PUT
      await axios.put( 
        API.BOOKING.CONFIRM_PAYMENT(bookingId), // Use the confirm-payment endpoint
        {}, // No body data needed
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // ------------------------------------

      toast.success("Payment successful!"); // Use toast

      // Redirect to profile or a success page
      navigate("/profile"); 
      // Or navigate("/payment-success", { state: { paymentComplete: true } }); 

    } catch (err) {
      console.error("Payment confirmation failed:", err);
      const errorMsg = err.response?.data?.message || "Payment confirmation failed. Please contact support.";
      setError(errorMsg); // Show error in the component
      toast.error(errorMsg); // Also show toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Payment</h2>
          <p className="text-gray-600">Your booking has been confirmed by the vendor. Please pay to finalize.</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center text-2xl">
            <span className="text-gray-600">Amount to Pay:</span>
            <span className="font-bold text-green-600">₹{amount}</span>
          </div>
        </div>

        {/* Real payment form (Stripe, etc.) would go here */}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:bg-green-300"
        >
          {loading ? "Processing..." : `Pay ₹${amount}`}
        </button>
      </div>
    </div>
  );
}