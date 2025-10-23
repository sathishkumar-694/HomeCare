import React, { useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { API } from "../routes/api.js";
import axios from "axios";

// This is the *NEW* page where the user pays after vendor approval.
export default function FinalizePayment() {
  const { bookingId } = useParams(); // Gets 'bookingId' from the URL
  const location = useLocation();   // Gets the 'amount' passed from the Profile page
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Get amount from navigation state (passed from Profile.js)
  const amount = location.state?.amount || 0;

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    try {
      // This is a dummy payment.
      // In a real app, you would integrate Stripe or Razorpay here.
      // After their payment is successful, you call this backend route.
      
      const token = localStorage.getItem("token");
      
      // Tell your backend that this booking is now paid
      await axios.post(API.BOOKING.PAY(bookingId), 
        { 
          paymentMethod: "dummy_card", // Send any payment details
          amount: amount
        }, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Payment successful!
      // We'll re-use your existing success page, but with a different message.
      navigate("/payment-success", { state: { paymentComplete: true } }); 

    } catch (err) {
      console.error("Payment failed:", err);
      setError("Payment failed. Please try again.");
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

        {/* In a real app, you would add your payment form (Stripe, etc.) here.
          For now, we just have a "Pay" button.
        */}

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

