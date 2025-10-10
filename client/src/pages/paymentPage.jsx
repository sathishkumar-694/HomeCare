import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get the service data passed from the previous page
  const service = location.state;

  // Handle case where user navigates directly to this page
  if (!service) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service not found.</h2>
          <button onClick={() => navigate("/client")} className="text-blue-600">
            Go back to services
          </button>
        </div>
      </div>
    );
  }
  
  const handlePayment = () => {
    // Simulate payment logic
    console.log("Processing payment for:", service);
    
    // ✅ Redirect to the correct success page
    navigate("/payment-success");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Confirm Your Booking
        </h2>
        
        {/* Service Details */}
        <div className="border-t border-b py-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-600">Provider:</p>
            <p className="font-semibold text-gray-900">{service.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Service:</p>
            <p className="font-semibold text-gray-900">{service.service}</p>
          </div>
        </div>
        
        {/* Amount */}
        <div className="flex justify-between items-center text-xl mb-8">
            <p className="text-gray-600">Total Amount:</p>
            <p className="font-bold text-green-600">₹{service.price}</p>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}