import React from "react";
import { useNavigate } from "react-router-dom";

// Import your images
import plumberImg from "../assets/plumber.jpg";
import cleanerImg from "../assets/plumber.jpg";
import barberImg from "../assets/barber.jpg";

// --- Service Provider Data ---
// 
// IMPORTANT: I've added _id, price, date, and time
// to match what your PaymentPage component expects.
//
const providers = [
  {
    _id: "shop101", // Use _id as expected by PaymentPage
    id: 101,
    name: "Ramesh Kumar",
    service: "Plumbing",
    desc: "Expert in fixing water leaks and pipe installations.",
    photo: plumberImg,
    price: 500,       // Required by PaymentPage
    date: "2025-10-20", // Required by PaymentPage (example date)
    time: "10:00 AM",   // Required by PaymentPage (example time)
  },
  {
    _id: "shop102",
    id: 102,
    name: "Suresh Singh",
    service: "Plumbing",
    desc: "24/7 emergency plumbing services available.",
    photo: plumberImg,
    price: 650,
    date: "2025-10-21",
    time: "2:00 PM",
  },
  {
    _id: "shop103",
    id: 103,
    name: "Anita Sharma",
    service: "Home Cleaning",
    desc: "Professional home and office cleaning services.",
    photo: cleanerImg,
    price: 1500,
    date: "2025-10-22",
    time: "9:00 AM",
  },
  {
    _id: "shop104",
    id: 104,
    name: "Vikram Mehta",
    service: "Salon at Home",
    desc: "Professional men's and women's hairstylist.",
    photo: barberImg,
    price: 800,
    date: "2025-10-20",
    time: "4:00 PM",
  },
];

export default function ServicesList() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Available Service Providers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={provider.photo}
              alt={provider.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {provider.name}
              </h3>
              <p className="text-sm font-medium text-blue-600 mb-3">
                {provider.service}
              </p>
              <p className="text-gray-700 mb-2 flex-grow">{provider.desc}</p>
              
              {/* Display the price from the data */}
              <p className="text-xl font-bold text-gray-800 mb-4">
                ₹{provider.price}
              </p>
              
              <button
                // THIS IS THE KEY:
                // We navigate to the payment page AND pass the
                // entire 'provider' object as the route's 'state'.
                // Your PaymentPage will receive this in location.state.
                onClick={() =>
                  navigate(`/payment/${provider.id}`, { state: provider })
                }
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}