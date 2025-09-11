import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VendorRegister from "./vendorRegister"; // import your vendor form

export default function Services() {
  const [role, setRole] = useState("client");
  const [showForm, setShowForm] = useState(false); // new state to control showing vendor form
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "client") {
      navigate("/client"); // keep existing client flow
    } else {
      setShowForm(true); // show vendor form inline instead of routing
    }
  };

  if (showForm && role === "provider") {
    // Render vendor form directly
    return <VendorRegister />;
  }

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
