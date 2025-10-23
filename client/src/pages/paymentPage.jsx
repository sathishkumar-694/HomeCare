import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../routes/api";
import { AuthContext } from "../context/authContext";

// This is your existing file, modified to ONLY send a request.
export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const service = location.state;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [clientContact, setClientContact] = useState(user?.phone || "");
  const [serviceLocation, setServiceLocation] = useState(service?.location || "");
  const [notes, setNotes] = useState("");

  if (!isAuthenticated) {
    // ... (no change)
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
    // ... (no change)
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

  // Renamed from handlePayment to be more accurate
  const handleRequestBooking = async () => {
    setLoading(true);
    setError(null);

    if (!date || !time || !clientContact || !serviceLocation) {
      setError("Please fill in all required fields: Date, Time, Contact, and Location.");
      setLoading(false);
      return;
    }

    if (!service?.contact) {
      setError("Vendor contact information is missing. Cannot complete booking.");
      setLoading(false);
      return;
    }

    const bookingData = {
      userId: user._id,
      vendorId: service._id,
      service: service.service,
      serviceName: service.service,
      amount: service.price,
      price: service.price,
      vendorContact: service.contact,
      date: date,
      time: time,
      clientContact: clientContact,
      location: serviceLocation,
      notes: notes,
    };

    console.log("Booking data being sent:", bookingData);

    try {
      const token = localStorage.getItem("token");
      // This API call just creates the booking with status: 'pending'
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
      // This page should say "Booking Request Sent!"
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

        {/* Service Details (Static) */}
        <div className="border-t border-b py-4 mb-6 space-y-2">
          {/* ... (no change) ... */}
           <div className="flex justify-between items-center">
             <p className="text-gray-600">Provider:</p>
             <p className="font-semibold text-gray-900">{service.name}</p>
           </div>
           <div className="flex justify-between items-center">
             <p className="text-gray-600">Service:</p>
             <p className="font-semibold text-gray-900">{service.service}</p>
           </div>
        </div>

        {/* Booking Details Form (User Input) */}
        <div className="space-y-4 mb-6">
          {/* ... (no change) ... */}
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                 Date
               </label>
               <input
                 type="date"
                 id="date"
                 value={date}
                 onChange={(e) => setDate(e.target.value)}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                 required
               />
             </div>
             <div>
               <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                 Time
               </label>
               <input
                 type="time"
                 id="time"
                 value={time}
                 onChange={(e) => setTime(e.target.value)}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                 required
               />
             </div>
           </div>
           <div>
             <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
               Your Contact Number
             </label>
             <input
               type="tel"
               id="phone"
               value={clientContact}
               onChange={(e) => setClientContact(e.target.value)}
               placeholder="Enter your 10-digit phone number"
               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
               required
             />
           </div>
           <div>
             <label htmlFor="location" className="block text-sm font-medium text-gray-700">
               Service Location
             </label>
             <input
               type="text"
               id="location"
               value={serviceLocation}
               onChange={(e) => setServiceLocation(e.target.value)}
               placeholder="Enter your address"
               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
               required
             />
           </div>
           <div>
             <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
               Notes (Optional)
             </label>
             <textarea
               id="notes"
               value={notes}
               onChange={(e) => setNotes(e.target.value)}
               rows="2"
               placeholder="Any special instructions for the vendor?"
               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
             />
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

        {/* --- MODIFIED BUTTON --- */}
        <button
          onClick={handleRequestBooking}
          disabled={loading} // Disable button while processing
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {loading ? "Sending Request..." : "Send Booking Request"}
        </button>
      </div>
    </div>
  );
}
