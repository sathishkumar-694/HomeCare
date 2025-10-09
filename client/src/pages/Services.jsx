import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VendorRegister from "./vendorRegister";

export default function Services() {
  const [role, setRole] = useState("client");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Example services list (you can replace this with your backend data later)
  const services = [
    { id: 1, name: "Plumbing", price: 500, description: "Fix leaks and pipelines" },
    { id: 2, name: "Home Cleaning", price: 800, description: "Deep cleaning service" },
    { id: 3, name: "Salon at Home", price: 600, description: "Personal grooming at home" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "client") {
      // When client is selected → show service selection
      setShowForm(true);
    } else {
      // When provider is selected → go to vendor form
      navigate("/vendor-register");
    }
  };

  // if provider, render VendorRegister directly
  if (role === "provider") {
    return <VendorRegister />;
  }

  // if client and showForm is true → show services list
  if (role === "client" && showForm) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Available Services</h2>
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl px-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="border p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-2">{service.description}</p>
              <p className="text-lg font-bold text-blue-600 mb-4">₹{service.price}</p>
              <button
                onClick={() => navigate(`/payment/${service.id}`, { state: service })}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Initial role selection view
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Choose Your Role</h2>
        <p className="text-gray-600 text-center mb-6">
          Select the role that best describes you to continue.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Client Option */}
          <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition">
            <input
              type="radio"
              name="role"
              value="client"
              checked={role === "client"}
              onChange={(e) => setRole(e.target.value)}
              className="mr-3"
            />
            <div>
              <p className="font-semibold">Client</p>
              <p className="text-sm text-gray-500">
                Hire professionals for your projects.
              </p>
            </div>
          </label>

          {/* Service Provider Option */}
          <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition">
            <input
              type="radio"
              name="role"
              value="provider"
              checked={role === "provider"}
              onChange={(e) => setRole(e.target.value)}
              className="mr-3"
            />
            <div>
              <p className="font-semibold">Service Provider</p>
              <p className="text-sm text-gray-500">
                Offer your services and connect with clients.
              </p>
            </div>
          </label>

          <button
            type="submit"
            className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
