import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../routes/api";

export default function PaymentPage() {
  const { state: service } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Service not found. Go back to <a href="/services" className="text-blue-600">Services</a>.
      </div>
    );
  }

  const handleChange = (e) => {
    setCard((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Please log in first.");
        navigate("/login");
        return;
      }

      const res = await axios.post(API.BOOKINGS.CREATE(), {
        userId: user._id,
        serviceName: service.name,
        price: service.price,
        paymentStatus: "Paid",
      });

      alert("Payment Successful! Booking Confirmed 🎉");
      navigate("/user-dashboard");
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment for {service.name}</h2>
        <p className="text-gray-700 mb-6 text-center">Amount: ₹{service.price}</p>

        <form onSubmit={handlePayment} className="space-y-4">
          <input
            type="text"
            name="number"
            value={card.number}
            onChange={handleChange}
            placeholder="Card Number"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="expiry"
            value={card.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            name="cvv"
            value={card.cvv}
            onChange={handleChange}
            placeholder="CVV"
            required
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
